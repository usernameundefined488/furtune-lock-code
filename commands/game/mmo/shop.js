const Discord = require("discord.js-light")
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
};

let itemlist = ["backpack", "fishing_rod", "pickaxe", 10];
let num = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    message.delete();
    let userdata = await bot.db.getuser(message.author);
    const embedgen = async () => {
        let e = new Discord.MessageEmbed()
            .setAuthor(`Shop - ร้านค้า`, bot.user.displayAvatarURL())
            .setColor(config.color)
            .setThumbnail(message.author.displayAvatarURL());
        for (let i = 0; i < itemlist.length; i++) {
            let item;
            if (typeof (itemlist[i]) == "number") {
                item = bot.item[itemlist[i]]
            } else {
                item = bot.item[itemlist[i]][userdata[itemlist[i]] + 1]
                if (!item) {
                    item = bot.item[itemlist[i]][userdata[itemlist[i]]]
                    item.price = Infinity;
                }
            }
            e.addField(`${num[i]} ${item.name}`, `╰\`ราคา\` ${item.price} <:coin:803105205113323521>`)
        }
        e.setFooter(`มี ${userdata.point} ${config.econame}`, message.author.displayAvatarURL());
        return e;
    }
    let msg = await message.channel.send(await embedgen());
    for (let i = 0; i < itemlist.length; i++) {
        await msg.react(num[i]);
    }
    msg.react("❌");

    const buy = async (i) => {
        userdata = await bot.db.getuser(message.author);
        if (typeof (itemlist[i]) == "number") {
            if (userdata.backpackinventory.length >= config.storageperlvl * userdata.backpack) {
                msg.edit(new Discord.MessageEmbed()
                    .setAuthor("Failed", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
                    .setDescription(`${message.author} ไม่สามารถซื้อ ${item.name} ได้เนื่องจาก กระเป๋าคุณเต็มแล้ว`)
                    .setColor(config.colorfail))
            } else {
                let item = bot.item[itemlist[i]]
                try {
                    await bot.db.removepoint(message.author.id, item.price).then(async (removed) => {
                        if (removed) {
                            await bot.db.additem(message.author.id, itemlist[i], 1)
                            msg.edit(new Discord.MessageEmbed()
                                .setAuthor("Success", "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png")
                                .setDescription(`${message.author} ซื้อ ${item.name} แล้ว`)
                                .setColor(config.colorsuccess));
                            userdata.backpackinventory.push()
                            bot.db.prepare(`UPDATE users SET backpackinventory = :inventory WHERE id = :id`).run({
                                inventory: JSON.stringify(userdata.backpackinventory),
                                id: message.author.id
                            })
                        }
                    })
                } catch (err) {

                    msg.edit(new Discord.MessageEmbed()
                        .setAuthor("Failed", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
                        .setDescription(`${message.author} ไม่สามารถซื้อ ${item.name} ได้เนื่องจาก ${err}`)
                        .setColor(config.colorfail))

                }
            }
            msg.edit(await embedgen())

        } else {
            let item = bot.item[itemlist[i]][userdata[itemlist[i]] + 1]

            if (!item) {
                item = bot.item[itemlist[i]][userdata[itemlist[i]]]
                item.price = Infinity;
                return msg.edit(new Discord.MessageEmbed()
                    .setAuthor("Failed", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
                    .setDescription(`${message.author} ไม่สามารถซื้อ ${item.name} ได้เนื่องจากเลเวลของชิ้นนั้นเต็มแล้ว`)
                    .setColor(config.colorfail))
            }
            await bot.db.removepoint(message.author.id, item.price).then((removed) => {
                if (removed) {
                    userdata[itemlist[i]]++
                    msg.edit(new Discord.MessageEmbed()
                        .setAuthor("Success", "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png")
                        .setDescription(`${message.author} ซื้อ ${item.name} แล้ว`)
                        .setColor(config.colorsuccess));
                    bot.db.prepare(`UPDATE users SET ${itemlist[i]} = :level WHERE id = :id`).run({
                        level: userdata[itemlist[i]],
                        id: message.author.id
                    })
                }
            }).catch((err) => {
                msg.edit(new Discord.MessageEmbed()
                    .setAuthor("Failed", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png")
                    .setDescription(`${message.author} ไม่สามารถซื้อ ${item.name} ได้เนื่องจาก ${err}`)
                    .setColor(config.colorfail))
            })
        }
        msg.edit(await embedgen())
    }
    const react = await msg.createReactionCollector((reaction, user) => (num + ["❌"].includes(reaction.emoji.name) && user != bot.user && message.author.id == user.id), {
        time: 1000 * 60 * 5
    })
    react.on('end', () => {
        msg.reactions.removeAll();
        let embed = new Discord.MessageEmbed()
            .setAuthor("Success", "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png")
            .setDescription(`ปิดหน้าต่างแล้ว`)
            .setColor(config.colorsuccess);
        msg.edit(embed)
        msg.delete({
            timeout: 2000
        })
    })
    react.on('collect', async r => {
        let user = r.users.cache.last()
        user.id != bot.user.id && r.users.remove(user);
        if (r.emoji.name === "❌") {
            react.stop();
        }
        if (num.includes(r.emoji.name)) {
            buy(num.indexOf(r.emoji.name));
        }
    })

}
exports.conf = {
    aliases: []
};