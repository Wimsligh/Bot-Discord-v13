const { MessageEmbed } = require("discord.js")
// const prefix = require("../../config.json").prefix;
const color = require("../../config.json").color;

exports.help = {
name: 'banner',
aliases: [],
}   
exports.run = async (bot, message, args) => {
        const member = message.mentions.members.first() ?? message.member;
        const url = await member.user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 }));
        
        const ERRbannerEmbed = new MessageEmbed()
            .setColor(color)
            .setAuthor(member.user.username)
            .setTitle(`❌ Pas De Bannière ❌`)
            .setDescription(`*${member.user.tag} n'a pas de bannière !*`)
            .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL({dynamic: true,}))
            .setTimestamp()
        if (!url) return message.channel.send({ embeds: [ERRbannerEmbed] });

        message.delete()

        const bannerEmbed = new MessageEmbed()
            .setColor(color)
            .setAuthor(member.user.username)
            .setTitle(`Bannière de ${member.user.tag}`)
            .setURL(member.user.bannerURL({ format: "png", size: 4096 }))
            .setImage(`${url}`)
            .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL({dynamic: true,}))
            .setTimestamp()
        await message.channel.send({ embeds: [bannerEmbed] });
    }