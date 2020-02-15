const tmi = require('tmi.js');
const config = require('./config')

const opts = {
  identity: {
    username: config.BOT_USERNAME,
    password: config.BOT_OAUTH_TOKEN
  },
  channels: [
    config.BOT_CHANNELNAME
  ]
};

let onMessageHandler = (target, context, msg, self) => {
	let split = msg.split(" ");
	if (split.length != 2) return;

	if (message.startsWith('/register')) //Streamer will register their ID with the bot first, so it can cache it, so viewers don't need to type it in
		clientID = split[1];

  	else queue.push({});
};

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.connect();
let queue = [];
let clientID;

const makeReq = effect => {
    let options = {
        method: 'POST',
        uri: `https://stg-api.monotron.me/${clientID}/effects`,
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        body: {
            "effect": effect,
        }
    };

    rp(options).then(() => { return effect; })
    .catch(err => { console.error(err); });
};

setInterval(() => {
	if (queue.length > 0 && clientID) makeReq(queue.shift());
}, 1000);