 const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')

module.exports = {
  name: "gönder",
  aliases: ["para-gönder"],
  description: "",
  execute: async(client, message, args, data, db) => {
   
    let amount = args.filter(x => !x.startsWith("<@"))[0] 
    
    if (message.mentions.users.size < 1 || isNaN(amount) || amount < 1) return message.channel.send(`Geçersiz Kullanım! | Bir Kullanıcıyı Etiketlemelisiniz Ve Geçerli Miktarda Cin Girmelisiniz!`)
    
    let user = message.mentions.users.first() 
     
    if (data.coins < Number(amount)) return message.channel.send(` **__${amount}__** Kadar Coinin Yok!`) 
    
    if (Number(amount) < 10) return message.channel.send(`En Az 10 Coin Gönderebilirsin!`) 
    
    if (user.id === message.author.id) return message.channel.send(`Kendine Coin Gönderemezsin!`)
    
    if (user.bot) return message.channel.send(`Botlara Coin Gönderemezsin!`)
    
    message.channel.send(` ${user} Adlı Kişiye **__${amount}__** Coin Gönderdin \n Şu Kadar Coin Eksildi -> [-${amount}]`) 
    
    data.logs.unshift(`[-${amount}] - Para Gönderdin! ${user.tag}.`)
     
    db.set(`logs_${message.author.id}`, data.logs)
    
    db.subtract(`coins_${message.author.id}`, Number(amount))
    
    data = await get(message, user)
  
    data.logs.unshift(`[+${amount}] - ${message.author.tag} Sana Para Gönderdi!.`)
    
    db.set(`logs_${user.id}`, data.logs)
    
    db.add(`coins_${user.id}`, Number(amount)) 
  } 
} 