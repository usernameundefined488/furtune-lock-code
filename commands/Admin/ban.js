exports.run = async(client, message, args) => {
    let member = await message.guild.members.fetch(args.user);

    if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(`❌ | นายท่านไม่มีสิทธิ์ใช้คำสั่งนะคะ!...//ขำเบาๆ~`)

    if(!member) return message.channel.send(`❌ | นายท่านต้องแท็กคนที่ต้องการแบนด้วยนะคะ...คิกๆ//แอบขำเบาๆ`);
    if(!member.bannable)  return message.channel.send(`❌ | หนูไม่มีสิทธิ์พอที่จะแบนผู้ใช้งานกรุณาให้สิทธิ์และปรับหนูให้อยู่สูงกว่าผู้ใช้...//ก้ม`);

    let reason = args.join(" ")||"ไม่พบเหตุผลที่ระบบค่ะ";

    member.ban(reason)
        .then(()=>message.channel.send(`👌 | ${member.user.tag} ถูกแบนเพราะ: ${reason}`))
        .catch(error => message.channel.send(`🙏 | ขอโทษค่ะหนูไม่สามารถแบนผู้ใช้ได้เนื่องจาก: \`${error}\``));
}

exports.conf = { aliases: [] };