const Discord = require("discord.js");
/**
 * @param {import("discord.js-light").client} bot
 * @param {import("discord.js-light").Message} message
 * @param {[String]} args
 */
exports.run = async (bot, message, args) => {
    message.channel.send(`:x: | ปิดใช้งานชั่วคราวค่ะ!`);
//     message.channel.send(new Discord.MessageEmbed()
//         .setAuthor(`${message.member.displayName} ได้สร้างห้องติดต่อ`, `${message.author.displayAvatarURL()}`)
//         .setColor(config.color))

//         let private = new Discord.MessageEmbed()
//         .setAuthor(`📝 ห้องติดต่อส่วนตัว TICKET`)
//         .setDescription(`หากทำการใช้งานเสร็จให้พิมพ์ __**${prefix}close**__
// หากพบข้อผิดพลาดโปรดติดต่อ [Support Fortune](https://fortune.moe)`)
//         .setColor(config.color)
        
//     let category = bot.channels.cache.find(c => c.name.match(/Ticket/i) && c.type == "category");
//             if (!category) category = await guild.channels.create("Ticket", { type: "category" })
//     let channel___ = bot.channels.cache.find(c => c.name == `ticket` + `-` + message.author.id.slice(0, 5) && c.type == "text");
//     if (!channel___) { message.guild.channels.create(`Ticket` + ` ` + message.author.id.slice(0, 5), {
//                         type: "text",
//                         parent: category,
//                         topic: `Ticket`,
//                         permissionOverwrites: [
        
//                             {
//                                 id: message.guild.id,
//                                 deny: ["VIEW_CHANNEL"]
//                             },
//                             {
//                                 id:  message.author.id,
//                                 allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_CHANNELS", "ATTACH_FILES", "EMBED_LINKS"]
//                             }
//                         ],
//                     }).then(channel___ => {
//                         channel___.send(private)
//                     });
            
//     }
}
exports.conf = {
    aliases: []
};