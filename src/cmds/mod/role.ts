const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Replies with Hello!')
        // action (Add or Remove)
        // which role
        // which user
        //@ts-ignore
        .addStringOption(option =>
            option.setName('action')
                .setDescription('add or remove')
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'add' },
                    { name: 'remove', value: 'remove' },
                ))
        //@ts-ignore
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Which role?')
                .setRequired(true))
        //@ts-ignore
        .addUserOption(option =>
            option.setName('member')
                .setDescription('Which user?')
                .setRequired(true)),
    async execute(interaction: any) {
        const action = interaction.options.get('action').value;
        const role = interaction.options.get('role').value;
        const user = interaction.options.get('member').value;

        if (interaction.user.id !== '648929307741257729') {
            await interaction.reply('You are not allowed to use this command.');
            return;
        }

        if (action === 'add') {
            await interaction.guild.members.cache.get(user).roles.add(role);
            await interaction.reply(`Added ${role} to ${user}`);
        } else if (action === 'remove') {
            await interaction.guild.members.cache.get(user).roles.remove(role);
            await interaction.reply(`Removed ${role} from ${user}`);
        } else {
            await interaction.reply(`Unknown action ${action}`);
        }
    },
};