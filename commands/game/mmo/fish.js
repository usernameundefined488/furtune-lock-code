const Discord = require("discord.js-light")
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let userdata = await bot.db.getuser(message.author.id)
    if(userdata.backpackinventory.length>=config.storageperlvl*userdata.backpack){
        return message.channel.send(":x: | กระเป๋าคุณเต็มแล้วนะคะ...ขายของก่อนมั้ย?")
    }
    
    let fishing_rod = bot.item.fishing_rod[userdata.fishing_rod]
    const expanded = fishing_rod.rate.flatMap(fish => Array(fish.pct).fill(fish));
    let reward = []
    let fishtime = 2
    for (let i = 0; i < fishtime; i++) {
        let fish = expanded[Math.floor(Math.random() * expanded.length)].id;
        if(fish) reward.push(fish)
    }
    message.channel.send(new Discord.MessageEmbed()

    .addField(`${fishing_rod.emoji} เย้สำเร็จแล้ว!`,`คุณตกปลา **${fishtime}** รอบและได้:
${reward.length?reward.map((id)=>"+ "+bot.item[id].emoji+" "+bot.item[id].name).join("\n"):":x: คุณไม่ได้อะไรเลย ;-;"}`)
    .setAuthor(`🏞️ ณ. ริมน้ำที่แสนสงบ`)
    .setColor(config.color)
    )
    for (let i = 0; i < reward.length; i++) {
        if(userdata.backpackinventory.length>=config.storageperlvl*userdata.backpack){
            message.channel.send(":x: | กระเป๋าคุณเต็มแล้วนะคะ...ขายของก่อนมั้ย?")
            break;
        }
        userdata.backpackinventory.push(reward[i])
    }
    bot.db.prepare(`UPDATE users SET backpackinventory = :backpackinventory WHERE id = :id`).run({
        backpackinventory: JSON.stringify(userdata.backpackinventory),
        id: message.author.id
    })
}
exports.conf = { aliases: ["f"],delay: 4000 };