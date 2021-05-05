const {
    MessageEmbed
} = require("discord.js-light");
Number.prototype.toBase = function (base) {
    let symbols =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let decimal = this;
    let conversion = "";

    if (base > symbols.length || base <= 1) {
        return false;
    }

    while (decimal >= 1) {
        conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] +
            conversion;
        decimal = Math.floor(decimal / base);
    }

    return (base < 11) ? parseInt(conversion) : conversion;
}
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */

exports.run = async (bot, message, args) => {
    message.delete()

    await bot.db.addguild(message.guild.id)
    let userdata = await bot.db.getuser(message.author.id)
    if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(`❌ | นายท่านไม่มีสิทธิ์ใช้คำสั่งนะคะ!...//ขำเบาๆ~`);
    } else {
        let code;
        let verifyexited;
        switch (args[0]) {

            case "เปิด":
            case "open":
            case "on":
                if (!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.channel.send(`:x: | กรุณาให้หนูมีสิทธ์ในการสร้างลิ้ง \`invite\` นะคะ...//มอง`);
                code = (parseInt(message.guild.id) + parseInt(bot.user.id)).toBase(62);
                verifyexited = await bot.db.prepare(`SELECT * FROM guilds WHERE verify = ?`).get(code)
                if (verifyexited && verifyexited.id != message.guild.id) return message.channel.send(`มีคนใช้ url นี้แล้ว`)
                await bot.db.prepare(`UPDATE guilds SET verify = :verify WHERE id = :id`).run({
                    verify: code,
                    id: message.guild.id
                })
                message.channel.send(message.author, {
                    embed: new MessageEmbed().setAuthor("🌸 Join verification")
                        .setColor(config.color)
                        .setImage(`https://cdn.discordapp.com/attachments/657768096840548363/739752817186832404/recap.png`)
                        .setDescription(`ลิ้งสำหรับเข้าดิสของคุณ https://fortune.moe/discord/${code}
เพื่อความปลอดภัยที่มากขึ้นโปรดลบลิ้งอื่นๆในดิสนี้ทั้งหมด
และห้ามไม่ให้คนทั่วไปสามารถสร้างลิ้งได้`)
                })
                break;


            case "ปิด":
            case "close":
            case "off":
                await bot.db.prepare(`UPDATE guilds SET verify = :verify WHERE id = :id`).run({
                    verify: null,
                    id: message.guild.id
                })
                message.channel.send(message.author, {
                    embed: new MessageEmbed().setAuthor("🌸 Join verification")
                        .setColor(config.color)
                        .setImage(`https://cdn.discordapp.com/attachments/657768096840548363/739752817186832404/recap.png`)
                        .setDescription(`ลิ้งสำหรับเข้าดิสของคุณถูกนำออกแล้ว`)
                })
                break;


            case "custom":
            case "url":
            case "set":
                if (!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.channel.send(`:x: | กรุณาให้หนูมีสิทธ์ในการสร้างลิ้ง \`invite\` นะคะ...//มอง`);
                if (!userdata.premium) return message.reply(`ฟีเจอร์นี้สำหรับ premium เท่านั้น`);
                args.shift()
                code = args.join(" ");
                if (!code) return message.channel.send(`โปรดระบุลิ้ง url ที่ต้องการกำหนดเอง`)
                if (code.match(/[^a-zA-Z\u0E00-\u0E7F\d]/)) return message.channel.send(`ลิ้ง invite ไม่ควรมีตัวอักษร ${code.match(/[^a-zA-Z\u0E00-\u0E7F\d]/)[0]}`)

                verifyexited = await bot.db.prepare(`SELECT * FROM guilds WHERE verify = ?`).get(code)
                if (verifyexited && verifyexited.id != message.guild.id) return message.channel.send(`มีคนใช้ url นี้แล้ว`)
                await bot.db.prepare(`UPDATE guilds SET verify = :verify WHERE id = :id`).run({
                    verify: code,
                    id: message.guild.id
                })
                message.channel.send(message.author, {
                    embed: new MessageEmbed().setAuthor("🌸 Join verification")
                        .setColor(config.color)
                        .setImage(`https://cdn.discordapp.com/attachments/657768096840548363/739752817186832404/recap.png`)
                        .setDescription(`ลิ้งสำหรับเข้าดิสของคุณ https://fortune.moe/discord/${code}
                เพื่อความปลอดภัยที่มากขึ้นโปรดลบลิ้งอื่นๆในดิสนี้ทั้งหมด
                และห้ามไม่ให้คนทั่วไปสามารถสร้างลิ้งได้`)
                })
                break;
            case "bg":
            case "background":
                if (!userdata.premium) return message.reply(`ฟีเจอร์นี้สำหรับ premium เท่านั้น`);
                args.shift()

                code = args.join(" ");
                if (!code) return message.channel.send(`โปรดระบุลิ้ง url ที่ต้องการกำหนดเอง`)
                if (code != "reset" && !validURL(code)) return message.channel.send(`ลิ้ง url รูปภาพไม่ถูกต้อง`)
                if (code == "reset") code = null;
                await bot.db.prepare(`UPDATE guilds SET bgcover = :bgcover WHERE id = :id`).run({
                    bgcover: code,
                    id: message.guild.id
                })
                if (code) message.channel.send(new MessageEmbed()
                    .setColor(config.color)
                    .setImage(code)
                    .setAuthor(`ตั้งรูปพึ้นหลังเว็บเป็น`)
                    .setDescription(`\`${code}\``)
                    )
                else message.channel.send(new MessageEmbed()
                    .setColor(config.color)
                    .setAuthor(`หนูล้างพึ้นหลังเว็บให้แล้วค่ะ`))

                break;
            case "color":
            case "c":
            case "theme":
                if (!userdata.premium) return message.reply(`ฟีเจอร์นี้สำหรับ premium เท่านั้น`);
                args.shift()

                code = args.join(" ");
                if (!code) return message.channel.send(`โปรดระบุสีเว็บที่ต้องการกำหนดเอง https://htmlcolorcodes.com/`)
                if (code != "reset" && !validHEX(code)) return message.channel.send(`สีไม่ถูกต้อง`)
                if (code == "reset") code = null;
                await bot.db.prepare(`UPDATE guilds SET themecolor = :themecolor WHERE id = :id`).run({
                    themecolor: code,
                    id: message.guild.id
                })
                if (code) message.channel.send(new MessageEmbed()
                    .setColor(code)
                    .setAuthor(`หนูตั้งสีเว็บเป็น \`${code}\` แล้วค่ะ!`))
                else message.channel.send(new MessageEmbed()
                    .setColor(config.color)
                    .setAuthor(`หนูล้างสีเว็บให้แล้วค่ะ`))
                break;

            default:
                message.channel.send(new MessageEmbed().setAuthor("🌸 Join verification")
                    .setColor(config.color)
                    .setImage(`https://cdn.discordapp.com/attachments/657768096840548363/739752817186832404/recap.png`)
                    .setDescription(`✨・**คำสั่งสำหรับระบบตรวจสอบคนเข้า**
┊\`${prefix}verify on\` ตั้งค่าให้บอทสร้างลิ้งเฉพาะ
┊\`${prefix}verify off\` ลบลิ้งที่บอทสร้างให้เฉพาะ
┊\`${prefix}verify url (code)\` ตั้งให้บอทสร้างลิ้งแบบกำหนดเอง (premium)
┊\`${prefix}verify bg (url)\` ตั้งภาพพื้นหลังแบบกำหนดเอง (premium)
╰\`${prefix}verify color (hex code)\` ตั้งสีเว็บแบบกำหนดเอง (premium)
หากต้องการล้างสีเว็บหรือพึ้นหลังให้ใส่ \`reset\``)
                )
                break;
        }
    }
}

exports.conf = {
    aliases: ["vr"]
};


function validHEX(str) {
    return /^#[0-9A-F]{6}$/i.test(str);
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}