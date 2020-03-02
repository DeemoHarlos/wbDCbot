const util = require('./util.js')
const config = require('./config.js')

const note = ['C','D','E','F','G','A','B']
const noteName = ['Do','Re','Mi','Fa','So','La','Si']

function ping(msg) {
	if (util.is(msg.content, note))
		msg.channel.send(util.random(note))
	if (util.is(msg.content, noteName))
		msg.channel.send(util.random(noteName))
}

module.exports = function(bot) {
	// Ignore bot messages.
	bot.on('message', msg => {
		if (msg.author.bot) return
		if (util.checkChannel(msg))
			ping(msg)
	})
}