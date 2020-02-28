const util = require('./util.js')
const config = require('./config.js')

function ping(msg) {
	if (msg.content === 'Fa') {
		msg.channel.send('Do')
	}
}

module.exports = function(bot) {
	bot.on('message', msg => {
		if (util.is(msg.channel.id, [config.dbgChannel])) {
			ping(msg)
		}
	})
}