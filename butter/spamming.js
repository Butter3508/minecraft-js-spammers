const mineflayer = require('mineflayer');
const { config } = require('../config.json');
const ms = require('ms')
const crypto = require('crypto');

/**
 * 
 * @param {mineflayer.Bot} bot 
 */
module.exports = (bot) => {
    setInterval(() => {
        let msg = config.messages[Math.floor(Math.random() * config.messages.length)];
        if (config.randomSuffix) {
            msg += ` | [${crypto.randomBytes(5).toString('hex')}]`;
        };

        bot.chat(msg);

    }, config.interval * 1000)
}