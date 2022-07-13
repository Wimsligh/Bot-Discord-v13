const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const config = require('./config.json');
const fs = require('fs');
const mysql = require('./node_modules/mysql');
bot.commands = new Collection();

// Connexion DB
const db = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});

db.connect(function (err) {
    if(err) throw err;

    console.log(`Connection à la database ${config.BDD.database} réussi !`)
})

bot.on("guildMemberRemove", member => {
    const bye = new Discord.MessageEmbed()
    .setColor('Couleur')
    .setDescription(`😭 | Aurevoir ${member.user.username}`)
    client.channels.cache.get('ID').send(bye)
  })
  
bot.on("guildMemberAdd", member => {
const welcome = new Discord.MessageEmbed()
.setColor('Couleur')
.setDescription(`👋 | Bienvenue ${member}`)
client.channels.cache.get('ID').send(welcome)
    member.roles.add('ID - Roles')
})

// Command Handler
const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)

    console.log(`La commandes ${file} est chargée avec succès !`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        
        console.log(`La commandes ${file} est chargée avec succès depuis ${folder} !`)
    }
})


// Event Handler
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}


// Bot sur plusieur serveur
bot.on("guildCreate", guild => {
    db.query(
        `INSERT INTO guilds(guildId, guildOwnerId, guildName) VALUES ("${guild.id}", "${guild.ownerId}", "${guild.name}")`
    )
    db.query(
        `INSERT INTO guildconfigurable(guildId) VALUES ("${guild.id}")`
    )
    db.query(
        `INSERT INTO ticket(guildId, guildOwnerId) VALUES ("${guild.id}", "${guild.ownerId}")`
    )
});
bot.on("messageCreate", (message) => {
    db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${message.guild.id}"`, (err, req) => {
        if (message.author.bot) return false;

        if (message.mentions.has(bot.user.id)) {
            message.channel.send(`Hello !\rMon prefix ${req[0].cmdPrefix}`);
        }
    })
});
bot.login(config.token)