const Discord = require('discord.js-light')
const fetch = require('node-fetch')
function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw MyCustomError(res.statusText);
    }
}

/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`⚠️ | กรุณาใส่ \`URL WEBHOOK\` ด้วยนะคะนายท่าน!`)
    if (!vaildwebhook(args[0])) return message.reply(`⚠️ | \`URL WEBHOOK\` ไม่ถูกต้องนะคะ!`)
    fetch(args[0]).then(checkStatus).then((res) => res.json()).then((json) => {
        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setFooter(bot.user.tag,bot.user.avatarURL())
        if (json.avatar) {
            embed.setThumbnail(`https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp?size=512`)
        }else{
            embed.setThumbnail(bot.user.avatarURL())
        }
        embed.setTitle(json.name)
        embed.setDescription(`<a:checkmark:803108274538020904> | ทำการลบ \`WEBHOOK\` แล้วนะคะ!`)
        fetch(args[0],{method: 'DELETE'}).then(checkStatus).then(()=>{
            message.channel.send(embed)
        }).catch((err)=>{
            message.reply(`⚠️ | หนูมีปัญหาในการลบ \`WEBHOOK\` นั้นค่ะ`)
        })

    }).catch((err)=>{
        message.reply(`⚠️ | หนูไม่พบ \`WEBHOOK\` นั้นค่ะ`)
    })
}

function vaildwebhook(str) {
    return str.match(/discord.com\/api\/webhooks\/[0-9]{18}\/.*/)
}