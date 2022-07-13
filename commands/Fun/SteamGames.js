const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

exports.help = {
    name: "steam-game"
  
  }
  
    exports.run = async(bot, message, args) => {
        const query = args.join(" ");
        if (args[0] == undefined ) return message.reply({ embeds: [new MessageEmbed().setDescription(`Command Usage: \`*steam-game <Jeux>\``).setColor('BLUE')], allowedMentions: { repliedUser: false } });

        const search = await request
            .get('https://store.steampowered.com/api/storesearch')
            .query({
                cc: 'eu',
                l: 'fr',
                term: query
            });

        if (!search.body.items.length) return message.channel.send({ embeds: [new MessageEmbed().setDescription(`Aucain résultat touvé pour **${query}**!`).setColor('GREY')] });

        const { id, tiny_image } = search.body.items[0];
        const { body } = await request
            .get('https://store.steampowered.com/api/appdetails')
            .query({ appids: id });

        const { data } = body[id.toString()];
        const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
        const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
        const price = current === original ? current : `~~${original}~~ ${current}`;
        const platforms = [];

        if (data.platforms) {
            if (data.platforms.windows) platforms.push('Windows');
            if (data.platforms.mac) platforms.push('Mac');
            if (data.platforms.linux) platforms.push('Linux');
        };

        const embed = new MessageEmbed()
            .setTitle(`__**${data.name}**__`)
            .setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
            .addField('\u2000Prix', `•\u2000 ${price}`, true)
            .addField('\u2000Metascore', `•\u2000 ${data.metacritic ? data.metacritic.score : '???'}`, true)
            .addField('\u2000Recommendations', `•\u2000 ${data.recommendations ? data.recommendations.total : '???'}`, true)
            .addField('\u2000Platforme', `•\u2000 ${platforms.join(', ') || 'None'}`, true)
            .addField('\u2000Date de création', `•\u2000 ${data.release_date ? data.release_date.date : '???'}`, true)
            .addField('\u2000Nombre de DLC', `•\u2000 ${data.dlc ? data.dlc.length : 0}`, true)
            .addField('\u2000Developpeurs', `•\u2000 ${data.developers ? data.developers.join(', ') || '???' : '???'}`, true)
            .addField('\u2000Studio', `•\u2000 ${data.publishers ? data.publishers.join(', ') || '???' : '???'}`, true)
            .setColor('BLUE')
            .setImage(tiny_image)

        return message.channel.send({ embeds: [embed] });
    }