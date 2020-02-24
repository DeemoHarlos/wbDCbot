const Discord = require('discord.js')
const auth = require('./auth.json')

const bot = new Discord.Client()

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`)
});

// ping
function ping(msg) {
	if (msg.content === 'Fa') {
		msg.channel.send('Do')
	}
}

//count message
function count(msg) {
	msg.channel.send(`計算中...`)
	async function totalMessages(channel) {
		let total = 0
		let lastId = 0
		const max = 100
		let options = { limit: max }

		while (true) {
			if (lastId) options.before = lastId
			const messages = await channel.fetchMessages(options)
			total += messages.size
			lastId = messages.last().id
			if (messages.size < max) break
		}
		return total
	}
	totalMessages(msg.channel).then(count => {
		msg.channel.send(`這個頻道有 ${count} 個訊息。`)
	})
}

bot.on('message', msg => {


	// command channel & spamming channel
	if (msg.channel.id === '678952437641641984' || 
	    msg.channel.id === '678957008921165825') {

		ping(msg)
		else if (msg.content === '!count') count(msg)

	}
});

bot.login(auth.token)