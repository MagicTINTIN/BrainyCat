const { dscrd } = require("../")
const interaction = require("../discord/interaction")

module.exports = {
    type: 'slash',
    name: 'register',
    description: 'Register to get an account to save your codes',
    options: [
        {
            required: true,
            type: "string",
            name: "pseudo",
            description: "Pseudo that will be used to import modules",
            min: 5,
            max: 20,
        },
    ],
    execute(info) {
        const { bot } = require("../../")
        //console.log(info);
        let pseudo = dscrd.interaction.getOpt(info.interaction, 'string', 'pseudo')
        let usrcfg = bot.file.ldUsrCfg(pseudo);

        if (usrcfg.id == undefined || usrcfg.id == info.userid) {
            usrcfg.id = info.userid;
            bot.file.svUsrCfg(pseudo, usrcfg);

            // update usr lst
            let usrlst = bot.file.ldUsrLst(false);
            usrlst.usrs[info.userid] = pseudo;
            bot.file.svUsrLst(usrlst);

            dscrd.interaction.reply(info.interaction, true, `You successfully registered with the pseudo *${pseudo}*`);
        }
        else
            dscrd.interaction.reply(info.interaction, true, `Pseudo *${pseudo}* is already taken, please choose another one`)
    }
}
