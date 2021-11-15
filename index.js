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




client.login('OTA4MzY2MTcyMTg4MTg4Njky.YY0r7A.xxYttHjBRAJK1WcA8DRV--f5Wcc');