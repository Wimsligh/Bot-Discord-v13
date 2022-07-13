const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

// Infos
exports.help = {
    name:"dm"
}


exports.run = async (bot, message,args) => {
    if (message.member.permissions.has(['ADMINISTRATOR'])) {
        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
        const sayMessage = args.slice(1).join(" ");

        const NULL = new MessageEmbed()
            .setColor('#000000')
            .setTitle(`Private Message`)
            .setDescription(`Misuse of the controls (dm <member> <message>)`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.delete();
        if(!user){
            message.channel.send({ embeds: [NULL] });
        } else if (!sayMessage){
            message.channel.send({ embeds: [NULL] });
        } else {
            const BRAVO = new MessageEmbed()
                .setColor('#000000')
                .setTitle(`Private Message`)
                .setDescription(`Your message has been sent!`)
                .setTimestamp()
                .setFooter({ text: config.client.name, iconURL: config.client.logo});

            message.channel.send({ embeds: [BRAVO] })
            user.send(sayMessage)
        }
    } else {
        const NULL_PERMS = new MessageEmbed()
            .setColor('#000000')
            .setTitle(`Private Message`)
            .setDescription(`You do not have permission to run this command`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo});

        message.delete();
        message.channel.send({ embeds: [NULL_PERMS] });
    }
};