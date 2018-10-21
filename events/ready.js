const Discord = require("discord.js")


module.exports = bot => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});
}