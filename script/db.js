const fs = require('fs');
const chalk = require('chalk');
module.exports = (bot) => {

    (async () => {
        bot.db = await require('better-sqlite3')('database.dll');
        bot.db.pragma('journal_mode = WAL');
        setInterval(fs.stat.bind(null, 'database.dll-wal', (err, stat) => {
            if (err) {
                if (err.code !== 'ENOENT') throw err;
            } else if (stat.size > 1000000 * 5) { //5 Megabytes
                bot.db.pragma('wal_checkpoint(RESTART)');
            }
        }), 5000).unref();
        await bot.db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id varchar(20) PRIMARY KEY,
    point INT DEFAULT 0 not null,
    level INT DEFAULT 1 not null,
    exp REAL DEFAULT 0 not null,
    backpackinventory varchar(8048) DEFAULT "[]" not null,
    backpack INT DEFAULT 1 not null,
    fishing_rod INT DEFAULT 1 not null,
    pickaxe INT DEFAULT 1 not null,
    totalsexp REAL DEFAULT 0 not null,
    message INT DEFAULT 0 not null,
    premium INT DEFAULT 0 not null,

    title TEXT,
    class TEXT,
    name TEXT,
    gender TEXT,
    birthday TEXT,
    job TEXT,
    status TEXT,
    quotes TEXT
)`).run()
        await bot.db.prepare(`CREATE TABLE IF NOT EXISTS guilds (
    id varchar(20) not null,
    settings varchar(2048) DEFAULT "{}",
    joinid varchar(2048),
    verify varchar(2048) DEFAULT "" not null,
    PRIMARY KEY (id)
)`).run()


        bot.db.adduser = async (userid) => {
            return new Promise(async (resolve, reject) => {
                await bot.db.prepare(`INSERT INTO users(id) 
        SELECT :id
        WHERE NOT EXISTS(SELECT 1 FROM users WHERE id = :id);
        `).run({
                    id: userid
                })
                return resolve(await bot.db.getuser(userid))
            })
        }
        bot.db.addxp = async (userid, xp, message) => {
            return new Promise(async (resolve, reject) => {
                let userdata = await bot.db.getuser(userid)
                userdata.exp += xp
                userdata.totalsexp += xp
                let nxtlvlexp = userdata.level * config.expperlvl;
                if (userdata.exp >= nxtlvlexp) {
                    userdata.level++;
                    if (message.channel) message.channel.send(`<a:692267344042655786:792426931856998442> ยินดีด้วยคุณ ${message.author} เลื่อนระดับเป็นเลเวล **${userdata.level}** แล้วค่ะ !`)
                    userdata.exp -= nxtlvlexp
                }
                resolve((await bot.db.prepare(`UPDATE users SET level = :level, exp = :exp, totalsexp = :totalsexp WHERE id = :id`).run({
                    level: userdata.level,
                    exp: userdata.exp,
                    totalsexp: userdata.totalsexp,
                    id: userdata.id,
                })) ? true : false)
            })
        }
        bot.db.setpoint = async (userid, point, check = false) => {
            return new Promise(async (resolve, reject) => {
                if (!check) {
                    await bot.db.getuser(userid)
                }
                let user = await bot.db.prepare(`UPDATE users SET point = ? WHERE id = ?`).run(point, userid)
                return resolve(user)
            })
        }
        bot.db.removepoint = async (userid, point) => {
            return new Promise(async (resolve, reject) => {
                point = parseInt(point)
                if (point == 0) return resolve(true)
                if (point < 0 || !point > 0 || point == 0) return reject("คุณใส่พ้อยไม่ถูกต้อง")
                let user = await bot.db.getuser(userid)
                if (user.point < point) return reject("คุณมีพ้อยไม่เพียงพอ")
                await bot.db.prepare(`UPDATE users SET point = ? WHERE id = ?`).run(user.point - point, userid)
                return resolve(true)
            })
        }
        bot.db.paypoint = async (userid, targetid, point) => {
            return new Promise(async (resolve, reject) => {
                point = parseInt(point)
                if (point < 0 || !point > 0 || point == 0) return reject("คุณใส่พ้อยไม่ถูกต้อง")
                let user = await bot.db.getuser(userid)
                if (user.point < point) return reject("มีพ้อยไม่เพียงพอ")
                let target = await bot.db.getuser(targetid)
                bot.db.prepare(`UPDATE users SET point = ? WHERE id = ?`).run(user.point - point, userid)
                await bot.db.prepare(`UPDATE users SET point = ? WHERE id = ?`).run(target.point + point, targetid)
                return resolve(true)
            })
        }
        bot.db.tradeitem = async (userid, targetid, itemid, amount) => {
            return new Promise(async (resolve, reject) => {
                amount = parseInt(amount)
                itemid = parseInt(itemid)
                if (!itemid) return reject("ไอดีไอเท็มไม่ถูกต้อง  ");
                let item = bot.item[itemid];
                if (!item) return reject("ไอดีไอเท็มไม่ถูกต้อง")
                if (amount < 0 || !amount > 0 || amount == 0) return reject("คุณใส่จำนวนไม่ถูกต้อง")
                let user = await bot.db.getuser(userid)
                let userhasitem = user.backpackinventory.filter(id => id == itemid);
                if (!userhasitem) return reject(`ไม่มีไอเท็ม ${item.emoji} ${item.name} อยู่ในตัวคุณ`);
                if (userhasitem.length < amount) return reject(`คุณมีไอเท็ม ${item.emoji} ${item.name} แค่ \`${userhasitem.length}\` อันอยู่ในตัวคุณ`);
                let target = await bot.db.getuser(targetid)
                for (let i = 0; i < amount; i++) {
                    let index = user.backpackinventory.indexOf(itemid);
                    if (index !== -1) {
                        if (target.backpackinventory.length >= target.backpack * config.storageperlvl) break;
                        user.backpackinventory.splice(index, 1);
                        target.backpackinventory.push(itemid)
                    } else {
                        return reject(`คุณมีไอเท็ม ${item.emoji} ${item.name} แค่ \`${userhasitem.length}\` อันอยู่ในตัวคุณ`);
                    }
                }
                bot.db.prepare(`UPDATE users SET backpackinventory = ? WHERE id = ?`).run(JSON.stringify(user.backpackinventory), userid)
                await bot.db.prepare(`UPDATE users SET backpackinventory = ? WHERE id = ?`).run(JSON.stringify(target.backpackinventory), targetid)
                return resolve(true)
            })
        }
        bot.db.additem = async (userid, itemid, amount) => {
            return new Promise(async (resolve, reject) => {
                if (!bot.item[itemid]) return reject("ไอดีไอเท็มไม่ถูกต้อง")
                amount = parseInt(amount)
                if (amount < 0 || !amount > 0 || amount == 0) return reject("คุณใส่จำนวนไม่ถูกต้อง")
                let user = await bot.db.getuser(userid)
                for (let i = 0; i < amount; i++) {
                    if (user.backpackinventory.length >= user.backpack * config.storageperlvl) return reject("กระเป๋าคุณเต็มแล้ว")
                    user.backpackinventory.push(itemid)
                }
                await bot.db.prepare(`UPDATE users SET backpackinventory = ? WHERE id = ?`).run(JSON.stringify(user.backpackinventory), userid)
            })
        }
        bot.db.getuser = async (userid) => {
            return new Promise(async (resolve, reject) => {
                userid = bot.getid(userid)
                if (!userid) return resolve(false)
                let user = await bot.db.prepare(`SELECT * FROM users WHERE id = ?`).get(userid)
                if (user) {
                    user.backpackinventory = JSON.parse(user.backpackinventory)
                    return resolve(user)
                } else {
                    return bot.db.adduser(userid).then(async (user) => {
                        return resolve(user)
                    })
                }
            })
        }
        bot.db.addguild = async (guildid) => {
            return new Promise(async (resolve, reject) => {
                await bot.db.prepare(`INSERT INTO guilds(id) 
        SELECT :id
        WHERE NOT EXISTS(SELECT 1 FROM guilds WHERE id = :id);
        `).run({
                    id: guildid
                })
                return resolve(await bot.db.getguild(guildid))
            })
        }
        bot.db.getguild = async (guildid) => {
            return new Promise(async (resolve, reject) => {
                let guild = await bot.db.prepare('SELECT * FROM guilds WHERE id = ?').get(guildid)
                if (guild) {
                    guild["settings"] = JSON.parse(guild["settings"])
                    return resolve(guild)
                } else {
                    return bot.db.addguild(guildid).then(async (guild) => {
                        return resolve(guild)
                    })
                }
            })
        }
    })().catch((err) => {
        console.log(chalk.red(`Sql Error`))
        console.error(err)
        process.exit()
    })
}