const { client } = require("../../index.js");
const discord = require("discord.js");
const dbgmsg = require('../../config/admin/debugmsg.json');


function init() {
    const { bot } = require("../../")

    client.usrdata = new discord.Collection();
    client.cmds = new discord.Collection();
    bot.file.ldUsrLst(false);
    bot.log.all(dbgmsg.tools.file.ldUsrLst, true);
    bot.dscrd.interaction.init();
}

module.exports = init;