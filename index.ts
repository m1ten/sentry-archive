// import discord.js
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';

// create a new Client instance
const client: any = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'cmds');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args: any[]) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any[]) => event.execute(...args));
    }
}

//@ts-ignore
// client.on(Events.InteractionCreate, async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     const command = client.commands.get(interaction.commandName);

//     if (!command) {
//         console.error(`No command matching ${interaction.commandName} was found.`);
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
//         } else {
//             await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//         }
//     }
// });

// // listen for the client to be ready
// client.once(Events.ClientReady, async (c: any) => {
//     // if (!client.application?.owner) await client.application?.fetch();

//     // await client.application?.commands.set(client.commands.map((c: any) => c.data));

//     // load the commands to guild 648929307741257729
//     const guild = await client.guilds.fetch(process.env.GUILD_ID);
//     await guild.commands.set(client.commands.map((c: any) => c.data));


//     // set the bot's status
//     await client.user.setPresence({ activities: [{ name: 'with bun and discord.js' }], status: 'idle' });

//     console.log(`Ready! Logged in as ${c.user.tag}`);
//     console.log(`Loaded commands: ${client.commands.map((c: any) => c.data.name).join(', ')}`);
//     console.log(`Commands: ${client.commands.size}`);
// });

// login with the token from .env.local
client.login(process.env.BOT_TOKEN);