import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('role')
    .setDescription('Replies with Hello!')
    // action (Add or Remove)
    // which role
    // which user
    .addStringOption((option) =>
        option
            .setName('action')
            .setDescription('add or remove')
            .setRequired(true)
            .addChoices(
                { name: 'add', value: 'add' },
                { name: 'remove', value: 'remove' },
            ),
    )
    .addRoleOption((option) =>
        option.setName('role').setDescription('Which role?').setRequired(true),
    )
    .addUserOption((option) =>
        option
            .setName('member')
            .setDescription('Which user?')
            .setRequired(true),
    );
export async function execute(interaction: ChatInputCommandInteraction) {
    const action = interaction.options.get('action')?.value as string;
    const role = interaction.options.get('role')?.value as string;
    const user = interaction.options.get('member')?.value as string;

    if (interaction.user.id !== '648929307741257729') {
        await interaction.reply('You are not allowed to use this command.');
        return;
    }

    if (action === 'add') {
        await interaction.guild?.members.cache.get(user)?.roles.add(role);
        await interaction.reply(`Added ${role} to ${user}`);
    } else if (action === 'remove') {
        await interaction.guild?.members.cache.get(user)?.roles.remove(role);
        await interaction.reply(`Removed ${role} from ${user}`);
    } else {
        await interaction.reply(`Unknown action ${action}`);
    }
}
