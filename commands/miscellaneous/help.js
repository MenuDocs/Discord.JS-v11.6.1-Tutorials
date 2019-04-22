const { RichEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "!usage",
        category: "miscellaneous",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
    let arr = [];
    let types = ["Moderation", "Miscellaneous"];
    let embed = new RichEmbed()

    if (!args[0]) {
        for(let i = 0; i < types.length; i++) {
            arr.push(bot.commands.filter(c => c.config.category == types[i].toLowerCase()).map(c => `\`${c.config.name}\``).join(" "));
            try {
                embed.addField(types[i], arr[i]);
            } catch (e) {
                embed.addBlankField();
            }
        }

        embed.setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the avaliable commands for the TestBOT!\nThe bot prefix is: **${prefix}**`)
        .setFooter("Test Bot 2k19", bot.user.displayAvatarURL)
        message.channel.send(embed)
    } else {
        let command = bot.commands.get(args[0].toLowerCase()) ?  bot.commands.get(args[0].toLowerCase()).config : bot.commands.get(bot.aliases.get(args[0].toLowerCase())).config;
            
        embed.setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.name}\n**Description:** ${command.description || "No Description"}\n**Usage:** ${command.usage || "No Usage"}\n**Accessable by:** ${command.accessableby || "Members"}\n**Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`)
        message.channel.send(embed);
        }
    }
}