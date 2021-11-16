const { Client, Intents } = require("discord.js");

const discord = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
        
    ]
})

const tofuID = '543879286554230784';

var toggleToffuMode = 0;


client.on('ready', () => {
    console.log('Bot jest online!');
})

client.on('interactionCreate', interaction => {
    if(!interaction.isCommand()) {      // JEŻELI INTERAKCJA NIE JEST KOMENDĄ TO 'RETURN'
        return;
    }

    const { commandName } = interaction;

    if(commandName === 'toffumode') {
        if(!interaction.member.roles.cache.some(role => role.name === 'HEAD ADMIN')) {      // KOMENDA TYLKO DLA H@
            interaction.channel.send('Nie masz do tego uprawnień do użycia ' + commandName + ' ' + interaction.member.user.tag + ' !');
            return;
        }

        if(toggleToffuMode === 0) {         // WŁĄCZ/WYŁĄCZ TOFFU MODE
            toggleToffuMode = 1;
            interaction.channel.send('ToffuMode został włączony');
            interaction.guild.channels.cache.get('909904844523974667').setName('ToffuMode: ON');
        } else {
            toggleToffuMode = 0;
            interaction.channel.send('ToffuMode został wyłączony');
            interaction.guild.channels.cache.get('909904844523974667').setName('ToffuMode: OFF');
        }
    }

    if(commandName === 'ping') {
        interaction.reply('pong');
    }
    
    if(commandName === 'serverinfo') {
        interaction.reply('Nazwa: ' + interaction.guild.name + 'Ilość użytkowników: ' + interaction.guild.memberCount);
    }
})


client.on('messageCreate', message => {
    if(message.author.id === tofuID && toggleToffuMode === 1) {       // USUWANIE WIADOMOŚCI TOFA
        message.delete({setTimeout: 100});
        message.channel.send('`:)`');
        client.channels.cache.get(`909893873935990784`).send('```tofu chyba próbuje coś napisać..```jakby to kogoś obchodziło, to napisał "' + message.content + '", aaa, napisał to na kanale:' + message.channel);
    }

    if(message.channel.name === 'liczenie-znakow' && message.author.bot === false && message.author.id !== '543879286554230784') {
        message.reply({
            content: 'wiadomosc ma nastepujaca ilosc znakow: ' + message.content.length
        })
    }
})


client.login('token');
