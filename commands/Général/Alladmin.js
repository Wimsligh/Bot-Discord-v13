const Discord = require("discord.js")

exports.help = {
    name: 'alladmins',
    aliases: ["admins"]
}

exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Vous n'avez pas la permission de faire cette commande: \`ALLADMINS\`")
    let str_filtrer = message.guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR"))
    let str_map = str_filtrer.map(m => `<@${m.id}> : *( ${m.user.id} )* `).join("\n")
    for (let i = 0; i < str_map.length; i += 1995) {
        const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
        const embedAllAdmins = new Discord.MessageEmbed()
        .setTitle(`Voici tous les administrateurs du serveur: (${str_filtrer.size} personnes)`)
        .setColor('2f3135')
        .setDescription(`${str_content}`)
        .setFooter({text: `ASTRASBOT | Developpé par Matheo`, iconURL: client.user.displayAvatarURL({dynamic: true})})
        message.reply({embeds: [embedAllAdmins]})
    }
}