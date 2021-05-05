const Discord = require('discord.js-light')
  /**
   *
   *
   * @param {import("discord.js-light").Client} bot
   * @param {import("discord.js-light").Message} message
   * @param {String[]} args
   */
  exports.run = async (bot, message, args) => {
      let text = ""
      let list = await bot.db.prepare(`SELECT * FROM users ORDER BY point DESC LIMIT 5`).all();
        for (let i = 0; i < list.length; i++) {
          if(!await bot.users.fetch(list[i].id)){ text+=`${i+1} ${list[i].id} มี ${list[i].level}\n`;
          continue;}
          text+=`${i+1}. ${Discord.Util.escapeMarkdown((await bot.users.fetch(list[i].id)).username)} | <:coin:803105205113323521> ${list[i].point}\n`
        }
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`อันดับคนสะสมเงินเยอะที่สุด <a:money_bag:805388969369796618>`)
        .setDescription(`${text}`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/717494960898965536/725058941117005856/topmoney.png`)
        .setColor(config.color)
        .setFooter(`Fortune Leaderboard API v2`));
  }
  exports.conf = { aliases: [] };