import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!');
export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(`Hello, ${interaction.user}!`);
}
