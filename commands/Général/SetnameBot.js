const { MessageEmbed } = require('discord.js')

exports.help = {
name: "setname"
}

exports.run = async(client, message, args) => {
    let non = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`seul l'owner du bot est autorisé à faire cette commande`)

    let noui = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`vous devez indiquer un nouveau nom`)

    if(message.author.id !== "979067364383555624")
    return message.reply({ embeds: [non]})

    const oui = args.join(' ')
    if(!oui) return message.reply({ embeds: [noui]})

    await(client.user.setUsername(oui))

    let si = new MessageEmbed()
    .setColor("couleur")
    .setDescription(`le nom du bot a bien été changé en **${oui}**`)
    message.reply({ embeds: [si]})
}
