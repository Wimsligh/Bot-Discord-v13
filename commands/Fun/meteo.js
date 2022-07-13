const Discord =  require('discord.js');
const weather = require('weather-js');

module.exports.run = (client, message, args) => {

if(args.length === 0){
    let embed = new Discord.MessageEmbed()
    .setTitle("Error :cry:")
    .setDescription("Entre une ville valide !")
    .setColor("RANDOM")
    .setTimestamp();
        return message.channel.send({ embeds : [embed]});
}

weather.find({ search: args.join(" "), degreeType: 'C'}, function(err, result) {
  
if(result.length === 0){
    let errorembed = new Discord.MessageEmbed()
    .setTitle("Error :cry:")
    .setDescription(" Entre une ville valide !")
    .setColor("RANDOM")
    .setTimestamp();
        return message.channel.send({ embeds : [embed]});
}

  var current = result[0].current;
  var location = result[0].location;
    if (err) {
    let errorembed = new Discord.MessageEmbed()
    .setTitle("Error :cry:")
    .setDescription(" Entre une ville valide !")
    .setColor("RANDOM")
    .setTimestamp();
        return message.channel.send({ embeds : [embed]});
    }

    
    let embed = new Discord.MessageEmbed()
    .setDescription(`**${current.skytext}**`)
    .setAuthor(`Météo de ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor("RANDOM")
    .addField('Timezone', `UTC${location.timezone}`, true)
    .addField('Type de degré', location.degreetype, true)
    .addField('Temperature', `${current.temperature} Degrees`, true)
    .addField('Ressentit', `${current.feelslike} Degrees`, true)
    .addField('Vent', current.winddisplay, true)
    .addField('Humidité', `${current.humidity}%`, true)
    .setTimestamp();
    message.channel.send({ embeds : [embed]});
}); }

module.exports.help = {
    name:"meteo",
  }