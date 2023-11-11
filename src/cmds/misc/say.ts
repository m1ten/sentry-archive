import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('say')
    .setDescription('reply with what you say!')
    //@ts-ignore
    .addStringOption((option) =>
        option
            .setName('message')
            .setDescription('What you want to say')
            .setRequired(true),
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(`${interaction.options.get('message')?.value}`);
}
