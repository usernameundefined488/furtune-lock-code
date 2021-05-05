  const Discord = require('discord.js-light') 
  /**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async(bot, message, args) => {
  message.delete()
  
  if(!message.author.id == ("617402044659269655")) return message.channel.send(`:x: | นายท่านไม่มีสิทธ์ผู้พัฒนานะคะ...//มอง`);

  let msg = message.channel.send("กำลังรีโหลด command(s)! 🔄")
  require(appRoot+'/config/command')(bot);
  msg.then((msg)=>{
    msg.edit("รีโหลด command(s) เสร็จแล้ว <:CheckMark:515870172377120780>")
  })
}

exports.conf = { aliases: [],
permission: "dev"};