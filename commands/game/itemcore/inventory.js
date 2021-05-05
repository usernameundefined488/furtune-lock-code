const Discord = require("discord.js-light");
const config = require("../../../config/config");
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let idmember = message.mentions.users.first()||message.author
    let memberid = idmember.id;
    let user = await bot.db.getuser(memberid)
    let member = await bot.users.fetch(memberid)
    let embed = new Discord.MessageEmbed().setAuthor(`กระเป๋าของ ${member.username}`, member.displayAvatarURL()).setColor(config.color).setFooter(`มี ${user.point} เหรียญ`,member.displayAvatarURL())
    let textbackpack = "";
    if (!user.backpackinventory.length) textbackpack = `บ๋อแบ๋~~`
    else {
        let hasitem = {}
        for (let i = 0; i < user.backpackinventory.length; i++) {
            if(!hasitem[user.backpackinventory[i]]) hasitem[user.backpackinventory[i]] = 0;
            hasitem[user.backpackinventory[i]]++;
        }
        let sortable = [];
        for (let item in hasitem) {
            sortable.push([item, hasitem[item]]);
        }

        sortable.sort(function(a, b) {
            return bot.item[b[0]].price - bot.item[a[0]].price;
        });

        for (let i = 0; i < sortable.length; i++) {
            textbackpack+=`**x${sortable[i][1]}** ${bot.item[sortable[i][0]].emoji} ${bot.item[sortable[i][0]].name} ไอดี ${sortable[i][0]} มูลค่า ${bot.item[sortable[i][0]].price*sortable[i][1]} <:coin:803105205113323521>\n`;
            
        }
    }
    embed.addField(`กระเป๋า <:bp:803105205007810590> (${user.backpackinventory.length}/${user.backpack*config.storageperlvl})`,`${textbackpack}`)
    embed.addField("ของ",`${bot.item.backpack[user.backpack].emoji} ${bot.item.backpack[user.backpack].name}
${bot.item.fishing_rod[user.fishing_rod].emoji} ${bot.item.fishing_rod[user.fishing_rod].name}
${bot.item.pickaxe[user.pickaxe].emoji} ${bot.item.pickaxe[user.pickaxe].name}`)
    message.channel.send(embed)

}
exports.conf = { aliases: ["inv"] };