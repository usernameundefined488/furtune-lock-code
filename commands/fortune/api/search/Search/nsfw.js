const Discord = require('discord.js-light');
const client = require('nekos.life');
const neko = new client();
exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.reply("กรุณาใช้ที่ห้อง `NSFW`");
  if (!args[0]) return message.reply("กรุณาใส่คำที่ต้องการค้นหาด้วยค่ะ");

  let body;
  if (args[0] === `rhentai`) body = await neko.nsfw.randomHentaiGif();
  if (args[0] === `pussy`) body = await neko.nsfw.pussy();
  if (args[0] === `nekogif`) body = await neko.nsfw.nekoGif();
  if (args[0] === `neko`) body = await neko.nsfw.neko();
  if (args[0] === `lesbian`) body = await neko.nsfw.lesbian();
  if (args[0] === `kuni`) body = await neko.nsfw.kuni();
  if (args[0] === `cumsluts`) body = await neko.nsfw.cumsluts();
  if (args[0] === `classic`) body = await neko.nsfw.classic();
  if (args[0] === `bj`) body = await neko.nsfw.bJ();
  if (args[0] === `anal`) body = await neko.nsfw.anal();
  if (args[0] === `avatar`) body = await neko.nsfw.avatar();
  if (args[0] === `yuri`) body = await neko.nsfw.yuri();
  if (args[0] === `trap`) body = await neko.nsfw.trap();
  if (args[0] === `tits`) body = await neko.nsfw.tits();
  if (args[0] === `girlsologif`) body = await neko.nsfw.girlSoloGif();
  if (args[0] === `girlsolo`) body = await neko.nsfw.girlSolo();
  if (args[0] === `pussywankgif`) body = await neko.nsfw.pussyWankGif();
  if (args[0] === `pussyart`) body = await neko.nsfw.pussyart();
  if (args[0] === `kemonomimi`) body = await neko.nsfw.kemonomimi();
  if (args[0] === `kitsune`) body = await neko.nsfw.kitsune();
  if (args[0] === `holo`) body = await neko.nsfw.holo();
  if (args[0] === `holoero`) body = await neko.nsfw.holoEro();
  if (args[0] === `hentai`) body = await neko.nsfw.hentai();
  if (args[0] === `futanari`) body = await neko.nsfw.futanari();
  if (args[0] === `femdom`) body = await neko.nsfw.femdom();
  if (args[0] === `feetgif`) body = await neko.nsfw.feetGif();
  if (args[0] === `erofeet`) body = await neko.nsfw.eroFeet();
  if (args[0] === `feet`) body = await neko.nsfw.feet();
  if (args[0] === `ero`) body = await neko.nsfw.ero();
  if (args[0] === `erokitsune`) body = await neko.nsfw.eroKitsune();
  if (args[0] === `eroneko`) body = await neko.nsfw.eroNeko();
  if (args[0] === `eroyuri`) body = await neko.nsfw.eroYuri();
  if (args[0] === `cumarts`) body = await neko.nsfw.cumArts();
  if (args[0] === `blowJob`) body = await neko.nsfw.blowJob();
  if (args[0] === `spank`) body = await neko.nsfw.spank();
  if (args[0] === `gasm`) body = await neko.nsfw.gasm();

  if (!body) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`❌ ไม่สามารถค้นหา: \`${args[0]}\``)
  .setColor(config.colorfail))

  let Embed = new Discord.MessageEmbed()
  .setAuthor(`ค้นหา: ${args[0]}`, bot.user.displayAvatarURL())
  .setColor(config.color)
  .setImage(body.url)
  .setFooter("ร้องขอโดย " + message.author.username)
  message.channel.send(Embed);

};
exports.conf = {
  aliases: []
};