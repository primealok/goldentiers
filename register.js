const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = 'MTUwNjUxNzQ0NzI1NDIxNjc1NQ.G0FIka.2xnGF7rkeBtznVGEQTqLhdtCfUbEAjcVAAl_ks';
const CLIENT_ID = '1506517447254216755';
const GUILD_ID = '1506517223462932600';

const commands = [
    new SlashCommandBuilder()
        .setName('addplayer')
        .setDescription('Add player to GOLDEN tiers')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Player name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('tier')
                .setDescription('Player tier')
                .setRequired(true)
                .addChoices(
                    { name: 'S', value: 'S' },
                    { name: 'A', value: 'A' },
                    { name: 'B', value: 'B' },
                    { name: 'C', value: 'C' },
                    { name: 'D', value: 'D' }
                )
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Registering commands...');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log('Commands registered.');
    } catch (error) {
        console.error(error);
    }
})();
