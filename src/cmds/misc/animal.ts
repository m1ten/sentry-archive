import {
    ChatInputCommandInteraction,
    ChannelType,
    SlashCommandBuilder,
} from 'discord.js';

type Post = {
    data: {
        over_18: boolean;
    };
};

export const data = new SlashCommandBuilder()
    .setName('animal')
    .setDescription('Replies with random animal pictures!');

export async function execute(interaction: ChatInputCommandInteraction) {
    const subreddits = [
        'aww',
        'eyebleach',
        'cats',
        'dogpictures',
        'foxes',
        'rabbits',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
        'babyelephantgifs',
        'babybigcatgifs',
        'babyrhinogifs',
        'babyhippogifs',
        'babyduckgifs',
        'babygoatgifs',
    ];

    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    const {
        data: { children },
    } = await fetch(
        `https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`,
    ).then((response) => response.json());

    const allowed =
        interaction.channel?.type === ChannelType.GuildText &&
        interaction.channel.nsfw
            ? children
            : children.filter((post: Post) => !post.data.over_18);

    const post = allowed[Math.floor(Math.random() * allowed.length)].data;

    await interaction.reply(post.url);
}
