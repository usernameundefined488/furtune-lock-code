const Discord = require("discord.js-light");
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};

exports.run = async (bot, message, args) => {

let embed = new Discord.MessageEmbed()
  .setImage(`https://cdn.discordapp.com/attachments/717494960898965536/724856089572802640/discord.png`)
  .setAuthor("Fortune command", `https://cdn.discordapp.com/attachments/717494960898965536/734354609052581938/fortune.png`)
  .setDescription("🌸 สวัสดีค่ะหนูฟอร์จูนเองน้าจำกันได้มั้ยเอ่ยถ้าอยากรู้หนูทำไรได้ก็สามารถกด **REACT** ปุ่มต่างๆเหล่านี้ได้เลยนะคะ")
  .addField("💭 ติดต่อผู้ดูแลระบบ", "┊``Discord`` https://fortune.moe/discord/9waufjv0h440\n╰``InviteBot`` [Invite.Fortune.Moe](https://discordapp.com/oauth2/authorize?client_id=618441438564188196&scope=bot&permissions=8)")
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)
  
let embed_music = new Discord.MessageEmbed()
  .setAuthor("🎵・คำสั่งเพลง")
  .setDescription(`ไม่พบคำสั่ง`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let embed_game = new Discord.MessageEmbed()
  .setAuthor("🎮・คำสั่งมินิเกมส์")
  .setDescription("<a:692267344042655786:792426931856998442> การเล่นเกมส์ต่างๆจะช่วยเพิ่มเลเวลด้วยน้าา")
  .addField("<:fortune_chibi:734327972953194496> คำสั่งเกมส์ mmorpg", `┊\`${prefix}fish\` สำหรับตกปลา
┊\`${prefix}mine\` สำหรับขุดแร่
┊\`${prefix}shop\` สำหรับเปิดร้านค้า
┊\`${prefix}inv\` สำหรับดูช่องเก็บของ
╰\`${prefix}sell (ไอเท็ม) (จำนวน)\` สำหรับขายของในตัว`)
  .addField("<:fortune_chibi:734327972953194496> คำสั่งเกมส์ roleplay", `╰\`${prefix}rob (แท็กผู้ใช้)\` สำหรับปล้นคนอื่น`)
  .addField("<:fortune_chibi:734327972953194496> คำสั่งเกมส์จาก API ภายนอก", `╰\`${prefix}akinator\` ให้หนูทายตัวละครในความคิดได้`)
  .addField("<:fortune_chibi:734327972953194496> คำสั่งเกมส์การพนัน", `╰\`${prefix}baccara (จำนวนเงินที่ลง)\` สำหรับเล่นบาร์คาร่า`)
  .addField("<:fortune_chibi:734327972953194496> คำสั่งการเพิ่มเติม", `┊\`${prefix}pay (แท็กผู้ใช้) (จำนวนเงิน)\`
┊\`${prefix}trade (แท็กผู้ใช้) (ชื่อไอเทม) (จำนวน)\` สำหรับส่งของ
╰\`${prefix}point\` สำหรับเช็คพอยต์ที่มี`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let embed_board = new Discord.MessageEmbed()
  .setAuthor("📙・คำสั่งอันดับต่างๆ")
  .setDescription(`\`${prefix}leaderboard\` ดูอันดับคนเลเวลเยอะที่สุด
\`${prefix}topmoney\` อันดับคนสะสมเงินเยอะที่สุด
\`${prefix}level (แท็กผู้ใช้)\` ดูเลเวลคนนั้นๆ`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let embed_normal = new Discord.MessageEmbed()
  .setAuthor("📚・คำสั่งทั่วไป")
  .setDescription(`<:fortune_chibi:734327972953194496> **ค้นข้อมูลทั่วไป**
┊\`${prefix}profile\` สำหรับดูข้อมูลของตัวเอง
┊\`${prefix}waifu\` ค้นหาไวฟุ
┊\`${prefix}roblox\` (ชื่อในเกม) ค้นหาไอดี Roblox
┊\`${prefix}nekohelp\` ค้นหารูปภาพ loli,Neko
┊\`${prefix}donate\` สำหรับเปิดหน้าโดเนท
┊\`${prefix}shake (แท็กผู้ใช้)\` เขย่าๆ
╰\`${prefix}ticket\` เปิดห้องส่วนตัว

<:fortune_chibi:734327972953194496> **สนุกสนาน**
┊\`${prefix}love\` สุ่มคู่รัก
┊\`${prefix}lovecheck (แท็กผู้ใช้)\` เช็คความเป็นไปได้ในการคบกัน
┊\`${prefix}handsome\` ดูความหล่อ
╰\`${prefix}moral\` ดูความดีชั่ว

<:fortune_chibi:734327972953194496> **ระบบ**
┊\`${prefix}botinfo\` ดูข้อมูลบอท
┊\`${prefix}ping\` ดูความหน่วง
╰\`${prefix}guild\` สำหรับดูข้อมูลกิล

<:fortune_chibi:734327972953194496> **การส่งข้อมูล**
┊\`${prefix}msg (แท็กผู้ใช้) (ข้อความ)\` ส่งข้อความ DM
┊\`${prefix}say (ข้อความ)\` บอทพิมพ์ตาม
╰\`${prefix}news (ข้อความ)\` ประกาศ`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let embed_profile = new Discord.MessageEmbed()
  .setAuthor("📝・คำสั่งตั้งค่าโปรไฟล์")
  .setDescription(`\`${prefix}profile\` สำหรับดูโปรไฟล์
\`${prefix}title (ฉายา)\` ตั้งฉายาตัวเอง
\`${prefix}class (คลาส)\` ตั้งคลาสตัวเอง
\`${prefix}name (ชื่อเล่น)\` ตั้งชื่อในโปรไฟล์
\`${prefix}gender (เพศ)\` ตั้งเพศ
\`${prefix}birthday (ปี-เดือน-วัน)\` ตั้งวันเกิด (แนะนำตั้ง +1 วัน)
\`${prefix}job (อาชีพ)\` ใส่อาชีพ
\`${prefix}status (สถานะ)\` ใส่สถานะ
\`${prefix}quotes (คำคม)\` ใส่คำคม`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let embed_admin = new Discord.MessageEmbed()
  .setAuthor("📊・คำสั่งแอดมินเซิร์ฟ")
  .setDescription(`\`${prefix}rrole (แท็กผู้ใช้) (แท็กยศ)\` สำหรับลบยศคนอื่น **(ปิดชั่วคราว)**
\`${prefix}arole (แท็กผู้ใช้) (แท็กยศ)\` สำหรับเพิ่มยศคนอื่น **(ปิดชั่วคราว)**
\`${prefix}kick (แท็กผู้ใช้) (เหตุผล)\` สำหรับเตะผู้ใช้ **(ปิดชั่วคราว)**
\`${prefix}all-role (แท็กยศ)\` สำหรับให้ยศทั้งหมด **(ปิดชั่วคราว)**
\`${prefix}rmall-role (แท็กยศ)\` สำหรับให้ลบทั้งหมด **(ปิดชั่วคราว)**
\`${prefix}roles-kick (แท็กยศ)\` สำหรับเตะผู้ใช้ที่มียศนั้นๆ **(ปิดชั่วคราว)**
\`${prefix}roles-ban (แท็กยศ)\` สำหรับแบนผู้ใช้ที่มียศนั้นๆ **(ปิดชั่วคราว)**
\`${prefix}ban (แท็กผู้ใช้) (เหตุผล)\` สำหรับแบนผู้ใช้ **(ปิดชั่วคราว)**
\`${prefix}delhook (webhook url)\` ลบ webhook แบบไม่ต้องใช้สิทธิแอดมิน
\`${prefix}clear (จำนวนข้อความ)\` ลบข้อความจำนวนมาก
\`${prefix}wc\` เพื่อตั้งข้อความการเข้าออกเซิร์ฟ
\`${prefix}verify\` เพื่อตั้งเช็คคำสั่ง GoogleRecaptcha`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let embed_emotion = new Discord.MessageEmbed()
  .setAuthor(`❤️・ท่าทาง「EMOTE」`)
  .setDescription(`วิธีใช้งาน \`${prefix}คำที่ต้องการค้นหา @แท็กผู้ใช้\`

:crystal_ball: __**คำที่ต้องการค้นหา**__
cuddle, feed, hug, kiss, pat, poke, slap, tickle
`)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let goodbyeuser = new Discord.MessageEmbed()
  .setAuthor("Fotune Alert!", `https://cdn.discordapp.com/attachments/717494960898965536/734354609052581938/fortune.png`)
  .setDescription("🌸 เอ๋หมดเวลาการใช้งาน `f!help` แล้วนะคะหากต้องการใช้งานโปรดพิมพ์คำสั่งอีกครั้ง")
  .addField("💭 ติดต่อผู้ดูแลระบบ", "┊``Discord`` https://fortune.moe\n╰``Email`` Support@fortune.moe")
  .setColor(config.color)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

let close_embed = new Discord.MessageEmbed()
  .setAuthor("Fotune Alert!", `https://cdn.discordapp.com/attachments/717494960898965536/734354609052581938/fortune.png`)
  .setDescription("🌸 ปิดการใช้งาน Help แล้วค่ะ")
  .setColor(config.color)
  .setFooter(`เวอร์ชั่น ${config.version}`, `${message.author.displayAvatarURL()}`).setTimestamp().setColor(config.color)

  message.react('🌸')
  let author = message.author;
  let msg;
  if (await message.channel.permissionsFor(message.member).has("ADD_REACTIONS")) {
    msg = message.channel.send(embed);
  } else {
    message.channel.send("หนูส่งคำสั่งไปส่วนตัวแล้วนะคะ")
    msg = message.author.send(embed);
  }

  msg.then(async (msg) => {
    await msg.react('🏠');
    await msg.react('📚');
    await msg.react('❤️');
    await msg.react('📝');
    await msg.react('🔉');
    await msg.react('🎮');
    await msg.react('📙');
    await msg.react('📊');
    msg.react('❌');
  })
  msg = await msg
  const filter = (reaction, user) => ['🏠', '📚', '❤️', '📝', '🔉', '🎮', '📙', '📊', '❌'].includes(reaction.emoji.name) && user.id === author.id;
  const collector = await msg.createReactionCollector(filter, {
    time: 1000 * 60 * 10
  });
  collector.on('collect', async r => {
    if (msg.guild) {
      let user = r.users.cache.last()
      user.id != bot.user.id && r.users.remove(user);
    }
    let embedtosend;
    if (r.emoji.name === '🏠') {
      embedtosend = embed
    }
    if (r.emoji.name === '📚') {
      embedtosend = embed_normal
    }
    if (r.emoji.name === '❤️') {
      embedtosend = embed_emotion
    }
    if (r.emoji.name === '📝') {
      embedtosend = embed_profile
    }
    if (r.emoji.name === '🔉') {
      embedtosend = embed_music
    }
    if (r.emoji.name === '🎮') {
      embedtosend = embed_game
    }
    if (r.emoji.name === '📙') {
      embedtosend = embed_board
    }
    if (r.emoji.name === '📊') {
      embedtosend = embed_admin
    }
    if (r.emoji.name === '❌') {
      msg.reactions.removeAll().then((msg) => {
        msg.edit(close_embed)
      })
    }
    msg.edit(embedtosend);
  });
  collector.on('end', () => {
    if (msg) msg.reactions.removeAll().then((msg) => {
      msg.edit(goodbyeuser)
    })
  });
};
exports.conf = {
  aliases: ["h"]
};