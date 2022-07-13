const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

// Infos
exports.help = {
    name:"userinfo"
}


exports.run = async (bot, message) => {
    const username = message.mentions.users.first()
    if(username) {
        user = username;
    } else {
        user = message.author;
    }
    const member = message.mentions.users.first() || message.author;

    const Embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor({ name: message.author.username, iconURL: user.displayAvatarURL({dynamic: true}) })
        .setTitle('Userinfo')
        .setDescription(`Voici les information de ${member}`)
        .setImage(await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: 'Pseudo sur le serveur :', value: `${member.nickname ? member.nickname : user.username}`, inline: true },
            { name: 'ID du membre :', value: `${user.id}`, inline: true },
            { name: 'Dates de création du compte :', value: `${user.createdAt.toLocaleDateString('en-GB')}`, inline: true },
        )
        .setTimestamp()

    message.channel.send({ embeds: [Embed] });

    message.delete({ timeout: 100 })
}