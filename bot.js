const path = require('path');
global.appRoot = path.resolve(__dirname);
const Discord = require("discord.js-light");
global.config = require("./config/config.js")
global.prefix = config.prefix;
const bot = new Discord.Client({
	cacheGuilds: true,
	cacheChannels: true,
	cacheOverwrites: true,
	cacheRoles: true,
	cacheEmojis: false,
	cachePresences: false
});
const NodeCache = require("node-cache");

bot.cache = new NodeCache({
    stdTTL: 100,
    checkperiod: 120
});
      
bot.getid = (id) => {
    if (!id) return false
    if (typeof (id) == "string") {
        let mentionmatch = id.match(/(?<=<@!)[0-9]{18}(?=>)/)
        if (mentionmatch) return mentionmatch[0]
        else if(id.match(/[0-9]{18}/gi)) return id.match(/[0-9]{18}/gi)[0]
        else {
            let user = bot.users.cache.find(user => user.tag.match(new RegExp(id,"i")))
            if(user) return user.id;
            else return false
        }
    } else if (id.constructor.name == "model" || id.constructor.name == "User") {
        return id.id
    } else if (id.constructor.name == "Message") {
        return id.author.id
    }
    return false
}
require('./config/command')(bot);
require('./config/event')(bot);
require('./script/db')(bot);
require('./script/itemcore')(bot);
bot.login(config.token)