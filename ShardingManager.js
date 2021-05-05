const path = require('path');
const cluster = require('cluster');
const config = require('./config/config');
global.appRoot = path.resolve(__dirname);
process.isDev = false;

if(cluster.isMaster){
/*
    The following code goes into it's own file, and you run this file
    instead of your main bot file.
*/

// Include discord.js ShardingManger
const { ShardingManager } = require('discord.js-light');
global.config = config;

// Create your ShardingManger instance
const manager = new ShardingManager('./bot.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    totalShards: process.isDev?0:15,
    token: config.token
});


// Spawn your shards
manager.spawn();
manager.shard = {}

manager.shard.fetchNumberValues = async (path,id) => {
    if(id) id = manager.get_shardid_from_guild(id)
    // get guild collection size from all the shards
    const req = await manager.fetchClientValues(path,id);

    // return the added value
    return req.reduce((p, n) => p + n, 0);
}


manager.shard.get_array = async (path,id) => {
    if(id) id = manager.get_shardid_from_guild(id)
    try{
        // try to get guild from all the shards
        const req = await manager.broadcastEval(path,id);

        // return Guild or null if not found
        if(typeof id == "number") return req||null
        return req.reduce((resp, resn) => [...resp,...resn], []);
    }catch(err){
        console.error(err)
        return []
    }
}
manager.get_shardid_from_guild = guildid=>null//(guildid >> 22) % manager.shards.size
manager.shard.get = async (path,id) => {
    if(id) id = manager.get_shardid_from_guild(id)
    try{
            // try to get guild from all the shards
        const req = await manager.broadcastEval(path,id);

        // return Guild or null if not found
        if(typeof id == "number") return req||null
        return req.find(res => !!res) || null;
    }catch(err){
        console.error(err)
        return null
    }
}
// Emitted when a shard is created
manager.on('shardCreate', (shard) => {
    //console.log(`Shard ${shard.id} launched`)
    shard.on("ready", () => {
        console.log(`[DEBUG/SHARD] Shard ${shard.id} connected to Discord's Gateway.`)
        // Sending the data to the shard.
        shard.send({type: "shardid", data: {shardid: shard.id}});
    })
});
if(config.member_intent_client.token&&config.member_intent_client.id) require("./script/member_intent")(manager,config.member_intent_client) //legacy member intent
let thread = process.isDev?1:require("os").cpus().length
for (let i = 0; i < thread; i++) {
    let worker = cluster.fork()
    worker.on("message",async(msg)=>{
        //console.log(msg)
        console.log('MSG->OP-> '+msg.op)
        switch (msg.op) {
            case "shard.getglobal":

                console.log('GOT MESSAGE -> get_global -> '+msg.callback)
                worker.send({
                    op:"callback",
                    d: await Promise.resolve(global.queue),
                    callback:msg.callback
                })
            break;
            case "shard.setglobal":

                console.log('SET GLOBAL = ' + msg.d)
                global.queue = msg.d
                worker.send({
                    op:"callback",
                    d: await Promise.resolve('OK'),
                    callback:msg.callback
                })
            break;
            case "shard.get":
                
                worker.send({
                    op:"callback",
                    d:await manager.shard.get(msg.d,msg.g),
                    callback:msg.callback
                })
            break;
            case "shard.fetchClientValues":
                
                worker.send({
                    op:"callback",
                    d:await manager.shard.fetchNumberValues(msg.d,msg.g),
                    callback:msg.callback
                })
            break;
            case "shard.get_array":
                worker.send({
                    op:"callback",
                    d:await manager.shard.get_array(msg.d,msg.g),
                    callback:msg.callback
                })
            break;
            
            default:
                break;
        }
    })
}
}else{
    require('./script/api/api')(require('./config/config').webserver.port);
}
