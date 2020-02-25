module.exports = { 
    config: {
        name: "skip",
        aliases: ["next"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the skip command.");

        player.stop();
        return message.channel.send("Skipped the current song!");
    }
}