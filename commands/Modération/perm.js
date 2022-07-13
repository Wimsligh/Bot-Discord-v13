const { MessageEmbed, DiscordAPIError } = require('discord.js');
const Discord = require("discord.js")
const ms = require('ms');

module.exports.help = {
    name: 'perms',
    aliases: []
}

exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.member
    const perms = `\`\`\`${member.permissions.toArray().map((perm) => perm).join("\n")}\`\`\` `;
    const embed = new Discord.MessageEmbed()
    .setAuthor({name: `Permissions de ${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true})})
    .setColor('2f3135')
    .setDescription(perms)
    .setFooter({text: `ASTRAS | Developpé par Matheo_H`, iconURL: client.user.displayAvatarURL({dynamic: true})})
message.reply({embeds: [embed]})
}
