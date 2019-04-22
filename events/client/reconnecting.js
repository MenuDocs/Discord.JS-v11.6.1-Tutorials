const dateformat = require("dateformat");

module.exports = () => { 
    console.log(`Reconnecting at ${dateformat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}.`)
}