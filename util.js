const config = require('./config.js')

module.exports = {
	is: function(target, arr) {
		let flag = false
		arr.forEach((e,i,a)=>{
			if (target === e) flag = true
		})
		return flag
	},
	not: function(target, arr) {
		let flag = true
		arr.forEach((e,i,a)=>{
			if (target === e) flag = false
		})
		return flag
	},
	random: function(arr) {
		let i = Math.floor(Math.random() * arr.length)
		return arr[i]
	},
	cmd: function(msg, cmd) {
		return (msg.content === cmd) ||
		       (msg.content.slice(0, cmd.length+1) === (cmd+' ' )) ||
		       (msg.content.slice(0, cmd.length+1) === (cmd+'\n'))
	},
	debugSend: function(err, ch) {
		if (ch) ch.send(err)
		else console.log(err)
	},
	checkAdmin: function(msg) {
		if (!msg.member.roles.has(config.adminRole)) {
			msg.channel.send('此功能僅限管理原使用。')
			return false
		} else return true
	},
	checkChannel: function(msg) {
		if (!this.is(msg.channel.id, config.availChannels)) {
			msg.channel.send('此功能不可在此頻道使用。')
			return false
		} else return true
	},
	checkMember: function(msg) {
		return !msg.author.bot && msg.guild
	}
}