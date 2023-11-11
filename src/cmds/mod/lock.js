import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('lock')
    .setDescription('lock a channel!')
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('The channel to lock')
            .setRequired(true),
    );

export async function execute(interaction) {
    const channel_string = interaction.options.get('channel').value;

    if (interaction.user.id !== '648929307741257729') {
        await interaction.reply('You are not allowed to use this command.');
        return;
    }

    const channel = interaction.guild.channels.cache.get(channel_string);

    if (!channel) {
        await interaction.reply(`Unknown channel ${channel_string}`);
        return;
    }

    // SET SLOW MODE TO MAX
    // check if slow mode is already max, if so, set to 0
    // otherwise, set to max
    if (channel.rateLimitPerUser === 21600) {
        await channel.setRateLimitPerUser(0);
        await interaction.reply(`Unlocked ${channel.name}`);
    } else {
        await channel.setRateLimitPerUser(21600);
        await interaction.reply(`Locked ${channel.name}`);
    }
}
