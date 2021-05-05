/**
*
*
* @param {import("discord.js-light").Client} bot
* @param {import("discord.js-light").Message} message
* @param {String[]} args
*/
exports.run = async(bot, message, args) =>{
    const deleteCount = parseInt(args[0]);
    message.delete();
        // if(!message.member.hasPermission("ADMINISTRATOR") || (message.author.id!==815878909505175602)) 
        // return message.channel.send(`❌ | นายท่านไม่มีสิทธิ์ใช้คำสั่งนะคะ!...//ขำเบาๆ~`)
          
          if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.channel.send(`⚠️ | นายท่านสามารถลบข้อความตั้งแต่สองข้อความแต่ไม่เกิน 100 ค่ะ!...//ก้ม`)
          
          const fetched = await message.channel.fetch({limit: deleteCount});
          message.channel.bulkDelete(deleteCount).catch(error => message.reply(`⚠️ | หนูไม่สามารถลบข้อความเนื่องจากข้อความมีอายุเกิน \`14\` วัน`))
}

exports.conf = { 
  delay: 5000,aliases: ["clear"] };