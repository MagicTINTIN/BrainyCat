const { dscrd } = require("../")
const interaction = require("../discord/interaction")

String.prototype.cleantobf = function () {
    cleaned = this.match(/[\[\]\<\>\.\,\+\-]|\{[^\}]*\}+/g)
    return (cleaned != null) ? cleaned.join("") : "" // /[^\+\-\[\]\<\>\,\.]+/g to only exclude +-<>[].,
}

module.exports = {
    type: 'slash',
    name: 'save',
    description: 'Save a program',
    options: [
        {
            required: true,
            type: "string",
            name: "name",
            description: "Name of you program",
            min: 2,
            max: 20,
        },
        {
            required: true,
            type: "string",
            name: "code",
            description: "Code of you program",
        },
        {
            required: false,
            type: "string",
            name: "rights",
            description: "Define if users can use and or see your program (opensource by default)",
            choices: [
                { name: 'Open Source', value: 'opensource' },
                { name: 'Usable by everyone', value: 'publicuse' },
                { name: 'Private', value: 'private' },
            ]
        },
        {
            required: false,
            type: "boolean",
            name: "overwrite",
            description: "Overwrite existing file"
        },
    ],
    execute(info) {
        //console.log(info);
        const { bot } = require("../../");

        let usrlst = bot.file.ldUsrLst(true);
        let pseudo = usrlst.usrs[info.userid]
        if (!pseudo) return dscrd.interaction.reply(info.interaction, true, `You are not registered yet, please use /register before.`)

        let name = dscrd.interaction.getOpt(info.interaction, 'string', 'name').split(".").join("");
        let code = dscrd.interaction.getOpt(info.interaction, 'string', 'code');
        let rights = dscrd.interaction.getOpt(info.interaction, 'string', 'rights');
        let overwrite = dscrd.interaction.getOpt(info.interaction, 'boolean', 'overwrite');

        let usrcfg = bot.file.ldUsrCfg(pseudo, true);

        if (!rights)
            rights = 'opensource';

        if ((overwrite && overwrite == true) || !usrcfg.codes[name]) {
            let now = Date.now();
            usrcfg.codes[name] = {
                codetext: code,
                codeclean: code.cleantobf(),
                rights: rights,
                created: now,
                modified: now,
            }
            bot.file.svUsrCfg(pseudo, usrcfg, true);
            dscrd.interaction.reply(info.interaction, true, `${name} has been saved ! It will execute\n\`\`\`brainfuck\n${usrcfg.codes[name].codeclean}\`\`\``)
        }
        else
            dscrd.interaction.reply(info.interaction, true, `A program called ${name} already exists. If you wan to overwrite it set the option overwrite to *True*.`)
    }
}
