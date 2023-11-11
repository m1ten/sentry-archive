import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

export const data = new SlashCommandBuilder()
    .setName('purge')
    .setDescription('clear the chat!')
    .addIntegerOption((option) =>
        option
            .setName('amount')
            .setDescription('How many messages to delete')
            .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction) {
    let amount = interaction.options.getInteger('amount');
    if (amount <= 0) {
        await interaction.reply('Amount must be greater than 0!');
        return;
    } else if (amount > 99) {
        amount = 99;
    }

    const messages = await interaction.channel.messages.fetch({
        limit: amount,
    });
    // filter out messages that are older than 14 days
    const filtered = messages.filter(
        (m) => Date.now() - m.createdTimestamp < 1209600000,
    );
    await interaction.channel.bulkDelete(filtered);
    // save the filtered messages to a json file
    fs.writeFileSync('purged-messages.json', JSON.stringify(filtered, null, 2));
    await interaction.reply(`Deleted ${messages.size} messages!`);
}
