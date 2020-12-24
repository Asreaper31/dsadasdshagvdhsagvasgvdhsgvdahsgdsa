const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "bul",           
  description: "displays 3 servers to join in and gain coins.",
  aliases: ["b"],
  execute: async(client, message, args, data, db) => {
   
    let orders = await db.all().filter(data => data.ID.startsWith(`orders_`)).sort((a, b) => b.data - a.data);
    
    let length = 1       
    
    orders = orders.filter(x => x.data > 0 && client.guilds.get(x.ID.split("_")[1]) && client.guilds.get(x.ID.split("_")[1]).members.get(message.author.id) === undefined)
    
    let embed = new Discord.RichEmbed()
    .setColor(config.embedColor)                
    .setTitle(`__Sunuculara Katıl Ve Coin Kazan__`)
    .setDescription(`Her Sunucuya Katıldığında 1 Coin Kazanırsın! | Eğer 3 Gün Olmadan Sunucudan Çıkarsan 2 Coin Kaybedersin! \n\n __**Sunucular Listesi**__`)
       for (let i = 0;i < orders.length;i++) {        
     
         let handler = true
         
      	if (length > 3) {} else {
 
        	let id = orders[i].ID.split("_")[1]
        
        	let guild = client.guilds.get(orders[i].ID.split("_")[1]).name
        
       	  let code = await db.fetch(`code_${id}`)
        
          
       		await client.fetchInvite("https://discord.gg/" + code)
          .then(link => { 
           // console.log(link.code)
            if (link.code === null) handler = false 
          })
          .catch(error => {
            handler = false 
          })                           
          
          await new Promise(resolve => setTimeout(resolve, 1))
                                                                                 
        	if (handler) {
        		let description = await db.fetch(`description_${id}`)
        
        		embed.addField(`**__${guild}__**`, description, false)        
       			length++
        } 
      } 
    } 
 
    embed.addField(` **__MaximusBoys__**`, `**https://discord.gg/e5vN3uzz6b**`, false)
        embed.addField(` **__Creative__**`, `**https://discord.gg/cty62wwrnD**`, false)

                                                                                                                                          
    message.channel.send(embed)  
  }                                       
} 
