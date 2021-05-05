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
        if(channel&&guilddata.leavemsg) {
        channel.send(new Discord.MessageEmbed().setAuthor('ลาก่อน', `https://cdn.discordapp.com/attachments/717494960898965536/734349932412010526/close.png`)
        .addField('ชื่อผู้ใช้', member.user.username)
        .setField('เหลือผู้ใช้', member.guild.members.cache.size)
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