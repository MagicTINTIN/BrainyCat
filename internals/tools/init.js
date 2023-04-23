const { client } = require("../../index.js");
const discord = require("discord.js");
const dbgmsg = require('../../config/admin/debugmsg.json');
const commsg = require('../../config/public/common.json')


function init() {
    const { bot } = require("../../")

    client.usrdata = new discord.Collection();
    client.cmds = new discord.Collection();
    bot.file.ldUsrLst(false);
    bot.log.all(dbgmsg.tools.file.ldUsrLst, true);
    bot.dscrd.interaction.init();

    statusInt = setInterval(() => {
        bot.base.clt.setStatus(bot.rdm.obj(commsg.status.playinglist), 0, 1);
    }, 60000);
}

module.exports = init;