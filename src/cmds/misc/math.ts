import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { evaluate, format } from 'mathjs';

export const data = new SlashCommandBuilder()
    .setName('math')
    .setDescription('Replies with math!')
    .addStringOption((option) =>
        option
            .setName('equation')
            .setDescription(
                'see https://mathjs.org/docs/expressions/syntax.html',
            )
            .setRequired(true),
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    const equation = interaction.options.getString('equation') || '0';

    let result: string;
    try {
        result = evaluate(equation);
        result = format(result, { precision: 3 });
    } catch (error) {
        return await interaction.reply({
            content: `\`${equation}\` is not a valid equation!`,
            ephemeral: true,
        });
    }

    await interaction.reply(`\`${equation}\` = \`${result}\``);
}
