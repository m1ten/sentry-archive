const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hello!'),
    async execute(interaction: any) {
        await interaction.reply(`Hello, ${interaction.user}!`);
    },
};