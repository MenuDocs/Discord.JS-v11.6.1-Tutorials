const urban = require("urban");
const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");

module.exports = { 
    config: {
        name: "urban",
        aliases: ["urb", "urbandictionary", "ud"],
        category: "miscellaneous",
        description: "gets an urban dictionary definition",
        usage: "<search|random> (query)",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please run this command in a `NSFW` channel.");
        if(!args[0] || !["search", "random"].includes(args[0])) return message.channel.send("`-urban <search|random> (query)`");
        let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
            try {
                search.first(res => {
                    if(!res) return message.channel.send("No results found for this topic, sorry!");
                    let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;

                        let embed = new RichEmbed()
                            .setColor(cyan)
                            .setAuthor(`Urban Dictionary | ${word}`, image)
                            .setThumbnail(image)
                            .setDescription(stripIndents`**Defintion:** ${definition || "No definition"}
                            **Example:** ${example || "No Example"}
                            **Upvote:** ${thumbs_up || 0}
                            **Downvote:** ${thumbs_down || 0}
                            **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                            .setTimestamp()
                            .setFooter(`Written by ${author || "unknown"}`);

                            message.channel.send(embed)
                })
            } catch(e) {
                console.log(e)
                return message.channel.send("looks like i've broken! Try again")
            }
        }
}
