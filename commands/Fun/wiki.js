const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

exports.help = {
    name:"wiki"
}

exports.run = async (bot, message, args) => {
    const search = args.join("_");
    const msg = args.join(" ");
    if (args[0] == undefined ) return message.reply({ embeds: [new MessageEmbed().setDescription(`Command Usage: \`*wiki <Recherche>\``).setColor('BLUE')], allowedMentions: { repliedUser: false } });


    const link = `https://fr.wikipedia.org/w/index.php?search=${search}&ns0=1`;
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle("Recherche Wikipédia: ")
      .setDescription('Résultat trouvé pour ' + '**' + msg + '**')
      .addField('**Resulat**', `[Click](${link})`)
      .setFooter('Dev by Matheo Hanss ' +  ' || ' + bot.user.username)

     await  message.channel.send({ embeds: [embed] });
  }