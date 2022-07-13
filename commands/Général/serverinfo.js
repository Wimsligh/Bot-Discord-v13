const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

exports.help = {
    name:"serverinfo"
}

exports.run = async (bot, message, args) => {

    const SERVERINFO = new MessageEmbed()
        .setColor('#C14930')
        .setTitle(`Informations sur le serveur ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Informations sur le serveur", `**Nom** : ${message.guild.name}\n**Propriétaire** : ${(await message.guild.fetchOwner())}\n**ID** : ${message.guild.id}\n**Description** : ${message.guild.description ? message.guild.description : "Aucune"}\n**Boost** : ${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier})\n**Date de création** : <t:${Math.floor(message.guild.createdAt / 1000)}:F>`)
        .addField("Informations sur les stats", `**Salons** : ${message.guild.channels.cache.size}\n**Rôles** : ${message.guild.roles.cache.size}\n**Emojis** : ${message.guild.emojis.cache.size}\n**Membres** : ${message.guild.members.cache.size}`)
        .addField("Informations sur les salons spéciaux", `**Règlement** : ${message.guild.rulesChannel ? message.guild.rulesChannel : "Aucun"}\n**AFK** : ${message.guild.afkChannel ? message.guild.rulesChannel : "Aucun"}`)
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp();
    message.channel.send({ embeds: [SERVERINFO] }).then(async mess => setTimeout(async () => {mess.delete()}, 25000));        }