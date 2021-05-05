module.exports = async (bot) => {
    bot.item = {
        1: {
            name: `ขยะ`,
            price: 2,
            emoji: `<a:Leaves:803107604116144150>`,
            type: `fish`
        },
        2: {
            name: `ปลาโง่ๆ`,
            price: 5,
            emoji: `<a:Cod:803107397916557313>`,
            type: `fish`
        },
        3: {
            name: `ปลาธรรมดา`,
            price: 10,
            emoji: `<a:Salmon:803107399275118672>`,
            type: `fish`
        },
        4: {
            name: `ปลาหายาก`,
            price: 20,
            emoji: `<a:Pufferfish:803107400012791848>`,
            type: `fish`
        },
        5: {
            name: `ถ่าน`,
            price: 3,
            emoji: `<:coal:803139290392428545>`,
            type: `mine`
        },
        6: {
            name: `เหล็ก`,
            price: 15,
            emoji: `<:iron:803139290707787816>`,
            type: `mine`
        },
        7: {
            name: `ทอง`,
            price: 30,
            emoji: `<:Gold:803139290305134624>`,
            type: `mine`
        },
        8: {
            name: `หินแดง`,
            price: 5,
            emoji: `<:redstone:803139291097464832>`,
            type: `mine`
        },
        9: {
            name: `เพรช`,
            price: 50,
            emoji: `<:diamond:803139290711982141>`,
            type: `mine`
        },
        10: {
            name: `การ์ดป้องกันขโมย`,
            emoji: `<:card_premium:803141240517689344>`,
            price: 200,
            type: `card`
        }
    }
    bot.item.backpack = {
        1: {
            name: `กระเป๋า lvl 1`,
            price: 0,
            emoji: `<:bp:803105205007810590>`
        },
        2: {
            name: `กระเป๋า lvl 2`,
            price: 100,
            emoji: `<:bp:803105205007810590>`
        },
        3: {
            name: `กระเป๋า lvl 3`,
            price: 2000,
            emoji: `<:bp:803105205007810590>`
        },
        4: {
            name: `กระเป๋า lvl 4`,
            price: 6000,
            emoji: `<:bp:803105205007810590>`
        },

    }
    bot.item.fishing_rod = {
        1: {
            name: `เบ็ตตกปลา lvl 1`,
            price: 0,
            emoji: `<:Fishing_Rod:803139317055619106>`,
            rate: [{
                    id: 1,
                    pct: 50
                },
                {
                    id: 2,
                    pct: 80
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 5
                },
                {
                    id: null,
                    pct: 50
                }
            ]
        },
        2: {
            name: `เบ็ตตกปลา lvl 2`,
            price: 250,
            emoji: `<:Fishing_Rod:803139317055619106>`,
            rate: [{
                    id: 1,
                    pct: 30
                },
                {
                    id: 2,
                    pct: 70
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 5
                },
                {
                    id: null,
                    pct: 30
                }
            ]
        },
        3: {
            name: `เบ็ตตกปลา lvl 3`,
            price: 2000,
            emoji: `<:Fishing_Rod:803139317055619106>`,
            rate: [{
                    id: 1,
                    pct: 20
                },
                {
                    id: 2,
                    pct: 60
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 6
                },
                {
                    id: null,
                    pct: 20
                }
            ]
        },
        4: {
            name: `เบ็ตตกปลา lvl 4`,
            price: 7000,
            emoji: `<:Fishing_Rod:803139317055619106>`,
            rate: [{
                    id: 1,
                    pct: 10
                },
                {
                    id: 2,
                    pct: 50
                },
                {
                    id: 3,
                    pct: 25
                },
                {
                    id: 4,
                    pct: 7
                },
                {
                    id: null,
                    pct: 8
                }
            ]
        },
    }
    bot.item.pickaxe = {
        1: {
            name: `ที่ขุด lvl 1`,
            price: 0,
            emoji: `<:Wooden_Pickaxe:803142116607918162>`,
            rate: [{
                    id: 5,
                    pct: 10
                },
                {
                    id: null,
                    pct: 3
                }
            ]
        },
        2: {
            name: `ที่ขุด lvl 2`,
            price: 300,
            emoji: `<:Stone_Pickaxe:803142116816584734>`,
            rate: [{
                    id: 5,
                    pct: 10
                },
                {
                    id: 6,
                    pct: 5
                },
                {
                    id: null,
                    pct: 4
                }
            ]
        },
        3: {
            name: `ที่ขุด lvl 3`,
            price: 2500,
            emoji: `<:iron_Pickaxe:803142118491029524>`,
            rate: [{
                    id: 5,
                    pct: 8
                },
                {
                    id: 6,
                    pct: 10
                },
                {
                    id: 7,
                    pct: 6
                },
                {
                    id: 8,
                    pct: 20
                },
                {
                    id: 9,
                    pct: 1
                },
                {
                    id: null,
                    pct: 6
                }
            ]
        },
        4: {
            name: `ที่ขุด lvl 4`,
            price: 8500,
            emoji: `<:Golden_Pickaxe:803142677079130142>`,
            rate: [{
                    id: 5,
                    pct: 8
                },
                {
                    id: 6,
                    pct: 15
                },
                {
                    id: 7,
                    pct: 7
                },
                {
                    id: 8,
                    pct: 25
                },
                {
                    id: 9,
                    pct: 2
                },
                {
                    id: null,
                    pct: 8
                }
            ]
        },
        5: {
            name: `ที่ขุด lvl 5`,
            price: 15000,
            emoji: `<:diamon_Pickaxe:803142116611588097>`,
            rate: [{
                    id: 5,
                    pct: 4
                },
                {
                    id: 6,
                    pct: 15
                },
                {
                    id: 7,
                    pct: 8
                },
                {
                    id: 8,
                    pct: 25
                },
                {
                    id: 9,
                    pct: 5
                },
                {
                    id: null,
                    pct: 8
                }
            ]
        },
    }
    bot.item.findkey = (name) => {
            for (let [key, value] of Object.entries(bot.item)) {
                if(!value.name) continue;
            value.id= key;
            if(value.name.match(new RegExp(name,"i"))||key==name) return key;
        }
    }
}