const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('reply with what you say!')
        //@ts-ignore
        .addStringOption(option => option.setName('message').setDescription('What you want to say').setRequired(true)),
    async execute(interaction: any) {
        await interaction.reply(`${interaction.options.get('message').value}`);
    },
};