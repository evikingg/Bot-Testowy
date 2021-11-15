const { Client, Intents } = require("discord.js");

const discord = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
        
    ]
})

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
            return;
        }

        if(toggleToffuMode === 0) {         // WŁĄCZ/WYŁĄCZ TOFFU MODE
            toggleToffuMode = 1;
            interaction.channel.send('ToffuMode został włączony');
        } else {
            toggleToffuMode = 0;
            interaction.channel.send('ToffuMode został wyłączony');
        }
    }

    if(commandName === 'ping') {
        interaction.reply('pong');
    }
})

client.on('messageCreate', message => {
    if(message.author.id === '298103131898773504' && toggleToffuMode === 1) {       // USUWANIE WIADOMOŚCI TOFA
        message.delete({setTimeout: 100});
        message.channel.send('`:)`');
       // client.channels.cache.get(`909893873935990784`).send('```tofu chyba próbuje coś napisać..```jakby to kogoś obchodziło, to napisał "' + message.content + '", aaa, napisał to na kanale:' + message.channel);
    }

    if(message.channel.name === 'liczenie-znakow' && message.author.bot === false && message.author.id !== '543879286554230784') {
        message.reply({
            content: 'wiadomosc ma nastepujaca ilosc znakow: ' + message.content.length
        })
    }
})



/*

client.on('messageCreate', (message) => {
    if (message.content.charAt(0) === '!') {
        if (message.content.substring(1) === 'ping' && message.author.id !== '543879286554230784') { 
     message.channel.send("pong!");
        }
    }

    if(message.content !== '!ping' && message.channel.name === 'liczenie-znakow' && message.author.bot === false && message.author.id !== '543879286554230784') {
        message.reply({
            content: 'wiadomosc ma nastepujaca ilosc znakow: ' + message.content.length
        })
    }

    if(message.author.id === '543879286554230784' && toggleToffuMode === 1) {
        message.delete({setTimeout: 100});
        message.channel.send('`:)`');
        client.channels.cache.get(`909893873935990784`).send('```tofu chyba próbuje coś napisać..```jakby to kogoś obchodziło, to napisał "' + message.content + '"');
    }

    if(message.content === '!random') {
        message.channel.send('Wylosowales/as: ' + Math.round(Math.random()*10));
    }

    if(message.member.roles.cache.some(role => role.name === 'HEAD ADMIN') && message.content === '!toffuMode') {
        if(toggleToffuMode === 0) {
            toggleToffuMode = 1;
            message.channel.send('ToffuMode został włączony');
        } else {
            toggleToffuMode = 0;
            message.channel.send('ToffuMode został wyłączony');
        }
    }

})

*/


client.login('token');
