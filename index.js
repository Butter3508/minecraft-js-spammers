const mineflayer = require('mineflayer');
const config = require('./config.json');
const ms = require('ms');
const crypto = require('crypto')

if (config.general.webServer) require('./butter/webServer')();
switch (config.general.multi) {
  case true:
    runMulti(10);
    break;
  case false:
    runSingle();
    break;
}


function runSingle() {
  const bot = mineflayer.createBot({
    host: config.general.host,
    port: !config.general.port ? 25565 : config.general.port,
    username: config.general.username,
    hideErrors: true
  });

  bot.on('spawn', () => {
    console.log('[Bot] Connected to ' + config.general.host);
  });

  if (config.login.use) require('./butter/login')(bot);

  bot.on('spawn', () => {
    require('./butter/spamming')(bot);
  })

  bot.on('messagestr', (msg) => {
    console.log(msg)
    if (msg.trim() == '') return;
    if (msg.trim() == 'dùng lệnh/anarchyvn để vào server Anarchy.') {
      bot.chat('/anarchyvn')
    }
  })

  bot.on('end', () => {
    runSingle()
  })
}

function runMulti() {
  setInterval(() => {
    const bot = mineflayer.createBot({
      host: config.general.host,
      port: !config.general.port ? 25565 : config.general.port,
      username: `${config.general.prefixMulti}${crypto.randomBytes(2).toString('hex')}`,
      hideErrors: true
    });
    
    bot.on('spawn', () => {
      console.log('[Bot] Connected to ' + config.general.host);
    });
  
    if (config.login.use) require('./butter/login')(bot);
  
    bot.on('spawn', () => {
      require('./butter/spamming')(bot);
    })
  
    bot.on('messagestr', (msg) => {
      if (msg.trim() == '') return;
      if (msg.trim() == 'dùng lệnh/anarchyvn để vào server Anarchy.') {
        bot.chat('/anarchyvn')
      }
    })

    bot.on('end', () => {
      runMulti(`${config.general.prefixMulti}${crypto.randomBytes(2).toString('hex')}`)
    })
  }, 3 * 1000)
}