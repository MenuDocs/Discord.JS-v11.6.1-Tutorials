const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const dateFormat = require("dateformat");

module.exports = { 
    config: {
        name: "steam",
        description: "Get steam statistics of a user",
        usage: "<user>",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const token = "steamToken"; //I reset mine.
        if(!args[0]) return message.channel.send("Please provide an account name!");
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) return message.channel.send("I was unable to find a steam profile with that name");

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send("I was unable to find a steam profile with that name");
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) return message.channel.send("I was unable to find a steam profile with that name");
            const { NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const embed = new RichEmbed()
                .setColor(cyan)
                .setAuthor(`Steam Services | ${personaname}`, avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Real Name:** ${realname || "Unknown"}
                **Status:** ${state[personastate]}
                **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                **Account Created:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [link to profile](${profileurl})`)
                .setTimestamp();

                message.channel.send(embed)
            })
        })
    })
  }
}