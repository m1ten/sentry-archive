import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Replies with a random meme!');

export async function execute(interaction: ChatInputCommandInteraction) {
    const subreddits = ['dankmeme', 'meme', 'me_irl', 'memes'];

    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    const {
        data: { children },
    } = await fetch(
        `https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`,
    ).then((response) => response.json());

    type Post = {
        data: {
            over_18: boolean;
        };
    };

    // const allowed = interaction.channel.nsfw
    //     ? children
    //     : children.filter((post) => !post.data.over_18);

    const allowed = children.filter((post: Post) => !post.data.over_18);
    const post = allowed[Math.floor(Math.random() * allowed.length)].data;

    await interaction.reply(post.url);
}
