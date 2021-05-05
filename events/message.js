const talkedRecently = new Map()
const Discord = require("discord.js")
const fetch = require('node-fetch');
const config = require("../config/config");

module.exports = async (bot, message) => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") return;
	
	if (!message.content.startsWith(prefix)) return false;
	const slice = message.content.startsWith(prefix) ? prefix.length : 0
	const args = message.content.slice(slice).split(/\s+/)

	let command = args.shift().toLowerCase()
	if (!bot.commands.has(command)) {
		command = bot.aliases.get(command)
		if (!command) return;
	}
	message.guild.prefix = config.prefix
	console.log([message.author.tag, command, ...args].join(" | "))
	if (talkedRecently.has(command + message.author.id)) {
		let delayend = talkedRecently.get(command + message.author.id)
		let nowtime = new Date().getTime()
		if (nowtime > delayend) {
			talkedRecently.delete(message.author.id)
		} else return message.reply(`กรุณารออีก ${((delayend-nowtime)/1000).toFixed(1)} วิ`).then((msg) => {
			msg.delete({
				timeout: delayend - nowtime
			});
		});
	}
	let delay = bot.commands.get(command).conf && bot.commands.get(command).conf.delay ? bot.commands.get(command).conf.delay : 1000;
	talkedRecently.set(command + message.author.id, new Date().getTime() + delay);
	let price = bot.commands.get(command).conf && bot.commands.get(command).conf.price ? bot.commands.get(command).conf.price : 0;
	if (price != 0 && !message.member.hasPermission("ADMINISTRATOR")) {
		let embed = new Discord.MessageEmbed()
			.setAuthor("รอการยืนยัน", "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-warning-icon.png")
			.setDescription(`${message.author} แน่ใจหรือไม่ที่จะใช้คำสั่ง ${command} ซึ่งใช้ ${config.econame} จำนวน ${price} <:starcoin:734368307670417409>`)
			.setColor("#ffae42");
		let msg = await message.channel.send(embed);
		await msg.react("✅");
		msg.react("❌");
		const react = msg.createReactionCollector((reaction, user) => (["✅", "❌"].includes(reaction.emoji.name) && user != bot.user && message.author.id == user.id), {
			max: 1,
			time: 1000 * 30
		})
		react.on('collect', async collected => {
			msg.reactions.removeAll();
			if (collected.emoji.name === "✅") {
				bot.db.removepoint(message.author, price).then(() => {
					try {
						bot.commands.get(command).run(bot, message, args)

					} catch (error) {
						let embed = new Discord.MessageEmbed()
							.setTitle(`มีปัญหาในการเรียกใช้คำสัง \`${command}\``)
							.setDescription(error)
							.setColor(config.colorfail)
						message.channel.send(embed)
					}
				}).catch(err => {
					message.channel.send(new Discord.MessageEmbed()
						.setTitle(`คุณไม่สามารถใช้คำสัง \`${command}\` ได้`)
						.setDescription(`เนื่องจาก ${err}`)
						.setColor(config.colorfail))
				})
			}
			if (collected.emoji.name === "❌") {
				embed.setAuthor("Canceled", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
					.setDescription(`${message.author} ยกเลิกการทำรายการ ❌`)
					.setColor(config.colorfail)
				await msg.edit(embed);
			}
		})
	} else {
		try {
			bot.commands.get(command).run(bot, message, args)

		} catch (error) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`มีปัญหาในการเรียกใช้คำสัง \`${command}\``)
				.setDescription(error)
				.setColor(config.colorfail)
			message.channel.send(embed)
		}
	}
}