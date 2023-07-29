const mineflayer = require('mineflayer');
const { login } = require('../config.json');

/**
 * 
 * @param {mineflayer.Bot} bot 
 */
module.exports = (bot) => {
    switch (login.method.toLowerCase()) {
        case 'pin':
            bot.on('windowOpen', (window) => pinLogin(bot, window))
            break;
        case 'password':
            bot.on('spawn', passwordLogin);
            break;
    }
}

function pinLogin(bot, window) {
    const pin = login.pin.split(' ').map(Number);
    if (Number(window.slots.length) >= 45) {
        bot.simpleClick.leftMouse(pin[0])
        bot.simpleClick.leftMouse(pin[1])
        bot.simpleClick.leftMouse(pin[2])
        bot.simpleClick.leftMouse(pin[3])
    }
    if (Number(window.slots.length) >= 62) {
        bot.simpleClick.leftMouse(13);
    }
}

function passwordLogin(bot) {
    const password = login.password;
    bot.chat(`/register ${password} ${password}`);
    bot.chat(`/login ${password}`)
}