const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "cat",
        description: "sends a picture of a cat!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["catto"]
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generating...")

        fetch("http://aws.random.cat/meow")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(" whoops. I broke, try again!")

            let embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} Dogs!`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}