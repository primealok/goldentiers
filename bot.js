const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = 'MTUwNjUxNzQ0NzI1NDIxNjc1NQ.G0FIka.2xnGF7rkeBtznVGEQTqLhdtCfUbEAjcVAAl_ks';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'addplayer') {
        const name = interaction.options.getString('name');
        const tier = interaction.options.getString('tier');

        const response = await fetch('http://localhost:3000/api/add-player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                tier
            })
        });

        const data = await response.json();

        if (data.success) {
            await interaction.reply(`Added ${name} to ${tier} tier.`);
        } else {
            await interaction.reply('Failed to add player.');
        }
    }
});

client.login(TOKEN);