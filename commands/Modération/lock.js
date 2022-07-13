const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

exports.help = {
    name:"lock"
}

exports.run = async (bot, message, args) => {
    let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
    if(!channel) return message.reply("Aucun salon trouvé !")

    let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ");
    if(!reason) reason = "Aucune raison donnée";

    if(channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id)?.deny.toArray(false).includes("SEND_MESSAGES")) return message.reply("Ce salon est déjà locké !")

    await channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
        SEND_MESSAGES: false
    })

    const Embed = new MessageEmbed()
        .setColor('#C14930')
        .setTitle('**Lock**')
        .setAuthor({ name: 'Modération', iconURL:'https://botostore.com/netcat_files/22/26/preview_30942_1542532158.jpg'})
        .setDescription(`Ce salon a été lock`)
        .addFields(
            { name: 'Pseudo du staff :', value: `${message.author.username}`, inline: true },
            { name: 'Raison :', value: `${reason}`, inline: true },
        )
        .setTimestamp();
    message.channel.send({ embeds: [LOCK] }).then(async mess => setTimeout(async () => {mess.delete()}, 10000));
}