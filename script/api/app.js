const express = require("express")
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const bodyParser = require('body-parser')
const session = require('express-session')
const DiscordOauth2 = require("discord-oauth2");
const chalk = require("chalk");
const path = require("path");
const app = express()

const log = {
    webserver: (str) => {
        console.log(chalk.magenta("[webserver] ") + str)
    },
    ws: (str) => {
        console.log(chalk.magentaBright("[WS] ") + str)
    }
}

/**
 *
 *
 * @param {import("discord.js").ShardingManager} manager
 */
module.exports = async (manager) => {
    const OAUTH2_CLIENT_ID = "618441438564188196";
    const OAUTH2_CLIENT_SECRET = "v83VY5oj8YY5yVLLdM-F0fKAHS7O2WK1";

    const oauth = new DiscordOauth2({

        clientId: OAUTH2_CLIENT_ID,
        clientSecret: OAUTH2_CLIENT_SECRET,
    });
    const recaptchav2 = new Recaptcha('6Lftr7kZAAAAAPYcIEgFzaKt9-dfS9sGTvw9GcQT', '6Lftr7kZAAAAAIOQpR77HzrWHIePMHpu1Iwqg-GM');
    app.use(express.static(path.join(appRoot, '/script/api/public')))
    app.set('views', path.join(appRoot, '/script/api/view'));

    app.use(session({
        secret: 'keyboard cat',
        cookie: {
            maxAge: 60000 * 24
        },
        resave: false,
        saveUninitialized: true,
    }))
    
    app.use(async (req, res, next) => {
        if (!req.path.match(/.(css|png|js|ico)$/)) {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            log.webserver(chalk.yellowBright(` ${ip} > ${req.path}`))
        }
        next()
    })
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.get("/discord", (req, res) => {
        res.redirect(`https://fortune.moe/discord/9waufjv0h440`)
    })
    app.get("/", (req, res) => {
        res.redirect(`https://fortune.moe/discord/9waufjv0h440`)
    })

    app.get("/joindiscord/:code", async (req, res) => {
        let code = req.params.code
        let guilddata = await manager.db.prepare(`SELECT * FROM guilds WHERE verify = ?`).get(code)
        if (!guilddata) return res.redirect(`https://${req.headers.host}/discord/${code}`)
        let guild = await manager.shard.get(`this.guilds.cache.get("${guilddata.id}")`)
        if (!guild) return res.redirect(`https://${req.headers.host}/discord/${code}`)
        if (!req.session.access_token) return login(req, res)
        else {
            if (!req.session.recaptcha) return res.redirect(`https://${req.headers.host}/discord/${code}`)
            oauth.addMember({
                accessToken: req.session.access_token,
                botToken: config.token,
                guildId: guilddata.id,
                userId: req.session.user.id,

                //roles: config.roles,
            }).then((data) => {
                res.redirect(`https://discord.com/channels/${guilddata.id}`)
                console.log(data)
            }).catch((err) => {
                console.log(err.message)
                if (err.message.match("The user is banned from this guild")) {
                    return res.redirect(`https://${req.headers.host}/discord/${code}?blacklist=คุณถูกแบนออกจากเซิฟเวอร์`)

                }
                return res.redirect(`https://${req.headers.host}/discord/${code}`)

            });
        }
    })
    app.get("/chelossecret/sitemap.xml",async(req,res)=>{
        let allurls = ""
        let guilds = await manager.db.prepare(`SELECT verify FROM guilds`).all()
        for (let i = 0; i < guilds.length; i++) {
            if(guilds[i].verify) allurls+=`<url>
<loc>https://fortune.moe/discord/${guilds[i].verify}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>`
        }
        res.send( `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allurls}
        </urlset> `)
    })
    app.get("/discord/:code", async (req, res) => {
        let code = req.params.code
        let guilddata = await manager.db.prepare(`SELECT * FROM guilds WHERE verify = ?`).get(code)
        if (!guilddata) return res.render('discord', {
            blacklist: "ไม่พบลิ้งคำเชิญนี้",
            guild: null,
            bgurl: null,
            themecolor: null,
            code
        })
        let guild = await manager.shard.get(`this.guilds.cache.get("${guilddata.id}")`)
        const bg = guilddata.bgcover;
        const themecolor = guilddata.themecolor;
        if (!guild) return res.render('discord', {
            blacklist: "ไม่พบเซิร์ฟเวอร์นี้",
            guild: null,
            bgurl: null,
            themecolor,
            code
        })
        let iconURL = guild.iconURL;
        let userCount = guild.memberCount;
        if (req.query.blacklist) return res.render('discord', {
            blacklist: req.query.blacklist,
            guild: {
                name: guild.name,
                userCount,
                icon: iconURL,
            },
            user: req.session.user,
            themecolor,
            bgurl: bg,
            code
        })
        if (req.session.access_token) {
            res.render('discord', {
                blacklist: false,
                guild: {
                    name: guild.name,
                    userCount,
                    icon: iconURL,
                },
                user: req.session.user,
                themecolor,
                bgurl: bg,
                code

            })
        } else {

            res.render('discord', {
                blacklist: false,
                guild: {
                    name: guild.name,
                    userCount,
                    icon: iconURL,
                },
                themecolor,
                bgurl: bg,
                code

            })
        }
    })
    app.post("/check", recaptchav2.middleware.verify, (req, res) => {
        let redirect = "https://" + req.headers.host + req.query.redirect ? req.query.redirect : ""
        if (!req.recaptcha.error) {
            req.session.recaptcha = true
            return res.redirect(redirect)
        } else {
            console.log("captcha error")
            req.session.recaptcha = false
            return res.redirect(redirect)
            // error code
        }
    })

    app.get("/login", async (req, res) => {
        if(req.query.redirect) req.session.redirect = req.query.redirect
        if (req.query.code) {
            let data = await oauth.tokenRequest({
                grantType: "authorization_code",
                code: req.query.code,
                redirectUri: "https://" + req.headers.host + req.path,
                scope: ["identify", "guilds", "guilds.join"]
            })
            if (data.access_token) {
                req.session.access_token = data.access_token
                let hour = data.expires_in * 1000 / 1.5
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour
                let user = await oauth.getUser(data.access_token)
                req.session.user = {
                    avatar: user.avatar,
                    username: user.username,
                    tag: user.discriminator,
                    id: user.id,
                }
                if (req.session.redirect == "close") res.send("<script>window.opener.postMessage('login', '*');window.close();</script>")
                else if (req.session.redirect) res.redirect(`https://${req.headers.host}${req.session.redirect}`)
                else if (!req.session.redirect) res.redirect(`https://${req.headers.host}`)
            } else res.send("Api Error")
        } else if (!req.session.access_token) {
            //send to login discord
            res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${OAUTH2_CLIENT_ID}&redirect_uri=${`https://${req.headers.host}${req.path}`}&response_type=code&scope=identify guilds guilds.join`);
        } else {
            //logged in
            if (req.session.redirect) {
                if (req.session.redirect == "close") res.send("<script>window.opener.postMessage('login', '*');window.close();</script>")
                else res.redirect(`https://${req.headers.host}${req.session.redirect}`)
            } else {
                res.redirect(`https://${req.headers.host}/discord`)
            }
        }
    })
    app.get("/logout", async (req, res) => {
        req.session.destroy();
        res.redirect(`https://${req.headers.host}/`)
    });
    app.listen(80);

    function login(req, res) {
        return res.redirect(`https://${req.headers.host}/login?redirect=${req.path}`)
    }
}