const util = require('./util.js')
const config = require('./config.js')

const userSchema = require('./schemas/user.js')
const channelSchema = require('./schemas/channel.js')

function addExp(msg, bot, db) {
	let Channel = db.model('Channel', channelSchema)
	Channel.findOne({channelId: msg.channel.id}, (err,doc)=>{
		if (err) util.debugSend(`Find Channels error: ${err}`, bot.channels.get(config.dbgChannel))
		else if (!doc || doc.expRatio <= 0) return
		else {
			var incr = msg.content.length * doc.expRatio
			let User = db.model('User', userSchema)
			User.findOneAndUpdate({userId: msg.author.id}, {$inc: {exp: incr}},
				{upsert: true, new: true}, (err,doc)=>{
				if (err) util.debugSend(`Update Users error: ${err}`, bot.channels.get(config.dbgChannel))
				else if (msg.channel.id === config.dbgChannel)
					msg.channel.send(`${msg.author} 經驗值增加了${incr}，目前經驗值為${doc.exp}。`)
			})
		}
	})
}

function addExpTo(msg, bot, db) {
	let words = msg.content.split(' ')
	var incr = Number(words[2])
	if (!msg.mentions.members.size || !(incr > 0)) {
		msg.channel.send(`Invalid arguments. Usage: \`!add exp [EXP] [member]\` where EXP is a positive integer.`)
	} else msg.mentions.members.tap(member=>{
		if (member.user.bot) util.debugSend(`不能對機器人 (${member}) 增加經驗值。`, msg.channel)
		else {
			let User = db.model('User', userSchema)
			User.findOneAndUpdate({userId: member.id}, {$inc: {exp: incr}},
				{upsert: true, new: true}, (err,doc)=>{
				if (err) util.debugSend(`Update Users error: ${err}`, msg.channel)
				else util.debugSend(`${member} 經驗值增加了${incr}，目前經驗值為${doc.exp}。`, msg.channel)
			})
		}
	})
}

function setChannelExp(msg, bot, db) {
	var words = msg.content.split(' ')
	var r = Number(words[2])
	if (!msg.mentions.channels.size || !(r>=0 && r<1000)) {
		msg.channel.send(`Invalid arguments. Usage: \`!set exp [ratio] [channels]\` where ratio is a non negative integer less than 1000`)
	} else msg.mentions.channels.tap(ch => {
		let Channel = db.model('Channel', channelSchema)
		Channel.findOneAndUpdate({channelId: ch.id}, {expRatio: r},
			{upsert: true, new: true}, (err,doc)=>{
			if (err) util.debugSend(`Update Channels error: ${err}`, msg.channel)
			else util.debugSend(`成功更動 ${ch} 頻道經驗值比率為 ${doc.expRatio}。`, msg.channel)
		})
	})
}

function listChannelExp(msg, bot, db) {
	let Channel = db.model('Channel', channelSchema)
	Channel.find((err, docs)=>{
		if (err) util.debugSend(`Find Channels error: ${err}`, bot.channels.get(config.dbgChannel))
		else {
			var str = '**[ 各頻道經驗值比率列表 ]**\n'
			docs.slice(0,100).forEach((e,i,a)=>{
				str += `${bot.channels.get(e.channelId)} : ${e.expRatio}\n`
			})
			msg.channel.send(str)
		}
	})
}

function initExp(msg, bot, db) {
	var incr = config.wbRoleExp
	let role = bot.guilds.get(config.guildId).roles.get(config.wbRole)
	msg.channel.send(`Warning : Use this only once, unless you have reset EXP.`)
	msg.channel.send(`Adding ${incr} EXP to all ${role.name}. Check console for details and errors.`)
	role.members.tap(member=>{
		if (member.user.bot) return
		let User = db.model('User', userSchema)
		User.findOneAndUpdate({userId: member.id}, {$inc: {exp: incr}},
			{upsert: true, new: true}, (err,doc)=>{
			if (err) util.debugSend(`Update Users error: ${err}`, msg.channel)
			else console.log(`> ${member.user.tag} + ${incr} EXP => ${doc.exp} EXP.`)
		})
	})
}

function showExp(msg, bot, db) {
	let target = msg.mentions.members.size ? msg.mentions.members.first() : msg.member
	let User = db.model('User', userSchema)
	User.findOne({userId: target.id}, (err,doc)=>{
		if (err) util.debugSend(`Find Users error: ${err}`, msg.channel)
		else msg.channel.send(`${target} 有 ${doc?doc.exp:0} 經驗值。`)
	})
}

module.exports = function(bot, db) {
	bot.on('message', msg => {
		// Ignore bot messages and non-guild messages.
		if (!util.checkMember(msg)) return

		// add exp auto
		if (util.is(msg.channel.type, ['text'])) addExp(msg, bot, db)

		// set channel exp ratio
		if (util.cmd(msg, '!set expRatio'))
			if (util.checkAdmin(msg) && util.checkChannel(msg))
				setChannelExp(msg, bot, db)

		// list exp ratio
		if (util.cmd(msg, '!show expRatio'))
			if (util.checkChannel(msg)) listChannelExp(msg, bot, db)

		// init exp
		if (util.cmd(msg, '!init exp'))
			if (util.checkAdmin(msg) && util.checkChannel(msg))
				initExp(msg, bot, db)

		// add exp manual
		if (util.cmd(msg, '!add exp'))
			if (util.checkAdmin(msg) && util.checkChannel(msg))
				addExpTo(msg, bot, db)

		// show exp
		if (util.cmd(msg, '!show exp'))
			if (util.checkChannel(msg))
				showExp(msg, bot, db)
	})

}