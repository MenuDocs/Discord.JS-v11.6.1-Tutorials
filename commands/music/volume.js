module.exports = { 
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        if (!player) return message.channel.send("No song/s currently playing within this guild.");

        const { voiceChannel } = message.member;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to adjust the volume.");

        if (!args[0]) return message.channel.send(`Current Volume: ${player.volume}`);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("You may only set the volume to 1-100");

        player.setVolume(Number(args[0]));
        return message.channel.send(`Successfully set the volume to: ${args[0]}`)
    }
}