const { dscrd } = require("../")

module.exports = {
    name: 'bf',
    execute(info) {
        let splittedmsg = message.content.split("$");
        let bfres = base.bf.exe(splittedmsg[0], splittedmsg);
        if (bfres.mem[bfres.posMem])
            bfres.mem[bfres.posMem] = `**${bfres.mem[bfres.posMem]}**`;
        dscrd.message.sendch(info.channel,
            (bfres.success ? "Successfully executed in " : `**Error** occurred at character **${bfres.posProg}** after `)
            + bfres.step + " steps :"
            + ((bfres.str.length > 0) ? "\n```brainfuck\n" + bfres.str + "```" : "")
            + "\n [" + bfres.mem.join("|") + "]\nMemory frame n°" + bfres.posMem)
        console.log(bfres);

    }
}
