const { dscrd } = require("../")
const interaction = require("../discord/interaction")
const debugmsg = require("../../config/admin/debugmsg.json");

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
        let pseudo = dscrd.interaction.getOpt(info.interaction, 'string', 'pseudo').split(".").join("");
        let usrcfg = bot.file.ldUsrCfg(pseudo, true);
        if (pseudo.length < 4)
            dscrd.interaction.reply(info.interaction, true, `You can't use some characters and your pseudo length has to be greater than 4`)
        else if ((usrcfg.id == undefined || usrcfg.id == info.userid)) {
            usrcfg.id = info.userid;
            bot.file.svUsrCfg(pseudo, usrcfg, true);

            // update usr lst
            let usrlst = bot.file.ldUsrLst(true);
            usrlst.usrs[info.userid] = pseudo;
            bot.file.svUsrLst(usrlst, true);
            bot.log.all(`${debugmsg.interactions.action}${info.tag} ${debugmsg.interactions.register.newuser} ${pseudo}`)
            dscrd.interaction.reply(info.interaction, true, `You successfully registered with the pseudo *${pseudo}*`);
        }
        else
            dscrd.interaction.reply(info.interaction, true, `Pseudo *${pseudo}* is already taken, please choose another one`)
    }
}
