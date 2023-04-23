const { dscrd } = require("../")
const interaction = require("../discord/interaction")

module.exports = {
    type: 'slash',
    name: 'read',
    description: 'Read program content',
    options: [
        {
            required: true,
            type: "string",
            name: "name",
            description: "Name of the program you want to read (ex: SneakyCat.helloworld or yourProgramName)",
        },
    ],
    execute(info) {
        //console.log(info);
        const { bot } = require("../../");

        let usrlst = bot.file.ldUsrLst(true);
        let pseudo = usrlst.usrs[info.userid];
        const program = dscrd.interaction.getOpt(info.interaction, 'string', 'name').split(".");

        if (!pseudo && program.length < 2) return dscrd.interaction.reply(info.interaction, true, `You are not registered yet, so you don't have any program to read...`);

        if (program.length < 2) {
            let usrcfg = bot.file.ldUsrCfg(pseudo, true);
            if (!usrcfg.codes[program[0]])
                dscrd.interaction.reply(info.interaction, true, `You don't have any program called ${program[0]}`);
            else
                dscrd.interaction.reply(info.interaction, true, `Here is the content of ${program[0]}\n\`\`\`brainfuck\n${usrcfg.codes[program[0]].codetext}\n\`\`\``);
        }
        else {
            let usrcfg = bot.file.ldUsrCfg(program[0], true);
            if (!usrcfg || !usrcfg.id || !usrcfg.codes) return dscrd.interaction.reply(info.interaction, true, `${program[1]} doesn't seem to exist :/`);

            if (!usrcfg.codes[program[1]] || !usrcfg.codes[program[1]].codetext)
                dscrd.interaction.reply(info.interaction, true, `${program[1]} don't have any program called ${program[0]}`);
            else {
                if (usrcfg.codes[program[1]].rights != 'opensource')
                    dscrd.interaction.reply(info.interaction, true, `${program[0]} didn't set his program ${program[1]} as Open Source`);
                else
                    dscrd.interaction.reply(info.interaction, true, `Here is the content of ${program[0]}.${program[1]}\n\`\`\`brainfuck\n${usrcfg.codes[program[1]].codetext}\n\`\`\``);
            }
        }
    }
}
