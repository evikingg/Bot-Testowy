const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder()
	.setName('toffumodeon')
	.setDescription('Tunrs on the ultimate "Toffu Mode"!')
	.addUserOption(option => option.setName('user').setDescription('Dla jakiego użytkownika chcesz włączyć ToffuMode?').setRequired(true)),
    new SlashCommandBuilder().setName('serverinfo').setDescription('returns server info'),
	new SlashCommandBuilder().setName('toffumodeoff').setDescription('Tunrs off the ultimate "ToffuMode"'),
	new SlashCommandBuilder()
		.setName('propozycja')
		.setDescription('Chcesz coś zaproponować? Może nową funkcję bota? Wpisz tą komendę!')
		.addStringOption(option => option.setName('title').setDescription('Wpisz tytuł swojej propozycji').setRequired(true))
		.addStringOption(option => option.setName('description').setDescription('Wpisz opis swojej propozycji').setRequired(true)),
	new SlashCommandBuilder().setName('pingowanko').setDescription('Pinguj kogoś ile razy chcesz.')
	.addIntegerOption(option => option.setName('liczba').setDescription('liczba pingów').setRequired(true))
	.addUserOption(option => option.setName('user').setDescription('Kogo mam spingować?').setRequired(true))
	]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
