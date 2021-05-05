const talkedRecently = new Set();
const Discord = require("discord.js-light");
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 */
module.exports = async (bot, raw) => {
  if (raw.t == "INTERACTION_CREATE") {
      console.log(raw.d.data)
    const command = raw.d.data.name
    const message = {
        author: await bot.users.fetch(raw.d.member.user.id),
        channel: await bot.channels.fetch(raw.d.channel_id),
        guild: await bot.guilds.fetch(raw.d.guild_id)
    }
    const args = {};
    if(raw.d.data.options){
        for (let i = 0; i < raw.d.data.options.length; i++) {
            args[raw.d.data.options[i].name] = raw.d.data.options[i].value;
        }
    }
    if (talkedRecently.has(message.author.id)) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`กรุณารอ \`2\` วิ... \`${message.author.tag}\``)
        .setFooter(`ระบบป้องกันฟลัดถูกใช้งาน`)
        .setTimestamp()
        .setColor("#ff0000");
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 2000 });
      });
    } else {
      if (bot.commmandsslash.has(command)) {
        bot.commmandsslash.get(command).run(bot, message, args);
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 2000);
      } else if (bot.aliases.has(command)) {
        bot.commmandsslash.get(bot.aliases.get(command)).run(bot, message, args);
      }
    }
  }
};
