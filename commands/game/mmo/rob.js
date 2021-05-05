const Discord = require('discord.js-light')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
    let targetid = await bot.getid(args[0])

    if (!targetid) return message.channel.send(config.warn_tagnotfound);
    if (targetid == message.author.id) return message.channel.send(config.warn_tagyoursalf);
    let target = await bot.db.getuser(targetid);
    let userdata = await bot.db.getuser(message.author);
    if (target.point <= 1000) return message.channel.send(`:x: | อย่าไปปล้นเค้าเลยแม้แต่ค่าขนมยังไม่มีซื้อ`);
    if (userdata.point <= 500) return message.channel.send(`:x: | เงินคุณไม่ถึงขั้นตํ่าสำหรับการวิ่งราว`);
    let msg = await message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`กำลังทำการวางอผนวิ่งราวทรัพ...`)
        .setDescription(`__**วิธีการ**__
คุณต้องแอบเข้าไปวิ่งราวด้านซ้ายและด้านขวา
หากเลือกผิดคุณจะถูกจับและหักเงิน
กรุณาเลือกทางเข้าหาเหยื่อเข้าด้าน ⬅️ หรือ ➡️`)
.setColor(config.color))
    let stealamount = Math.floor(target.point * 0.05)

    await msg.react(`⬅️`);
    msg.react(`➡️`);
    const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = msg.createReactionCollector(filter, {
        max: 1,
        time: 30 * 1000
    });
    
    let targetuser = bot.users.cache.get(targetid);
    collector.on('collect', async r => {
        target = await bot.db.getuser(targetid);
        userdata = await bot.db.getuser(message.author)
        msg.reactions.removeAll()
        let select = r.emoji.name == '⬅️' ? 1 : 2

        if (Math.floor(Math.random() * 2) + 1 == select) {
        let index = target.backpackinventory.indexOf(10);
        console.log(target.backpackinventory,index)
            if (index !== -1) {
                target.backpackinventory.splice(index, 1);
                
                msg.edit(new Discord.MessageEmbed()
                    .setDescription(`${message.author} ไม่สามารถขโมยกระเป๋าเงินของ ${targetuser}\nเนื่องจาก ${targetuser} มี ${bot.item[10].name}`)
                    .setColor(config.colorfail)
                    .setFooter(`Roleplay MMO V.1`)
                    .setTimestamp())
                targetuser.send(new Discord.MessageEmbed()
                    .setDescription(`${message.author} พยายามขโมยกระเป๋าของคุณแต่คุณมี ${bot.item[10].name} เขาจืงไม่สามารถขโมยได้`)
                    .setColor(config.colorsuccess)
                    .setFooter(`Roleplay MMO V.1`)
                    .setTimestamp())
                bot.db.prepare(`UPDATE users SET backpackinventory = :backpackinventory WHERE id = :id`).run({
                    backpackinventory: JSON.stringify(target.backpackinventory),
                    id: target.id
                })
            } else {
                
                msg.edit(new Discord.MessageEmbed()
                    .setDescription(`${message.author} ได้วิ่งราวของ ${targetuser}\nได้รับเงินจำนวน ${stealamount} <:starcoin:734368307670417409>`)
                    .setColor(config.colorsuccess)
                    .setFooter(`Roleplay MMO V.1`)
                    .setTimestamp())
                targetuser.send(new Discord.MessageEmbed()
                .setDescription(`${message.author} ทำการวิ่งราวกระเป๋าคุณ\nได้รับเงินจำนวน ${stealamount} <:starcoin:734368307670417409>`)
                .setColor(config.colorfail)
                .setFooter(`Roleplay MMO V.1`)
                .setTimestamp())
                bot.db.setpoint(userdata.id,userdata.point+stealamount,true).then(()=>{})
                bot.db.setpoint(target.id,target.point-stealamount,true).then(()=>{})
            }
        } else {
            if(userdata.point<stealamount) stealamount = userdata.point
            msg.edit(new Discord.MessageEmbed()
                .setDescription(`:x: | การแอบขโมยเครดิตล้มเหลว`)
                .setColor(config.colorfail)
                .setFooter(`คุณโดนต่อยกลับและโดนขโมยจำนวน ${stealamount} เครดิต`))
            targetuser.send(new Discord.MessageEmbed()  
                .setDescription(`${message.author} พยายามขโมยเงินของคุณ!\nแต่คุณได้ต่อยกลับและขโมยเงินของ ${message.author} จำนวน ${stealamount} <:starcoin:734368307670417409>`)
                .setColor(config.colorsuccess)
                .setFooter(`Roleplay MMO V.1`)
                .setTimestamp())
                bot.db.setpoint(userdata.id,userdata.point-stealamount,true).then(()=>{})
                bot.db.setpoint(target.id,target.point+stealamount,true).then(()=>{})
        }
    })
}
exports.conf = {
    aliases: [],
    delay: 120000
};