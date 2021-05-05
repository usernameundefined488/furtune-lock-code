/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    let member = await message.guild.members.fetch(args.user);

    if(!message.member.hasPermission("ADMINISTRATOR")) 
    return message.channel.send(`❌ | นายท่านไม่มีสิทธิ์ใช้คำสั่งนะคะ!...//ขำเบาๆ~`)

    if (!member) return message.channel.send(`:x: | นายท่านต้องแท็กคนที่ต้องการเตะด้วยนะคะ...คิกๆ//แอบขำเบาๆ`);
    if (!member.kickable) return message.channel.send(`:x: | หนูมีสิทธิ์ไม่พอที่จะเตะผู้ใช้งานกรุณาให้สิทธิ์และปรับหนูให้อยู่สูงกว่าผู้ใช้...//ก้ม`);

    let reason = args.join(" ")||"ไม่พบเหตุผลที่ระบุค่ะ";
    
    member.kick(reason)
        .then(() => message.channel.send(`👌 | ${member.user.tag} ถูกเตะพราะ: ${reason}`))
        .catch(error => message.channel.send(`🙏 | ขอโทษค่ะหนูไม่สามารถเตะผู้ใช้ได้เนื่องจาก: \`${error}\``));
}

exports.conf = {
    aliases: []
};