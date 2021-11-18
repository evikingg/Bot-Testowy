const { Client, Intents } = require("discord.js");

const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

const tofuID = '640332733922541609';

const upvoteEmoji = client.emojis.cache.get('910634241497399386');
const downvoteEmoji = client.emojis.cache.get('910634523795001404');

var toggleToffuMode = 0;
var toffuModeUser;

////////////////////////////////////////////////////////////////////////////////////////

client.on('ready', () => {
    console.log('Bot jest online!');
    toggleToffuMode = 0;
    client.user.setActivity('Being programmed by evikingg#4473 :)', { type: 'WATCHING' });
})

client.on('interactionCreate', interaction => {
    if(!interaction.isCommand()) {      // JEŻELI INTERAKCJA NIE JEST KOMENDĄ TO 'RETURN'
        return;
    }

    const { commandName } = interaction;

    if(commandName === 'toffumodeon') {     // WŁĄCZENIE TOFFUMODE

        if(!interaction.member.roles.cache.some(role => role.name === 'HEAD ADMIN')) {      // KOMENDA TYLKO DLA H@
            interaction.reply('Nie masz do tego uprawnień do użycia ' + commandName + ' ' + interaction.member.user.tag + ' !');
            return;
        }

        if(toggleToffuMode === 0) {

            toggleToffuMode = 1;
            toffuModeUser = interaction.options.getUser('user');

            const Log = new MessageEmbed()
                .setColor('0080000')
                .setTitle('Log Pomagiera(wiadomość automatyczna)')
                .setAuthor('Pomagier', 'https://imgur.com/Bt4MTTb')
                .setDescription('User: ' + interaction.user.tag)
                .addField('Command:', 'toffumode', true)
                .addField('Description:', 'toffumode został włączony\ndla użytkownika ' + toffuModeUser.tag, true)
                .setFooter('...');

            const ToffuModeOnEmbed = new MessageEmbed()
                .setColor('#0000ff')
                .setTitle('ToffuMode')
                .setAuthor('ToffuBot')
                .setDescription('ToffuMode został włączony')
                .addFields(
                    { name: 'ToffuMode', value: 'Teraz ' + toffuModeUser.tag + ' nie będzie mógł nic pisać. PogChamp!' },
                )
                .setFooter('Yayy!');

            toffuModeGuild = interaction;
            interaction.reply({ content: 'Done!', embeds: [ToffuModeOnEmbed], ephemeral: true })
            interaction.guild.channels.cache.get('909893873935990784').send({embeds: [Log]});
            interaction.guild.channels.cache.get('909904844523974667').setName('ToffuMode: ON');
            interaction.guild.channels.cache.get('910946091103576125').send('Dla użytkownika: ' + toffuModeUser.tag);
        } else{
            interaction.reply({content: 'ToffuMode jest już włączony!!!', ephemeral: true});
        }
    }

    if(commandName === 'toffumodeoff') {        // WYŁĄCZENIE TOFFUMODE

        if(!interaction.member.roles.cache.some(role => role.name === 'HEAD ADMIN')) {      // KOMENDA TYLKO DLA H@
            interaction.reply('Nie masz do tego uprawnień do użycia ' + commandName + ' ' + interaction.member.user.tag + ' !');
            return;
        }

        if(toggleToffuMode === 1) {
            
            toggleToffuMode = 0;

            const Log = new MessageEmbed()
                .setColor('0080000')
                .setTitle('Log Pomagiera(wiadomość automatyczna)')
                .setAuthor('Pomagier', 'https://imgur.com/Bt4MTTb')
                .setDescription('User: ' + interaction.user.tag)
                .addField('Command:', 'toffumode', true)
                .addField('Description:', 'toffumode został wyłączony\ndla użytkownika ' + toffuModeUser.tag, true)
                .setFooter('...');

            const ToffuModeOffEmbed = new MessageEmbed()
                .setColor('#0000ff')
                .setTitle('ToffuMode')
                .setAuthor('ToffuBot')
                .setDescription('ToffuMode został wyłączony...')
                .addFields(
                    { name: 'ToffuMode', value: 'Teraz ' + toffuModeUser.tag + ' będzie mógł już wysyłać wiadomości. Sadge...' },
                )
                .setFooter(':(');

            toffuModeGuild = interaction;
            interaction.reply({ content: 'Done!', embeds: [ToffuModeOffEmbed], ephemeral: true });
            interaction.guild.channels.cache.get('909893873935990784').send({embeds: [Log]});
            interaction.guild.channels.cache.get('909904844523974667').setName('ToffuMode: OFF');
            interaction.guild.channels.cache.get('910946091103576125').send('Przesyłanie zakończone \n . \n .');
        } else {
            interaction.reply({content: 'ToffuMode jest już wyłączony!!!', ephemeral: true})
        }
    }

    if(commandName === 'ping') {            // PING
        interaction.reply(`Current bot ping: ${client.ws.ping}ms.`);
    }
    
    if(commandName === 'serverinfo') {          // SERVERINFO
        interaction.reply('Nazwa: ' + interaction.guild.name + '\n' + 'Ilość użytkowników: ' + interaction.guild.memberCount);
    }

    if (commandName === 'propozycja') {         // PROPOZYCJE
        const Propozycja = new MessageEmbed() 
            .setAuthor(interaction.user.tag)
            .setTitle(interaction.options.getString('title'))
            .setDescription(interaction.options.getString('description'));

        const Log = new MessageEmbed()
            .setColor('0080000')
            .setTitle('Log Pomagiera(wiadomość automatyczna)')
            .setAuthor('Pomagier', 'https://imgur.com/Bt4MTTb')
            .setDescription('User: ' + interaction.user.tag)
            .addField('Command:', 'propozycja', true)
            .addField('Description:', interaction.user.tag + ' dodał propozycję.', true)
            .setFooter('...');

        interaction.guild.channels.cache.get('910622435785707571').send({embeds: [Propozycja]})
        interaction.reply({content: 'Twoja propozycja została zgłoszona', ephemeral: true})
        interaction.guild.channels.cache.get('909893873935990784').send({embeds: [Log]})
    }

    if(commandName === 'pingowanko') {          // PINGOWANKO
        interaction.reply({content: 'Done', ephemeral: true})
        for(let x = 0; x < interaction.options.getInteger('liczba'); x++) {
            interaction.channel.send({content: interaction.options.getUser('user').toString(), timeout: 10});
        }
    }
})

client.on('messageCreate', message => {
    if(message.author === toffuModeUser && toggleToffuMode === 1) {       // USUWANIE WIADOMOŚCI TOFA
        message.delete({timeout: 10});
        message.channel.send('`:)`');

        const Log = new MessageEmbed()
        .setColor('FFB6C1')
        .setTitle('Pomagier log')
        .setAuthor('Pomagier', 'https://imgur.com/Bt4MTTb')
        .setDescription('ToffuMode')
        .addField('Napisał: ', message.content, true)
        .addField('Na kanale:', message.channel.name, true)
        .setFooter('Wiadomość automatyczna');

        message.guild.channels.cache.get(`910946091103576125`).send({embeds: [Log]});
    }

    if(message.channel.name === 'liczenie-znakow' && message.author.bot === false && message.author.id !== '543879286554230784') {
        message.reply({
            content: 'wiadomosc ma nastepujaca ilosc znakow: ' + message.content.length
        })
    }

    if(message.channel.id === '910622435785707571') {
        message.react(upvoteEmoji);
        message.react(downvoteEmoji);
    }
})


client.login('Token');
