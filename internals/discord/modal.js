const { BaseInteraction, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, CommandInteraction } = require("discord.js");

const cfg = require('../../config/admin/config.json');
const dbgmsg = require('../../config/admin/debugmsg.json');

/**
 * @typedef {Object} inputModal
 * @property {string} customid
 * @property {string} label
 * @property {int} style 1 for short | 2 for paragraph
 * @property {string} placeholder
 * @property {string} value
 * @property {int} min
 * @property {int} max
 * @property {boolean} required if no error has occurred
 */

module.exports = {
    /**
        *  Create and show Modal
        *
        * @param {CommandInteraction} interaction interaction to answer
        * @param {string} customid
        * @param {string} title
        * @param {inputModal[]} inputs
        */
    create: async function (interaction, customid, title, inputs) {
        const modal = new ModalBuilder()
            .setCustomId(customid)
            .setTitle(title);

        for (const input of inputs) {
            const ModalInput = new TextInputBuilder()
                .setCustomId(input.customid)
                .setLabel(input.label)
                .setStyle(input.style)
                .setRequired(input.required)

            if (input.min > 0)
                ModalInput.setMinLength(input.min);
            if (input.max > 0)
                ModalInput.setMaxLength(input.max);
            if (input.placeholder != "")
                ModalInput.setPlaceholder(input.placeholder);
            if (input.value != "")
                ModalInput.setValue(input.value);

            const actionRow = new ActionRowBuilder().addComponents(ModalInput);
            modal.addComponents(actionRow);
        }

        await interaction.showModal(modal);
    },
}