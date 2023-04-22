const { BaseInteraction, SlashCommandBuilder, REST, Routes, InteractionType } = require("discord.js");
const discord = require("discord.js");
const fs = require('fs');
const path = require('path');
const cfg = require('../../config/admin/config.json');
const dbgmsg = require('../../config/admin/debugmsg.json');
const bot = require('../');
const { client } = require('../../')

module.exports = {
    /**
     * Initialise interactions
     */
    init: function () {
        const commandlist = fs.readdirSync('./internals/commands/').filter(file => file.endsWith('.js'));
        const interactioncmd = [];

        client.cmds = new discord.Collection();

        const rest = new REST().setToken(process.env.TOKEN);
        let internb = 0;

        for (const file of commandlist) {
            const cmd = require(`../commands/${file}`);

            if (cmd.type == 'slash') {
                client.cmds.set(cmd.name, cmd);

                var slashbuildingcmd = new SlashCommandBuilder()
                    .setName(cmd.name)
                    .setDescription(cmd.description)

                if (cmd.options)
                    for (const optioncfg of cmd.options) {
                        if (optioncfg.type == "user")
                            slashbuildingcmd.addUserOption(option =>
                                option.setName(optioncfg.name)
                                    .setDescription(optioncfg.description)
                                    .setRequired(optioncfg.required))
                        if (optioncfg.type == "string")
                            slashbuildingcmd.addStringOption(option =>
                                option.setName(optioncfg.name)
                                    .setDescription(optioncfg.description)
                                    .setRequired(optioncfg.required))
                        else
                            bot.log.all(dbgmsg.interactions.unknownoption + cmd.name + ">" + optioncfg.type);
                    }
                internb++;
                interactioncmd.push(slashbuildingcmd)
            }
        }

        const commandslashjson = commandslash.map(command => command.toJSON());
        rest.put(Routes.applicationCommands(cfg.appId), { body: commandslashjson })
            .then(() => bot.log.all(dbgmsg.interactions.loaded + internb + " interactions"))
            .catch(console.error);
    },
    /**
        *   
        *
        * @param {BaseInteraction} interaction interaction element
        */
    on: function (interaction) {

        if (client.cmds.has(interaction.name) && interaction.isCommand()) {
            const info = {
                interaction: interaction,
                channel: interaction.channel.id,
                user: interaction.user,
                member: interaction.member
            }
            client.cmds.get(interaction.name).execute(info);
        }
        else
            interaction.reply({ content: "Not working for the moment..." + interactionReply, ephemeral: true })
    },
    /**
        * Reply to interaction
        *
        * @param {InteractionType} interaction interaction to reply
        * @param {string} content message to send
        * @param {Embed[]} [embeds] embed to send
        * @param {Attachment[]} [attachments] attachment to send 
        * @param {boolean} ephemeral
        */
    reply: function (interaction, content, embeds = null, attachments = null, ephemeral = true) {
        if (content.length > 0)
            content = null;
        if (content != null || embeds != null || attachments != null)
            interaction.reply({ content: content, files: attachments, embeds: embeds, ephemeral: ephemeral });
    },
}
