const util = require('./util.js')
const config = require('./config.js')

function debugLog(bot, event, str) {
	let channel = bot.channels.get(config.dbgChannel)
	//util.debugSend(`[EVENT] ${event}${str?`\n\t${str}`:''}`)
	console.log(`[EVENT] ${event}${str?`\n\t${str}`:''}`)
}

function debug(bot) {
	bot.on('channelCreate', ()=>{
		debugLog(bot, 'channelCreate')
	})

	bot.on('channelDelete', ()=>{
		debugLog(bot, 'channelDelete')
	})

	bot.on('channelPinsUpdate', ()=>{
		debugLog(bot, 'channelPinsUpdate')
	})

	bot.on('channelUpdate', ()=>{
		debugLog(bot, 'channelUpdate')
	})

	bot.on('clientUserGuildSettingsUpdate', ()=>{
		debugLog(bot, 'clientUserGuildSettingsUpdate')
	})

	bot.on('clientUserSettingsUpdate', ()=>{
		debugLog(bot, 'clientUserSettingsUpdate')
	})

	bot.on('debug', (info)=>{
		debugLog(bot, 'debug', info)
	})

	bot.on('disconnect', ()=>{
		debugLog(bot, 'disconnect')
	})

	bot.on('emojiCreate', ()=>{
		debugLog(bot, 'emojiCreate')
	})

	bot.on('emojiDelete', ()=>{
		debugLog(bot, 'emojiDelete')
	})

	bot.on('emojiUpdate', ()=>{
		debugLog(bot, 'emojiUpdate')
	})

	bot.on('error', ()=>{
		debugLog(bot, 'error')
	})

	bot.on('guildBanAdd', ()=>{
		debugLog(bot, 'guildBanAdd')
	})

	bot.on('guildBanRemove', ()=>{
		debugLog(bot, 'guildBanRemove')
	})

	bot.on('guildCreate', ()=>{
		debugLog(bot, 'guildCreate')
	})

	bot.on('guildDelete', ()=>{
		debugLog(bot, 'guildDelete')
	})

	bot.on('guildIntegrationsUpdate', ()=>{
		debugLog(bot, 'guildIntegrationsUpdate')
	})

	bot.on('guildMemberAdd', ()=>{
		debugLog(bot, 'guildMemberAdd')
	})

	bot.on('guildMemberAvailable', ()=>{
		debugLog(bot, 'guildMemberAvailable')
	})

	bot.on('guildMemberRemove', ()=>{
		debugLog(bot, 'guildMemberRemove')
	})

	bot.on('guildMembersChunk', ()=>{
		debugLog(bot, 'guildMembersChunk')
	})

	bot.on('guildMemberSpeaking', ()=>{
		debugLog(bot, 'guildMemberSpeaking')
	})

	bot.on('guildMemberUpdate', ()=>{
		debugLog(bot, 'guildMemberUpdate')
	})

	bot.on('guildUnavailable', ()=>{
		debugLog(bot, 'guildUnavailable')
	})

	bot.on('guildUpdate', ()=>{
		debugLog(bot, 'guildUpdate')
	})

	bot.on('message', (msg)=>{
		if (msg.author.id === bot.user.id) return
		else debugLog(bot, 'message')
	})

	bot.on('messageDelete', ()=>{
		debugLog(bot, 'messageDelete')
	})

	bot.on('messageDeleteBulk', ()=>{
		debugLog(bot, 'messageDeleteBulk')
	})

	bot.on('messageReactionAdd', ()=>{
		debugLog(bot, 'messageReactionAdd')
	})

	bot.on('messageReactionRemove', ()=>{
		debugLog(bot, 'messageReactionRemove')
	})

	bot.on('messageReactionRemoveAll', ()=>{
		debugLog(bot, 'messageReactionRemoveAll')
	})

	bot.on('messageUpdate', ()=>{
		debugLog(bot, 'messageUpdate')
	})

	bot.on('presenceUpdate', ()=>{
		debugLog(bot, 'presenceUpdate')
	})

	bot.on('rateLimit', ()=>{
		debugLog(bot, 'rateLimit')
	})

	bot.on('ready', ()=>{
		debugLog(bot, 'ready')
	})

	bot.on('reconnecting', ()=>{
		debugLog(bot, 'reconnecting')
	})

	bot.on('resume', ()=>{
		debugLog(bot, 'resume')
	})

	bot.on('roleCreate', ()=>{
		debugLog(bot, 'roleCreate')
	})

	bot.on('roleDelete', ()=>{
		debugLog(bot, 'roleDelete')
	})

	bot.on('roleUpdate', ()=>{
		debugLog(bot, 'roleUpdate')
	})

	bot.on('typingStart', ()=>{
		debugLog(bot, 'typingStart')
	})

	bot.on('typingStop', ()=>{
		debugLog(bot, 'typingStop')
	})

	bot.on('userNoteUpdate', ()=>{
		debugLog(bot, 'userNoteUpdate')
	})

	bot.on('userUpdate', ()=>{
		debugLog(bot, 'userUpdate')
	})

	bot.on('voiceStateUpdate', ()=>{
		debugLog(bot, 'voiceStateUpdate')
	})

	bot.on('warn', ()=>{
		debugLog(bot, 'warn')
	})

	bot.on('webhookUpdate', ()=>{
		debugLog(bot, 'webhookUpdate')
	})

}

module.exports = debug