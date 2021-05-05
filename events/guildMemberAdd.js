const Discord = require("discord.js-light")
const chalk = require("chalk")
/**
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").GuildMember} member
 */
module.exports = async (bot,member)=>{
    let guilddata = await bot.db.getguild(member.guild.id)
    if(guilddata&&guilddata.joinid){
        let channel = await member.guild.channels.cache.get(guilddata.joinid)
        if(channel&&guilddata.joinmsg) {
        channel.send(new Discord.MessageEmbed().setAuthor(`ยินดีต้อนรับสู่ ${member.guild.name}`, `https://cdn.discordapp.com/attachments/717494960898965536/734349862732169247/text-plus-icon-1.png`)
        .addField('ชื่อผู้ใช้', member.user.username)
        .setField('เข้ามาคนที่', member.guild.members.cache.size)
        .setFooter(`https://fortune.moe`)
        .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL()))}
    }
    function replace(str) {
        return str
        .replace(/\${member}/g,member.user)
        .replace(/\${member.tag}/g,member.user.tag)
        .replace(/\${member.username}/g,member.user.username)
        .replace(/\${count}/g,member.guild.members.cache.size)
        .replace(/\${guildname}/g,member.guild.name)
    }
}