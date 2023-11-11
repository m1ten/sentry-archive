import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('sentry')
    .setDescription('Information about Sentry');

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(
        `sentry is a discord bot made by <@!${process.env.OWNER_ID}>. It is written in TS and uses bun.`,
    );
}
