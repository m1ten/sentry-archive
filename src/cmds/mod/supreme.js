const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('supreme')
        .setDescription('says who is supreme!')
        //@ts-ignore
        .addStringOption(option => option.setName('message').setDescription('What you want to say').setRequired(true))
        //@ts-ignore
    .addUserOption(option => option.setName('user').setDescription('The user to send the message to').setRequired(true)),
    async execute(interaction) {
        // check if the user is owner of the bot
        if (interaction.user.id !== process.env.OWNER_ID) {
            await interaction.reply('You are not the owner of this bot!');
            return;
        }

        const message = interaction.options.getString('message');
        const user = interaction.options.getUser('user');
        // dm the user
        await user.send(message);
        // reply to the interaction
        await interaction.reply(`Sent ${message} to ${user.username}`);
    },
};