import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import util from '../../util';
import fs from 'fs';
import path from 'path';

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

    const commandsPath = path.join(__dirname, '../cmds');
    //@ts-ignore
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            //@ts-ignore
            interaction.client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
            );
        }
    }

    await interaction.reply('Reloaded all commands.');
}
