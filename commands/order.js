const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "bilgi",
  aliases: [""],
  description: "",
  execute: async(client, message, args, data, db) => {
   
    if (data.code == 0) return message.channel.send(`**Sunucu Sipariş Vermediniz! **Vermek İçin -> !reklam [Coin] [Açıklama]**`)
    
    let bar = []
    
    let progress = data.uses
    
    for (let i = 0;i < 10;i++) {
      progress = progress - (data.orders / 10) 
      if (progress > 0) bar.push(`#`)
      else bar.push(`=`)  
    }
    
    let warn = "" 
    
    await client.fetchInvite('https://discord.gg/' + data.code).catch(e => warn = "Bu davet bağlantısının süresi doldu! Lütfen yeni bir sipariş verin, yoksa buraya kimse katılamaz!")
    
    let embed = new Discord.RichEmbed() 
    .setColor(config.embedColor)
    .setTitle(`${message.guild.name} Sipariş`) 
    .setDescription(`Sipariş: ${data.orders}\nİlerleme: ${bar.join("")} ${data.uses}/${data.orders}`) 
    message.channel.send(warn, embed) 
  } 
} 