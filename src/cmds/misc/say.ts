import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction, ColorResolvable } from 'discord.js';
import util from '../../util';

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
    const msg = interaction.options.getString('message', true);
    const embed = new EmbedBuilder()
        .setColor(util.colors.primary as ColorResolvable)
        .addFields({
            name: 'say',
            value: `${msg}`,
            inline: true,
        })
        .setTimestamp(new Date())
        .setFooter({
            text: `requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL() as string,
        });

    await interaction.reply({
        embeds: [embed],
    });
}
