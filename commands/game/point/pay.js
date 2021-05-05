const Discord = require("discord.js-light")
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
        let target = message.mentions.users.first();
        if(target === message.author) return message.channel.send(`❌ | อย่าแท็กตัวเองสิคะ!!`);
		if(target&&!args[1]) return message.channel.send(`❌ | กรุณาใส่จำนวนเงินด้วยนะคะ`);
		if(!target||!parseInt(args[1])) return message.channel.send("❌ | คำสั่งไม่ถูกต้อง");
		let amount = parseInt(args[1]);
		let msg = await message.channel.send(`❓ | นายท่านแน่ใจหรือไม่ที่จะโอน ${config.econame} จำนวน \`${amount}\` ให้ ${target}`);
		await msg.react("✅");
		msg.react("❌");
		const react = msg.createReactionCollector((reaction, user) => (["✅","❌"].includes(reaction.emoji.name)&&user != bot.user&&message.author.id==user.id), { time: 1000*30 })
		react.on('collect',async collected => {
			msg.reactions.removeAll();
			if(collected.emoji.name === "✅"){
				await bot.db.paypoint(message.author.id,target.id,args[1]).then(async(ispay)=>{
					if(ispay){
						await msg.edit(`<a:checkmark:803108274538020904> | ทำการโอน ${config.econame} จำนวน \`${amount}\` ให้ ${target} แล้วค่ะ!`);
					}
				}).catch(async(reason)=>{
					await msg.edit(`:x: | ไม่สามารถโอน ${config.econame} ได้เนื่องจาก ${reason}`);
				})
			react.stop();
			}
			if (collected.emoji.name === "❌") {
				await msg.edit(`<a:checkmark:803108274538020904> | ทำการยกเลิกการทำรายการแล้วค่ะ`);
				react.stop();
			}})
}
exports.conf = { aliases: [] };