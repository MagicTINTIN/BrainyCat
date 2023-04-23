const { dscrd } = require("../")
const interaction = require("../discord/interaction")

module.exports = {
    type: 'slash',
    name: 'list',
    description: 'Get the list of the programs of a user (default: you)',
    options: [
        {
            required: false,
            type: "string",
            name: "pseudo",
            description: "Pseudo of the creator",
        },
    ],
    execute(info) {
        //console.log(info);
        const { bot } = require("../../");

        let usrlst = bot.file.ldUsrLst(true);
        let pseudo = usrlst.usrs[info.userid];
        let pseudoarg = dscrd.interaction.getOpt(info.interaction, 'string', 'pseudo');

        if (!pseudo && (!pseudoarg || pseudoarg == null)) return dscrd.interaction.reply(info.interaction, true, `You are not registered yet, so you don't have any program...`);

        if (!pseudoarg || pseudoarg == null) {
            let usrcfg = bot.file.ldUsrCfg(pseudo, true);
            if (Object.keys(usrcfg.codes).length > 0)
                dscrd.interaction.reply(info.interaction, true, `Here is the list of your programs : \`\`\`\n- ${Object.keys(usrcfg.codes).join("\n- ")}\n\`\`\``);
            else
                dscrd.interaction.reply(info.interaction, true, `You don't have any program saved for the moment.`);
        }
        else {
            let usrcfg = bot.file.ldUsrCfg(pseudoarg, true);
            if (!usrcfg || !usrcfg.id || !usrcfg.codes) return dscrd.interaction.reply(info.interaction, true, `${pseudoarg} doesn't seem to exist :/`);
            let codes = []
            for (const prog in usrcfg.codes) {
                let prg = usrcfg.codes[prog]
                if (prg.rights == 'publicuse')
                    codes.push(`${prog} (Usable by everyone)`)
                if (prg.rights == 'opensource')
                    codes.push(`${prog} (Open source)`)
            }
            if (codes.length > 0)
                dscrd.interaction.reply(info.interaction, true, `Here is the list of ${pseudoarg}'s programs : \`\`\`\n- ${codes.join("\n- ")}\n\`\`\``);
            else
                dscrd.interaction.reply(info.interaction, true, `${pseudoarg} don't have any program saved for the moment.`);
        }
    }
}
