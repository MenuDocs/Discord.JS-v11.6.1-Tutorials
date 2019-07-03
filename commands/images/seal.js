const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "seal",
        description: "Sends a picture of a seal!",
        usage: "",
        category: "images",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generating...")

        fetch("https://apis.duncte123.me/seal")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(" whoops. I broke, try again!")

            let embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} Seal!`, message.guild.iconURL)
            .setImage(body.data.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}