const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
const superagent = require("superagent")

const bot = new Discord.Client({disableEveryone: true}); //creating a new client and defining it as bot

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection(); //creating a new command name collection
bot.aliases = new Discord.Collection(); //creating a new command aliases collection

fs.readdir("./commands/", (err, files) => {   //defines the folder in which the code directs to, also passes err and files

    if(err) console.log(err) //console logs an error if an error occurs

    let jsfile = files.filter(f => f.split(".").pop() === "js") // removing the .js off of the files inside the folders
    if(jsfile.length <= 0) { //checks if there is any files
         return console.log("[LOGS] Couldn't Find Commands!"); //if the if statement comes back true then it sends this
    }

    jsfile.forEach((f, i) => { //pulls jsfile and adds a forEach function to it
        let pull = require(`./commands/${f}`); //defines where the files are
        bot.commands.set(pull.config.name, pull); //checking the files for the export name and pulling it
        pull.config.aliases.forEach(alias => { //checking the export for the alias array
            bot.aliases.set(alias, pull.config.name)
        }); //closing the aliases search
    }); //closing the forEach function
}); //closing the hole command handler



bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return; //returns if the message author is a bot or the channel is a dm channel.

    let prefix = botconfig.prefix; //defining the location in which the prefix is defined
    let messageArray = message.content.split(" ") //splitting the message contents with a space
    let cmd = messageArray[0]; //seeing what is in position one of the array.
    let args = messageArray.slice(1); //slicing the prefix/command off of the array


    if(!message.content.startsWith(prefix)) return; //if the message contents doesnt contain a prefix then it returns.
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length))) //checks if there is a command with the name or aliases in which has been called.
    if(commandfile) commandfile.run(bot,message,args) //runs the code if there is something found.

}) //closing the message event

bot.login(botconfig.token);
