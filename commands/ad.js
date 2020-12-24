const Discord = require('discord.js')

module.exports = {
  name: "reklam",
  aliases: ["reklam-ekle"],
  description: "",             
  execute: async(client, message, args, data, db) => {
    
    let amount = Number(args[0])
   
    let description = args.slice(1).join(" ")
    if (data.coins < 6) return message.channel.send(`Yeteri Kadar Coine Sahip Değilsin! | Coin Kazanmak İçin -> !bul Yazıp Orada Bulunan Her Sunucuya Katıldığında 1 Coin Elde Edersin!**`)
    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(`Hatalı Coin Yazımı! Lütfen Bakiyenden Fazla Coin Yazma!`)
    
    if (amount > data.coins) return message.channel.send(`${message.author.username} Yetersiz Coin. Şu Kadar Coinin Var -> ${amount}\n\n\`\``)
                    
    amount = Math.round(amount)
    
    let link = data.code
    
    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })           
      
      link = link.code 
    } 
    
    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {            
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link) 
    }) 

    if (description && description.includes("discord.gg")) return message.channel.send(`Geçersiz Davet Linki!`)           
    
    if (description && description.length > 50) return message.channel.send(`50 Karakterden Uzun Açıklama Yaz!`)
                   
    message.channel.send(`**Başarıyla Şu Kadar Coin İle Satın Alım Yaptın -> ${amount} \n Siparişini Şu Komut İle Takip Edebilirsin! \`!bilgi\`**`)
           

    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    db.set(`code_${message.guild.id}`, link)        
    
    data.logs.unshift(`[-${amount}] -  ${message.guild.name} Adlı Sunucuya Reklam Satın Aldın `) 
    
    db.set(`logs_${message.author.id}`, data.logs)                                    
    
    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)        
    
    db.add(`orders_${message.guild.id}`, amount)
    
    db.subtract(`coins_${message.author.id}`, amount)     

  }
}         