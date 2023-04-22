const { Embed, Attachment, Message, MessageReaction, User } = require("discord.js");
const { client } = require("../../index.js");
const { base } = require("../index");

module.exports = {
    /**
        * Send a message
        *
        * @param {string|Channel} channel channel destination (id or element)
        * @param {string} content message to send
        * @param {Embed[]} [embeds] embed to send
        * @param {Attachment[]} [attachments] attachment to send 
        */
    sendch: function (channel, content, embeds = null, attachments = null) {

        let chdest = (typeof (channel) == "string") ? base.ch.get(channel) : channel;

        if (chdest == null) {
            console.log("Wrong channel ID");
            return 1;
        }
        if (content.length = 0)
            content = null;
        if (true || content != null || embeds != null || attachments != null)
            chdest.send({ content: content, files: attachments, embeds: embeds });
    },
    /**
        * reply to a message
        *
        * @param {Message} message message to reply
        * @param {string} content message to send
        * @param {Embed[]} [embeds] embed to send
        * @param {Attachment[]} [attachments] attachment to send 
        */
    reply: function (message, content, embeds = null, attachments = null) {
        if (content.length = 0)
            content = null;
        if (content != null || embeds != null || attachments != null)
            message.reply({ content: content, files: attachments, embeds: embeds });
    },
    /**
        *   
        *
        * @param {Message} message
        */
    onNew: function (message) {

    },
    /**
        *   
        *
        * @param {Message} message
        */
    onDel: function (message) {

    },
    /**
        *   
        *
        * @param {Message} oldmsg
        * @param {Message} newmsg
        */
    onUpdt: function (oldmsg, newmsg) {

    },
    /**
        *   
        *
        * @param {MessageReaction} reaction
        * @param {User} user
        */
    onReactAdd: function (reaction, user) {

    },
    /**
        *   
        *
        * @param {MessageReaction} reaction
        * @param {User} user
        */
    onReactRem: function (reaction, user) {

    },
};  