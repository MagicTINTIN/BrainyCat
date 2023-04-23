const { dscrd } = require("../")
const interaction = require("../discord/interaction")

module.exports = {
    type: 'slash',
    name: 'del',
    description: 'Delete one of your saved programs',
    options: [
        {
            required: true,
            type: "string",
            name: "name",
            description: "Name of the program you want to delete",
        },
    ],
    execute(info) {
        //console.log(info);
        const { bot } = require("../../");

        let usrlst = bot.file.ldUsrLst(true);
        let pseudo = usrlst.usrs[info.userid];
        if (!pseudo) return dscrd.interaction.reply(info.interaction, true, `You are not registered yet, please use /register before.`);

        let name = dscrd.interaction.getOpt(info.interaction, 'string', 'name');

        let usrcfg = bot.file.ldUsrCfg(pseudo, true);

        if (!usrcfg.codes[name])
            dscrd.interaction.reply(info.interaction, true, `${name} did not exist so nothing to delete :p`);

        else {
            delete usrcfg.codes[name];
            bot.file.svUsrCfg(pseudo, usrcfg, true);
            dscrd.interaction.reply(info.interaction, true, `${name} has been deleted.`);
        }

    }
}
