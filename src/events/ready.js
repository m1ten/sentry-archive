import { Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(interaction) {
    const client = interaction;

    // if (!client.application?.owner) await client.application?.fetch();

    // await client.application?.commands.set(client.commands.map((c: any) => c.data));

    // load the commands to guild 648929307741257729
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    await guild.commands.set(client.commands.map((c) => c.data));

    // set the bot's status
    await client.user.setPresence({
        activities: [{ name: 'with bun.ts' }],
        status: 'idle',
    });

    console.log(`Ready! Logged in as ${client.user.tag}`);
    console.log(
        `Loaded commands: ${client.commands
            .map((c) => c.data.name)
            .join(', ')}`,
    );
    console.log(`Commands: ${client.commands.size}`);
}
