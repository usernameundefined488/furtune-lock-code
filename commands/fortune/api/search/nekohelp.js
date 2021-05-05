const Discord = require("discord.js-light");
exports.run = async (bot, message, args) => {

  let nsfw = new Discord.MessageEmbed()
    .setAuthor(`Fortune Neko「NSFW Search」`, bot.user.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`วิธีใช้งาน \`${prefix}nsfw คำที่ต้องการค้นหา\`
ใช้ได้เฉพาะห้อง \`NSFW\`

:books: __**คำที่ต้องการค้นหา**__
rhentai, pussy, nekogif, neko, lesbian, kuni, cumsluts,
classic, bj, anal, avatar, yuri, trap, tits, girlsologif, girlsolo,
pussywankgif, pussyart, kemonomimi, kitsune, holo, holoero, hentai,
futanari, femdom, feetgif, erofeet, feet, ero, erokitsune, eroneko,
eroyuri, cumarts, blowJob, spank, gasm
`)

  let sfw = new Discord.MessageEmbed()
    .setAuthor(`Fortune Neko「SFW Search」`, bot.user.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`วิธีใช้งาน \`${prefix}pic คำที่ต้องการค้นหา\`

:books: __**คำที่ต้องการค้นหา**__
smug, baka, neko, nekogif, lizard, foxgirl,
kemonomimi, holo, woof, wallpaper, goose, avatar, waifu
`)

  let emote = new Discord.MessageEmbed()
    .setAuthor(`Fortune Neko「EMOTE」`, bot.user.displayAvatarURL())
    .setColor(config.color)
    .setDescription(`วิธีใช้งาน \`${prefix}คำที่ต้องการค้นหา @แท็กผู้ใช้\`

:crystal_ball: __**คำที่ต้องการค้นหา**__
cuddle, feed, hug, kiss, pat, poke, slap, tickle
`)


  //main help
  let embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setAuthor(`Fortune Neko`, bot.user.displayAvatarURL())
    .setThumbnail(`https://cdn.nekos.life/neko/neko_179.jpg`)
    .setDescription(`:thought_balloon: **กรุณาเลือกหมวดหมู่ Neko**
 ┊\`${prefix}nekohelp nsfw\` :sparkles: สำหรับคำสั่ง NSFW
 ┊\`${prefix}nekohelp sfw\` :cherry_blossom: สำหรับคำสั่ง SFW
 ╰\`${prefix}nekohelp emote\` :revolving_hearts: สำหรับคำสั่ง EMOTE`)
    .setFooter(`FortuneNeko V1 | AkenoSann#4284`)

  //check
  if (args[0] == `nsfw`) {
    message.channel.send(nsfw)
  } else if (args[0] == `sfw`) {
    message.channel.send(sfw)
  } else if (args[0] == `emote`) {
    message.channel.send(emote)
  } else {
    message.channel.send(embed)
  }

}
exports.conf = {
  aliases: ["neko"]
};