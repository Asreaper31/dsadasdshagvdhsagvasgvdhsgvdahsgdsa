const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "yardım", 
  aliases: [""],
  description: "",
  execute: async(client, message, args, data, db) => { 
          let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ".";
    let text = []
    
    let owners = ["236173144300191754","602196747879448577"]  
    
    client.commands.map(x => {    
      if (!x.description.includes("owner") || owners.includes(message.author.id)) text.push(`**__${prefix}${x.name} - [${x.aliases ? x.aliases : "none"}]__**:\n${x.description}`)
    }) 
    
    let embed = new Discord.RichEmbed() 
    .setColor(config.embedColor)
    .setTitle(`${client.user.username} Komut Listesi  `)
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription(`
    \`!bakiye  \` : Bakiyenizi Öğrenirsiniz\n**Kullanım:** \`!bakiye\`

    \`!bul\` : Coin Kazanacağın Sunucu Listesi Çıkar\n**Kullanım:** \`!bul\`

    \`!bilgi\` : Siparişinin Durumunu Öğrenirsin!\n**Kullanım:** \`!bilgi\`

    \`!gönder\` : İstediğin Bir Kişiye Coin Gönderirsin\n**Kullanım:** \`!gönder [Kullanıcı] [Coin]\`

    \`!reklam\` : Sunucuna Reklam Satın Alarak Üye Kazanırsın\n**Kullanım:** \`!reklam [Coin] [Açıklama]\`

    \`!log\` : Coin Harcama/Kazanma Geçmişini Gösterir\n**Kullanım:** \`!log\`

    \`!kontrol\` : Katıldığınız Sunucudan Çıkarsanız Coin Kaybeder Misin Yoksa Kaybetmez Misin Onu Gösterir!\n**Kullanım:** \`!kontrol\`

    \`!günlük\` : Günlük Coin (6) Alırsın\n**Kullanım:** \`!günlük\`

    \`!davet\` : Botun Davet Linklerine Erişirsin\n**Kullanım:** \`!davet\`

    \`Destek\`=> **__[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=672496694088433704&scope=bot&permissions=805314622)__** `)
    .setFooter(`${config.botName} `)
    .setImage("")
    message.channel.send(embed).catch(e => message.channel.send(`Uh, an error :s`))   
  }
} 
