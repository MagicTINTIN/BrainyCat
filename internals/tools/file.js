const fs = require('fs');
const path = require('path');
const { client } = require("../../index");
const debugmsg = require("../../config/admin/debugmsg.json");
const cfgVersion = 1.0;

module.exports = {
    /**
        * Load user config
        *
        * @param {string} pseudo the user id you want to load config
        * @param {boolean} muted to mute loading messages (default = false)
        */
    ldUsrCfg: function (pseudo, muted = false) {
        const { bot } = require('../../');

        if (client.usrdata && client.usrdata.get(pseudo))
            return client.usrdata.get(pseudo)

        try { // Loading previous if it exists
            var previousfile = JSON.parse(fs.readFileSync(path.resolve(`./config/users/${pseudo}.json`)));
            if (!muted) bot.log.all(debugmsg.tools.file.caching + " userCfg : " + pseudo)
            client.usrdata.get(pseudo) = previousfile;
            return previousfile;
        } catch (err) {
            if (!muted) bot.log.all(debugmsg.tools.file.nofile + " userCfg : " + pseudo);

            const datetime = Date.now();

            var userCfgJSON = {
                id: undefined,
                pseudo: pseudo,
                version: cfgVersion,
                codes: {},
                other: {}
            }
            return userCfgJSON;
        }

    },
    /**
        * Save user config
        *
        * @param {string} pseudo the pseudo you want to save config
        * @param {Object} jsondata the user id you want to save config
        * @param {boolean} muted to mute saving messages (default = false)
        */
    svUsrCfg: function (pseudo, jsondata, muted = false) {
        const { bot } = require('../../');

        client.usrdata.set(pseudo, jsondata);
        // export new file
        const jsonStringcfg = JSON.stringify(jsondata);
        fs.writeFile(`./config/users/${pseudo}.json`, jsonStringcfg, err => {
            if (err) {
                if (!muted) {
                    bot.log.all(debugmsg.tools.file.errsaving + pseudo);
                    bot.alert.err(err);
                }
            } else {
                if (!muted) bot.log.all(debugmsg.tools.file.saving + pseudo);
            }

        })
    },


    /**
        * Load user list
        *
        * @param {boolean} muted to mute loading messages (default = false)
        */
    ldUsrLst: function (muted = false) {
        const { bot } = require('../../');

        if (client.usrdata && client.usrdata.get('usrs'))
            return client.usrdata.get('usrs')

        try { // Loading previous if it exists
            var previousfile = JSON.parse(fs.readFileSync(path.resolve(`./config/users/usrs.json`)));
            if (!muted) bot.log.all(debugmsg.tools.file.caching + " userCfg : " + 'usrs')
            client.usrdata.set('usrs', previousfile);
            return previousfile;
        } catch (err) {
            if (!muted) bot.log.all(debugmsg.tools.file.nofile + " userCfg : " + 'usrs');

            const datetime = Date.now();

            var userCfgJSON = {
                id: undefined,
                version: cfgVersion,
                usrs: {}
            }
            return userCfgJSON;
        }

    },
    /**
        * Save user list
        *
        * @param {Object} jsondata the user id you want to save config
        * @param {boolean} muted to mute saving messages (default = false)
        */
    svUsrLst: function (jsondata, muted = false) {
        const { bot } = require('../../');

        client.usrdata.set('usrs', jsondata);
        // export new file
        const jsonStringcfg = JSON.stringify(jsondata);
        fs.writeFile(`./config/users/usrs.json`, jsonStringcfg, err => {
            if (err) {
                if (!muted) {
                    bot.log.all(debugmsg.tools.file.errsaving + 'usrs');
                    bot.alert.err(err);
                }
            } else {
                if (!muted) bot.log.all(debugmsg.tools.file.saving + 'usrs');
            }

        })
    },
}