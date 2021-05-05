const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if (!args.length) return message.channel.send(`:x: | ตัวอย่างการใช้คำสั่ง \`${config.prefix}trade @ชื่อ (ไอดีไอเท็มหรือชื่อไอเท็ม) (จำนวน)\``);
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(config.warn_tagnotfound);
    if (target == message.author) return message.channel.send(config.warn_tagyoursalf);
    if (target && !args[1]) return message.channel.send(`:x: | กรุณาใส่ไอดีไอเท็มเช่น ${message.content} __5__ 2`);
    if (!args[2]) return message.channel.send(`:x: | กรุณาใส่จำนวนไอเท็มเช่น ${message.content} __2__`);
    if (!target || !args[1] || !parseInt(args[2])) return message.channel.send("คำสั่งไม่ถูกต้อง");
    let itemid;
    if (!parseInt(args[1])) {
        itemid = await bot.item.findkey(args[1]);
    } else {
        itemid = parseInt(args[1]);
    }
    let item = bot.item[itemid]
    if (!item) return message.channel.send(`:x: | ไม่พบไอเท็มที่ใช้ไอดีนี้`);
    let userdata = await bot.db.getuser(message.author)
    let userhasitem = userdata.backpackinventory.filter(id => id == itemid);
    if (userhasitem<=0) return message.channel.send(`:x: | นายท่านไม่มีไอเท็ม ${item.emoji} ${item.name} อยู่ในตัวคุณ`);
    let amount = parseInt(args[2]);
    if (userhasitem.length < amount) return message.channel.send(`:x: | นายท่านมีไอเท็ม ${item.emoji} ${item.name} แค่ \`${userhasitem.length}\` ชิ้นอยู่ในตัวคุณ`);
    let msg = await message.channel.send(`❓ | นายท่านแน่ใจหรือไม่ที่จะย้ายไอเท็ม ${item.emoji} ${item.name} จำนวน \`${amount}\` ให้กับ ${target}`);
    await msg.react("✅");
    msg.react("❌");
    const react = msg.createReactionCollector((reaction, user) => (["✅", "❌"].includes(reaction.emoji.name) && user != bot.user && message.author.id == user.id), {
        time: 1000 * 30
    })
    react.on('collect', async collected => {
        msg.reactions.removeAll();
        if (collected.emoji.name === "✅") {
            await bot.db.tradeitem(message.author.id, target.id, itemid, amount).then(async (ispay) => {
                if (ispay) {
                    await msg.edit(`<a:checkmark:803108274538020904> | ทำรายการโอน ${item.emoji} ${item.name} จำนวน \`${amount}\` ให้ ${target} แล้วค่ะ!`);
                }
            }).catch(async (reason) => {
                await msg.edit(`:x: | ไม่สามารถโอน ${item.emoji} ${item.name} ได้เนื่องจาก ${reason}`);
            })
            react.stop();
        }
        if (collected.emoji.name === "❌") {
            await msg.edit(`<a:checkmark:803108274538020904> | ทำการยกเลิกการทำรายการ`);
            react.stop();
        }
    })
}
exports.conf = {
    aliases: []
};