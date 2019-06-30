const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "meme",
        description: "Sends a meme from a website!",
        usage: "!meme",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    fetch("https://apis.duncte123.me/meme")
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("whoops! I've broke, try again!")

        let mEmbed = new RichEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} MEMES!`, message.guild.iconURL)
        .setImage(body.image)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(mEmbed)
            msg.delete();
        })
    }
}
