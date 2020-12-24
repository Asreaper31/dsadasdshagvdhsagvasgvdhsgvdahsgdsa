const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {                               
  name: "coinver",
  aliases: ["addcoins"],
  description: "adds coins to an user, owner only.",
  execute: async(client, message, args, data, db) => {
   
    let owners = config.ownersID;           

    //let data = await get(member, member.user)
    
    if (!owners.includes(message.author.id)) return
  
    let pay = Number(args[0])
                                                    
    if (!pay || isNaN(pay)) return message.channel.send("Geçersiz Kullanım")
    
    let user = message.mentions.users.first() || message.author               
    
    message.channel.send(`[Kurucu Komutu] Şu kadar Coin Hesabına EKlendi -> ${pay}  ${user.tag}.`)
    
    db.add(`coins_${user.id}`, pay) 
  } 
}
