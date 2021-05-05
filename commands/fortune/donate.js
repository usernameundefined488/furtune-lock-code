const Discord = require('discord.js')
const truewallet = require('../../apis/truewallet');

exports.run = async (bot, message, args) => {

  let embed = new Discord.MessageEmbed() 
  .setAuthor(`ช่องทางการสนับสนุน`) 
  .setDescription(`💸 โอนผ่านการสร้างซองอังเปา Wallet
จากนั้นใช้คำสั่ง \`${prefix}donate (ลิ้งก์ซองอังเปา)\``) 
  .setColor(`#ffa0ee`)
  .setImage(`https://cdn.discordapp.com/attachments/717494960898965536/732344551880261673/support.png`) 
  .setFooter(`ถ้าหากเกินโดเนท 130 จะได้รับยศ Premium ถาวร!`)
let tw_gif = args[0]
  if(!tw_gif) return message.channel.send(embed);
  
  if(tw_gif){
    if(message.channel.id !== `732214858841325608`) return message.channel.send(`:x: | คำสั่งนี้ใช้ได้เฉพาะในดิสคอต \`Fortune ในห้อง〔💼〕ใช้คำสั่งบอท\` เท่านั้นค่ะ!`)|

    console.log(`check: ` + tw_gif)
    truewallet.redeemvouchers('0971051957', tw_gif) //เบอร์ใคร?? เอออยากรู้เหมือนกัน
    .then(async (res) => {
      
      console.log(res)
      console.log(res.amount)
  
      let target = message.author;
      if(res.amount > `130` || res.amount === `130`) {
        await bot.db.prepare(`UPDATE users SET premium = 1 WHERE id = :id`).run({
            id: target.id
        })
        message.member.roles.add('684326180286889998').then(()=>{
          message.channel.send(`<a:checkmark:803108274538020904> | ${message.author.tag} เนื่องจากมีการโดเนทเกิน \`130\`! หนูจึงขอเพิ่ม Premium ถาวรให้ค่ะ!`)
          message.channel.send(`<@617402044659269655>`).then(msg => msg.delete())
      })
      }else if(res.amount === null || res.amount === undefined){
          message.channel.send(`:x: | ${message.author.tag} ไม่พบเลขอังเปาค่ะ!`)
      }else{
        message.channel.send(`<a:checkmark:803108274538020904> | ${message.author.tag} ขอบคุณสำหรับการสนับสนุนนะคะ!`)
        message.channel.send(`<@617402044659269655>`).then(msg => msg.delete())
      }
    });
  }
};
  exports.conf = { aliases: [] };
