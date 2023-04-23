const { dscrd } = require("../")
const interaction = require("../discord/interaction")

String.prototype.cleantobfedt = function () {
    cleaned = this.match(/[\[\]\<\>\.\,\+\-]|\{[^\}]*\}+/g)
    return (cleaned != null) ? cleaned.join("") : "" // /[^\+\-\[\]\<\>\,\.]+/g to only exclude +-<>[].,
}

module.exports = {
    type: 'slash',
    name: 'edit',
    description: 'Edit one of your programs',
    options: [
        {
            required: true,
            type: "string",
            name: "name",
            description: "Name of the program you want to edit",
        },
    ],
    postmodal(answer) {
        const { bot } = require("../../");

        let usrcfg = bot.file.ldUsrCfg(answer.pseudo, true);
        usrcfg.codes[answer.progname].codetext = answer.code;
        usrcfg.codes[answer.progname].codeclean = answer.code.cleantobfedt();
        bot.file.svUsrCfg(answer.pseudo, usrcfg, true);

        dscrd.interaction.reply(answer.interaction, true, `${answer.progname} has been updated`);
    },
    execute(info) {
        //console.log(info);
        const { bot } = require("../../");

        let usrlst = bot.file.ldUsrLst(true);
        let pseudo = usrlst.usrs[info.userid];
        if (!pseudo) return dscrd.interaction.reply(info.interaction, true, `You are not registered yet, please use /register before.`);

        let name = dscrd.interaction.getOpt(info.interaction, 'string', 'name');

        let usrcfg = bot.file.ldUsrCfg(pseudo, true);

        if (!usrcfg.codes[name])
            dscrd.interaction.reply(info.interaction, true, `${name} doesn't exist yet`);

        else {
            let inputs = [
                {
                    customid: 'code',
                    label: 'Code',
                    style: 2,
                    placeholder: 'Put brainf*ck code here',
                    value: usrcfg.codes[name].codetext,
                    min: 0,
                    max: 0,
                    required: true,
                }
            ]
            bot.dscrd.modal.create(info.interaction, `edtprog.${pseudo}.${name}`, `Editing ${name}`, inputs)
        }
    }
}
