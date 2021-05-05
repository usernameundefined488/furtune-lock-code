const Discord = require("discord.js-light");
const request = require("request");
exports.run = async (bot, message, args) => {
    message.channel.startTyping();
    await this.sendWaifu(bot, message);
    message.channel.stopTyping();
}
exports.sendWaifu = (bot, message) => {
    let url = 'https://www.thiswaifudoesnotexist.net/';
    let image = (num) => { return `example-${num}.jpg` };
    let snippet = (num) => { return `snippet-${num}.txt` };
    let description = (body) => { return ((body.length > 500) ? body.slice(0, 500) + '...' : body) };
    let num = Math.floor(Math.random() * 199999);
    request(url+snippet(num), (error, response, body) => {
        if (error) return;
        if (body && !body.includes('404 Not Found')) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`🌸 | ไวฟุที่ถูกสุ่มได้`)
            .setColor(config.color)
            .setImage(url+image(num))
            .setDescription(description(body))
            .setFooter(`ขอบคุณข้อมูลจาก Thiswaifudoesnotexist`)
            .setTimestamp()
            message.channel.send(embed);
        } else {
            console.log('No waifu '+num);
            this.sendWaifu(bot, message);
        }
    })
}
exports.conf = { aliases: [] };