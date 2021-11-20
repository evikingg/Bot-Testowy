const { Client, Intents } = require("discord.js");
const cowsay = require("cowsay");
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
    if (commandName === 'tofusay'|| commandName === 'toffusay'){
        console.log("wtf") ;
    }
            
})

client.on('messageCreate', message => {
    
    // console.log(message)

    /* moonboy 
     * toffuModeUser.tag cant be found 
     * function disable for moment

    if(message.author.tag === toffuModeUser.tag && toggleToffuMode === 1) {       // USUWANIE WIADOMOŚCI TOFA
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
    */

    if(message.channel.name === 'liczenie-znakow' && message.author.bot === false && message.author.id !== '543879286554230784') {
        message.reply({
            content: 'wiadomosc ma nastepujaca ilosc znakow: ' + message.content.length
        })
    }

    if(message.channel.id === '910622435785707571') {
        message.react(upvoteEmoji);
        message.react(downvoteEmoji);
    }


    // rest of funciton is for hidden commands 
    if (message.content[0] != "!") {
        return;
    }

    var command = message.content.substring(1).split(" ");
    if(message.author.id == client.user.id) return;

    // tofusay 
    if(command[0] == "tofusay" || command[0] == "toffusay"){
        var animal = "boy"
        var text = "@tofu is the greates player in MyLittlePony on word";
        var done = true;

        // list all evable cow in direcory
        if (command[1] == "--help") {
            message.channel.send("!tofusay to interaktna komenda\n"+
                "Pozwala ona na włożenie w usta tofa pewną wiadomość\n"+ 
                "Opcje:\n"+
                " !tofusay -f <inneformat> <text>\n"+
                "    mozna wybrać inną postać\n"+
                " !tofusay --list\n"+
                "    wyświetla pomoc\n"+
                " !tofusay --help\n"+
                "    Wyswietla pomoc");
        } else if(command[1] == "--list"){
            var cows = fs.readdirSync('./cows', {withFileTypes: true})
                .filter(item => !item.isDirectory())
                .map(item => item.name);

            var responce = "Inne możliwości to:"

            cows.forEach( i => {
                responce += "\n--- " + i.toString()
                    .substring(0, i.length-4 );
            });
            message.channel.send(responce);    
        } else{   
        // responde to message 
            var responce = ""
            var slice_from = 1;

            // chenge animal
            if(command[1] == "-f"){
                animal = command[2]
                slice_from = 3
            }

            // merge text of message
            if(command.length != slice_from){
                text = command.slice(slice_from).join(" ");
            }

            console.log("./cows/" + animal + ".cow",);
            responce = cowsay.say({
                f: "./cows/" + animal + ".cow",
                text: text
            });
            message.channel.send(responce);    
        }

    }
;
})



fs = require('fs');
var token = fs.readFileSync('./token.txt', 'utf8', function (err,data) {
  if (err) {
    console.log(err);
    console.log("Hej tutaj TOKEN bota discord");
    console.log("Nie moge otrzymać dostępu do pliku token.txt");
    console.log("Sprawdz czy napewno wszytko jest ok z tym plikiem");
    console.log("Dzieki :)");
    console.log("DISCORD_BOT");
    process.exit(1); 
  }
  console.log(data);
});

client.login(token.trimEnd());
