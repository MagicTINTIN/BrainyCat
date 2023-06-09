const stepLimit = 100000;
const debugbf = false;
/**
 * @typedef {Object} bfreturn
 * @property {string} code cleaned code
 * @property {int} step step number
 * @property {string} str string output
 * @property {int[]} mem memory
 * @property {boolean} success if no error has occurred
 * @property {int} posProg program position
 * @property {int} posMem memory frame
 */

const filemgr = require("../../tools/file");

String.prototype.cleantobfx = function () {
    cleaned = this.match(/[\[\]\<\>\.\,\+\-]|\{[^\}]*\}+/g)
    return (cleaned != null) ? cleaned.join("") : "" // /[^\+\-\[\]\<\>\,\.]+/g to only exclude +-<>[].,
}

function replaceFcts(code) {
    //console.log("cleaning", code);
    const toreplace = code.match(/\{[^\}]*\}+/g);

    if (toreplace != null) {
        for (const fct of toreplace) {
            const fctobj = fct.split("{").join("").split("}").join("").split(".")

            let usrcfg = filemgr.ldUsrCfg(fctobj[0], false);

            if (!usrcfg || !usrcfg.codes || !usrcfg.codes[fctobj[1]] || usrcfg.codes[fctobj[1]].rights == "private" || !usrcfg.codes[fctobj[1]].codeclean)
                code = code.split(`${fct}`).join("")
            else
                code = code.split(`${fct}`).join(usrcfg.codes[fctobj[1]].codeclean)
        }
        return replaceFcts(code);
    }
    else
        return code;
}

function cleanMem(mem) {
    while (mem.length > 1 && mem[mem.length - 1] == 0) {
        mem.pop();
    }
    return mem;
}

/**
        * Returns what have been imported
        *
        * @param {string} rawcode to be executed
        * @param {string[]} args will be the inputs
        * @return {bfreturn} brainfuck execution
        */
function exe(rawcode, args) {
    let code = replaceFcts(rawcode.cleantobfx());
    let res = {
        code: code.cleantobfx(),
        step: 0,
        str: "",
        mem: [0],
        success: true,
        posProg: 0,
        posMem: 0,
    }
    let argnb = 1;
    while (res.posProg >= 0 && res.posProg < code.length && res.step < stepLimit) {
        const cmd = code[res.posProg];
        res.step++;
        if (cmd == "[") {
            if (debugbf) console.log("[ pointing", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] == 0) {
                let loopnb = 1;
                while (loopnb > 0) {
                    res.posProg++;
                    if (code[res.posProg] == "[") {
                        loopnb++;
                    } else if (code[res.posProg] == "]") {
                        loopnb--;
                    }
                }
            }
        }
        else if (cmd == "]") {
            if (debugbf) console.log("] pointing", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] != 0) {
                let loopnb = 1;
                while (loopnb > 0) {
                    res.posProg--;
                    if (code[res.posProg] == "[") {
                        loopnb--;
                    } else if (code[res.posProg] == "]") {
                        loopnb++;
                    }
                }
            }
        }
        else if (cmd == "." && res.mem[res.posMem] >= 32) {
            if (debugbf) console.log(res.mem[res.posMem], String.fromCharCode(res.mem[res.posMem]))
            res.str += String.fromCharCode(res.mem[res.posMem]);
        }
        else if (cmd == ",") {
            if (debugbf) console.log("get", argnb, args);
            if (args[argnb])
                res.mem[res.posMem] = args[argnb].charCodeAt(0);
            argnb++;
        }
        else if (cmd == ">") {
            res.posMem++;
            if (!res.mem[res.posMem])
                res.mem[res.posMem] = 0;
            if (debugbf) console.log("pointing", res.posMem, res.mem[res.posMem]);
        }
        else if (cmd == "<") {
            if (res.posMem > 0)
                res.posMem--;
            else {
                res.success = false;
                res.mem = cleanMem(res.mem);
                res.str += "\n**ERROR :** Cursor tried to go before first memory frame";
                return res;
            }
        }
        else if (cmd == "+") {
            if (debugbf) console.log("adb", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] >= 255)
                res.mem[res.posMem] = 0;
            else
                res.mem[res.posMem]++;
            if (debugbf) console.log("ada", res.posMem, res.mem[res.posMem]);
        }
        else if (cmd == "-") {
            if (debugbf) console.log("rmb", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] <= 0)
                res.mem[res.posMem] = 255;
            else
                res.mem[res.posMem]--;
            if (debugbf) console.log("rma", res.posMem, res.mem[res.posMem]);
        }
        res.posProg++;
    }
    res.mem = cleanMem(res.mem);

    if (res.step >= stepLimit) {
        res.success = false;
        res.str += "\n**ERROR :** Too many steps";
    }
    return res;
}
module.exports = { exe };