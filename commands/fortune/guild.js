const Discord = require('discord.js-light');
/**
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {[String]} args
 */
exports.run = async(bot, message, args) =>{
    function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    }
    
    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
            if(!member.user.bot) memberCount++;
        });
        return memberCount;
    }

    function checkOnlineUsers(guild) {
        let onlineCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "online")
                onlineCount++; 
        });
        return onlineCount;
    }
    let serverembed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())
        .setColor(config.color)
        .setDescription(`🌸 __**ข้อมูลต่างๆ**__
┊ เจ้าของ : ${message.guild.owner}
┊ เซิฟเวอร์ : ${message.guild.region}
╰ ชื่อ : ${message.guild.name}

🔮 __**ข้อมูลต่างๆ**__ ↷
\`\`\`
ความปลอดภัย : ${message.guild.verificationLevel}
มีห้องทั้งหมด : ${message.guild.channels.cache.size}
มีสมาชิกทั้งหมด : ${message.guild.memberCount}
ผู้ใช้ที่เป็นคน : ${checkMembers(message.guild)}
ผู้ใช้ที่เป็นบอท : ${checkBots(message.guild)}
ผู้ใช้ที่ออนไลน์ : ${checkOnlineUsers(message.guild)}
\`\`\``)
        .setThumbnail(message.guild.iconURL())
        .setFooter('🕚 เซิฟเวอร์ถูกสร้างเมื่อ:')
        .setTimestamp(message.guild.createdAt);

    return message.channel.send(serverembed);
}
exports.conf = { aliases: [] };