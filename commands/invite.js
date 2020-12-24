const Discord = require('discord.js') 
const { RichEmbed } = require("discord.js");
const config = require('../config.json')
module.exports = {
  name: "davet", 
  aliases: ["invite"],
  description: "",
  execute: async(client, message, args, data, db) => {
   
    let embed = new RichEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL) 
    .setThumbnail(client.user.avatarURL) 
    .addField('Botu Sunucuna Davet Et ',`Creative [Davet Et](https://discord.com/oauth2/authorize?client_id=672496694088433704&scope=bot&permissions=805314622)`)    
    .setFooter(`${client.user.username} bot`) 
    .setColor(config.embedColor)
 
    message.channel.send(embed)
      
    
  } 
} 
