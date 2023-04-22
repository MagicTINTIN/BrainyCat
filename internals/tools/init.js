const { client } = require("../../index.js");
const discord = require("discord.js");


function init() {
    const { dscrd } = require("../")

    client.glddata = new discord.Collection();
    client.cmds = new discord.Collection();

    dscrd.interaction.init();
}

module.exports = init;