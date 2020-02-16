const config = require('./config')
const Discord = require('discord.js')
const rp = require('request-promise')
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let queue = [];
let clientID;
let PREFIX = '$';

let handleMessage = content => {
	let split = content.split(" ");
	if (split.length != 2) return;
	if (!content.startsWith(PREFIX + 'register')) return;
	if (!content.startsWith(PREFIX + 'stg')) return;

	if (content.startsWith(PREFIX + 'register')) //Streamer will register their ID with the bot first, so it can cache it, so viewers don't need to type it in
		clientID = split[1];

  	else queue.push(split[1]);
};

const makeReq = effect => {
    let options = {
        method: 'PUT',
        uri: `https://stg-api.monotron.me/frontend/effects/${clientID}?effectName=${effect}`,
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

client.on('message', msg => {
	handleMessage(msg.content);
});

client.login(config.BOT_CLIENT_TOKEN);