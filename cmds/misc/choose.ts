import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Choose a random option!')
    .addStringOption(option => option.setName('options').setDescription('options, separated by comma').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('How many options to choose').setRequired(false));

export async function execute(interaction: any) {
    // get all options
    const options = interaction.options.getString('options').split(',');
    // get the amount of options to choose
    const amount = interaction.options.getInteger('amount') || 1;

    let chosen = [];
    // choose a random option
    for (let i = 0; i < amount; i++) {
        chosen.push(options[Math.floor(Math.random() * options.length)]);
    }
    // reply to the interaction
    await interaction.reply(`I choose ${chosen.join(', ')}`);
}