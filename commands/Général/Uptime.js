const Discord = require("discord.js");

exports.help = {
    name:"uptime",
  }

exports.run = async (client, message, args) => {

let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new Discord.MessageEmbed()
            .setTitle("Uptime")
            .setColor("BLUE")
            .setDescription(`Je suis en ligne depuis **${days}** jours, **${hours}** heures, **${minutes}** minutes, **${seconds}** secondes`)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor(client.user.username, client.user.displayAvatarURL())  
            message.channel.send({ embeds : [embed]});
}
