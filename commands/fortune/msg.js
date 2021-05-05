/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = (bot, message, args) => {
  let usertext = message.mentions.users.first();
  if (!message.member.hasPermission("SEND_MESSAGES")) {
    message.channel.send(`:x: | นายท่านไม่มีสิทธ์ในการใช้คำสั่งนะคะ...//มอง`);
  }
  let text = args.slice(1).join(' ');
  if (!usertext) {
    if (!text) {
      message.channel.send(`:x: | นายท่านต้องแท็กคนที่ต้องการส่งด้วยนะคะ...//มอง`).then((msg) => {
        msg.delete(5000);
      });
    }
    return;
  }
  if (!text) {
    message.channel.send(`:x: | กรุณาใส่คำที่จะส่งด้วยนะคะ...//มอง`).then((msg) => {
      msg.delete(5000);
    });
    console.log('bot: error no text in chat')
  }

  if (usertext) {
    if (text) {
      message.channel.send(`<a:checkmark:803108274538020904> | ข้อความถูกส่งแล้วค่ะ :incoming_envelope:`)
      usertext.send(`:envelope_with_arrow: ${message.author.tag} ส่งข้อความมาว่า: ` + `${text}`)
        .catch(error => message.channel.send(`🙏 | ขอโทษค่ะหนูไม่สามารถส่งข้อความถึงผู้ใช้ได้เนื่องจาก: \`ผู้ใช้งานได้ปิดการส่งข้อความจากคนแปลกหน้า\``))
    }
  }
}
exports.conf = {
  aliases: [],
  price: 200
};