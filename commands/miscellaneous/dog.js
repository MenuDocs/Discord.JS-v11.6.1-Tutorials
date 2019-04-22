const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');


module.exports = { 
    config: {
        name: "dog",
        description: "Sends a picture of a dog!",
        usage: "!dog",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["doggo", "puppy"]
    },
    run: async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("whoops! I've broke, try again!")

        let dEmbed = new RichEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} DOGS!`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(dEmbed)
            msg.delete();
        })
    }
}