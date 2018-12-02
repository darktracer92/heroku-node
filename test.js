const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '711433002:AAEKhBxnMRBRCDvTLDTtbL8adFV0AUqJtk4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
bot.onText(/^\/ban/, function(message) {
	// Easy way is use this command via reply, so:
	if (message.reply_to_message == undefined){
		// Not used via reply
		return;
	}
	var username = message.reply_to_message.from.username;
	var userid = message.reply_to_message.from.id;
	bot.getChatMember(message.chat.id, message.from.id).then(function(data) {
		if ((data.status == "creator") || (data.status == "administrator")){
			bot.kickChatMember(message.chat.id, userid).then(result => {
				bot.sendMessage(message.chat.id, username + " has been banned!");
			});
		}
	});
});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    messageId = msg.message_id;
    if ((msg.new_chat_participant) && (msg.new_chat_member) && (msg.new_chat_members)) {
        members = msg.new_chat_members;
        for (i = 0; i < members.length; i++) {
            message_content = 'Welcome, ';
            if (members[i].first_name) {
                message_content += members[i].first_name + ' ';
            }
            if (members[i].last_name) {
                message_content += members[i].last_name + ' ';
            }
            if (message_content != 'Welcome, ') {
                bot.sendMessage(chatId, message_content);
            }
        }
    }
});
bot.onText(/^\/unban/, function(message) {
	if (message.reply_to_message == undefined){
		return;
	}
	var username = message.reply_to_message.from.username;
	var userid = message.reply_to_message.from.id;
	bot.getChatMember(message.chat.id, message.from.id).then(function(data) {
		if ((data.status == "creator") || (data.status == "administrator")){
			bot.unbanChatMember(message.chat.id, userid).then(result => {
				bot.sendMessage(message.chat.id, username + " has been unbaned!");
			});
		}
	});
});
bot.on('message', (msg) => {
    chatId = msg.chat.id;
    messageId = msg.message_id;
    var fs = require('fs');
    if ((!msg.text) && (!msg.photo) && (!msg.video) && (!msg.document)) {
        bot.deleteMessage(chatId, messageId);
    }
});
bot.onText(/^\/restrict/, function(message) {
	if (message.reply_to_message == undefined){
		return;
	}
	var username = message.reply_to_message.from.username;
	var userid = message.reply_to_message.from.id;
	bot.getChatMember(message.chat.id, message.from.id).then(function(data) {
		if ((data.status == "creator") || (data.status == "administrator")){
			bot.restrictChatMember(message.chat.id, userid).then(result => {
				bot.sendMessage(message.chat.id, username + " has been restricted!");
			});
		}
	});
});
bot.onText(/^\/promote/, function(message) {
	if (message.reply_to_message == undefined){
		return;
	}
	var username = message.reply_to_message.from.username;
	var userid = message.reply_to_message.from.id;
	bot.getChatMember(message.chat.id, message.from.id).then(function(data) {
		if ((data.status == "creator") || (data.status == "administrator")){
			bot.promoteChatMember(message.chat.id, userid).then(result => {
				bot.sendMessage(message.chat.id, username + " has been unrestricted!");
			});
		}
	});
});