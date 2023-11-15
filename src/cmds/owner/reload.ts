import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from 'discord.js';
import util from '../../util';

export const data = new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads all commands.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!util.isOwner(interaction.user.id)) {
        return await interaction.reply({
            content: 'You are not the owner of this bot!',
            ephemeral: true,
        });
    }

    // git pull then restart the bot
    await interaction.reply({
        content: 'Restarting...',
        ephemeral: true,
    });

    // run a process to git pull
    const child = require('child_process').spawn('git', ['pull']);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    child.stdout.on('data', (data: any) => {
        console.log(`stdout: ${data}`);
    });
}
