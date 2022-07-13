const { MessageEmbed } = require('discord.js');
const mysql = require("mysql");
const config = require("../../config.json");


module.exports = {
    name: 'guildMemberAdd',
    execute(member, bot) {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);

            let avatar = member.user.displayAvatarURL({ size: 1024, dynamic: true });
        
            const BVN = new MessageEmbed()
                .setColor("#ff4000")
                .setTitle('🛫 Bienvenue 🛬')
                .setThumbnail(avatar)
                .setDescription(`Hey, <@${member.id}> Bienvenue sur le serveur n'hésite pas à reprendre une entreprise ou un gang !`)
                .setTimestamp()
                .setFooter({ text: config.client.name, iconURL: config.client.avatar});
    
            bot.channels.cache.get("984415860473081937").send({ embeds: [BVN] });
            member.roles.add("984415858988306465");
        }
}