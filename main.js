const Discord = require('discord.js')
const auth = require('./auth.json')
const mongoose = require('mongoose')

const bot = new Discord.Client()

const spamChannel = '678957008921165825'
const cmdChannel = '678952437641641984'

//Schemas

const userSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true
	},
	exp: {
		type: Number,
		required: true,
		set: v => Math.round(v)
	}
})

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`)
	mongoose.connect(auth.dbUrl,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
		if (err) console.error(`MongoDB connection error: ${err}`)
		else console.log('Connected to MongoDB successfully.')
	})
});

// general function
function is(target, arr) {
	let flag = false
	arr.forEach((e,i,a)=>{
		if (target === e) flag = true
	})
	return flag
}

function not(target, arr) {
	let flag = true
	arr.forEach((e,i,a)=>{
		if (target === e) flag = false
	})
	return flag
}

// add Exp
function addExp(msg) {
	var incr = msg.content.length
	let User = mongoose.model('User', userSchema)
	User.findOneAndUpdate({userId: msg.author.id}, {$inc: {exp: incr}},
		{upsert: true, new: true}, (err,doc)=>{
		if (err) console.error(`Update Users error: ${err}`)
		else console.log(`> ${msg.author.id} + ${incr} EXP => ${doc.exp} EXP.`)
		if (is(msg.channel.id, [cmdChannel, spamChannel])) {
			msg.channel.send(`${msg.author} 經驗值增加了${incr}，目前經驗值為${doc.exp}。`)
		}
	})
}

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
	// Ignore bot messages.
	if (msg.author.bot) return

	// TODO  add noxp channel
	if (is(msg.channel.type, ['text'])) addExp(msg)

	// command channel & spamming channel
	if (is(msg.channel.id, [cmdChannel, spamChannel])) {
		ping(msg)
		if (msg.content === '!count') count(msg)
	}

});

bot.login(auth.token)