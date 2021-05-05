const Discord = require("discord.js-light")
const fs = require("fs");
const chalk = require('chalk');
module.exports = async (bot) => {
    bot.commands = new Discord.Collection()
    bot.aliases = new Discord.Collection()
    const loadFolders = (path, sub=null) => {
        fs.readdir(path, (err, files) => {
            if(files) files.forEach(file=>{
                if (file.endsWith('.js')&&file[0]!="-") return loadFiles(path+"/"+file);
                else if(file[0]=="-") return console.log(chalk.yellow(`Skipped ${file}`));
                //console.log(`loading folders ${file}`.yellow)
                loadFolders(path+"/"+file)
            });
            else return //console.log(`Skipped ${file} floder empty!`.yellow);
        });
    }
    
    const loadFiles = (path) => {
            if (!path.endsWith(".js")) return;
            delete require.cache[require.resolve(`${appRoot}/${path}`)]
            let props = require(`${appRoot}/${path}`);
            let command = path.match(/[^\\/]+(?=\.)(?!([^\\/]+[\\/]))/)[0];
            //console.log(chalk.green(`Loaded ${command}.js`));
            bot.commands.set(command, props)
            try {
            props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, command)
            })
            } catch (error) {
                
            }
    }
    loadFolders('commands')
};