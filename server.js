const Game = require('./BA_Game.js');

const express = require('express')
const app = express();
const server = app.listen(80, () => {
	console.log('listening on 147.229.217.105:80');
  });

app.use(express.static('public'));
  
const socket = require('socket.io');
var soc = socket(server);


soc.on('connection', socket => {
	console.log('New connection: ' + socket.id);
	// ---------------------- API ------------------------
	socket.on('UPDATE', player_update);
	socket.on('CHAT', chat_in)
	socket.on('disconnect', onDisconnect);
	// ---------------------------------------------------
});

console.log("Server started...");


/** Game object that holds all game.*/
const game = new Game();

/**
 * Called when some player sends his update state.
 * @param {PlayerState} newPlayerState  New player state
 */
function player_update(newPlayerState) {
	game.player_update(this, newPlayerState);
}

/**
 * Called when some player sends new message to chat.
 * @param {String} message 
 */
function chat_in(message) {
	game.chat_in(this, message);
}

/**
 * Called when some player disconnects.
 */
function onDisconnect() {
	game.deletePlayer(this);
 }
