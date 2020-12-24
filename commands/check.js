const Discord = require('discord.js')
const ms = require('parse-ms') 
                                         
module.exports = {
  name: "kontrol",
  aliases: [""],
  description: "",          
  execute: async(client, message, args, data, db) => {            
           
    let timeout = 259200000
    
    let time = []
    
    if (data.joinedDate !== null && timeout - (Date.now() - data.joinedDate) > 999) {
      Object.entries(ms(timeout - (Date.now() - data.joinedDate))).map((x, y) => {
        if (x[1] > 0 && y < 4) time.push(`**${x[1]} ${x[0]}**`)      })
                                                                                             
     
      let embed = new Discord.RichEmbed()
      .setColor(process.env.PINK)
      .setTitle(`⏰| ${message.author.username} |⏰`)
      .setDescription(`Eğer Şu Anda Ayrılırsan Coin Kaybedersin`)
      .addField(`⏰Kalan Zaman:`, time.join(", "), false)
      message.channel.send(embed)    } else {
      let embed = new Discord.RichEmbed()                         
      .setColor(process.env.PINK)
      .setTitle(`⏰| ${message.author.username} |⏰`)
      .setDescription(`Şu Anda Sunucudan Ayrılabilirsin! | Ayrılırsan Coin Kaybetmezsin`)
      message.channel.send(embed) 
    } 
  } 
}             