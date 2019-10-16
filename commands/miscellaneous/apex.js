const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const API = require("apextab-api"), ApexTab  = API.Apextab_API;

module.exports = {
    config: {
        name: "apex",
        description: "Displays a user's apex stats!",
        usage: "<user> <platform>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["apec"] 
    }, 
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send("Please supply a username.");
        if(!args[1]) return message.channel.send("Please supply a platform to check. `pc`, `xbox` or `ps4`");

        const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
        const platform = platformCheck[args[1].toLowerCase()];

        try {
            const results = await ApexTab.searchPlayer(args[0], platform ? platform : API.Platform.PC)
            
                for (let playerResult of results.results) {
                    const player = await ApexTab.getPlayerById(playerResult.aid)
                    const { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;

                        const embed = new RichEmbed()
                            .setColor(cyan)
                            .setAuthor(`Origin (Apex Legends) | ${name}`, avatar)
                            .setThumbnail(avatar)
                            .setDescription(stripIndents`
                                **Active Legend:** ${legend || "Not Found."}
                                **Global Rank:** ${globalrank || "Not Ranked."}
                                **level:** ${level || 0}
                                **Skill Ratio:** ${skillratio || "0%"}
                                **Matches:** ${matches || 0}
                                **Kills:** ${kills || 0}
                                **Headshots:** ${headshots || 0}
                                **Visits:** ${visits || 0}
                                **PlayTime:** ${Math.ceil(utime / (1000 * 60 * 60 * 24)) || 0} days
                            `)
                            .setTimestamp()

                        message.channel.send(embed)
                }
        } catch(err) {
            return message.channel.send("Can't find a player by that")
        }
    }
}