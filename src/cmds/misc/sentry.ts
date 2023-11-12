import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('sentry')
    .setDescription('Information about Sentry');

export async function execute(interaction: ChatInputCommandInteraction) {
    const trueLatency = Math.abs(interaction.client.ws.ping + Date.now() - interaction.createdTimestamp).toPrecision(2)
    const userCpuUsage = Math.floor(process.cpuUsage().user / 1000); // microseconds to milliseconds
    const systemCpuUsage = Math.floor(process.cpuUsage().system / 1000); // microseconds to milliseconds
    const memoryUsage = Math.floor(process.memoryUsage().rss / 1024 / 1024);
    const uptime = Math.floor(process.uptime());

    const owner = interaction.client.users.cache.get(process.env.OWNER_ID)?.tag;

    // Embedded message with information about Sentry
    const embed = new EmbedBuilder()
        .setColor('#32CD32')
        .setTitle('sentry')
        .setDescription('Information about sentry')
        // .setThumbnail(interaction.client.user?.displayAvatarURL() as string)
        .addFields(
            {
                name: 'Latency',
                value: `${trueLatency} ms`,
                inline: true,
            },
            {
                name: 'CPU Usage',
                value: `user: ${userCpuUsage} ms\nsystem: ${systemCpuUsage} ms`,
                inline: true,
            },
            {
                name: 'Memory Usage',
                value: `${memoryUsage} MB`,
                inline: true,
            },
            {
                name: 'Uptime',
                value: `${uptime} seconds`,
                inline: true,
            },
        )
        .setTimestamp(new Date())
        .setFooter({
            text: `Written in TS using discord.js and bun.sh\nMade by @${owner}`,
            iconURL: interaction.client.users.cache.get(process.env.OWNER_ID)?.displayAvatarURL() as string,
        });

    await interaction.reply({
        embeds: [embed],
    });
}
