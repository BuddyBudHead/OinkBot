const Discord = require('discord.js');
const filesystem = require('fs');
const datecontroller = require('./datecontroller.js');
const soundcontroller = require('./soundcontroller.js')
const commandcontroller = require('./commandcontroller.js')

const config = JSON.parse(filesystem.readFileSync('config.json', 'utf8'));

var DiscordClient = new Discord.Client();
DiscordClient.login(config.token);

var commands = {
        'cmd'       : 'cmd', 
        'flo'       : 'flo', 
        'flo-help'  : 'flo-help',
        'oink'      : 'oink',
        'dick'      : 'dick',
        'hmm'       : 'hmm'
    };

DiscordClient.on('ready', function(){
    console.log(DiscordClient.user.username + ": Gestartet.");
    DiscordClient.user.setActivity("type .cmd for command list");
});

DiscordClient.on('message', function(message){
    // name of the bot
    console.log(DiscordClient.user.username + ": Kein Prefix erkannt.");

    var content      = message.content,
        author       = message.member,
        channel      = message.channel,
        guild        = message.guild,
        voiceChannel = author.voiceChannel

    console.log(voiceChannel);

        // handle the countdown
        if(author.id != DiscordClient.user.id ){

            switch(content.startsWith(content)) {

                case content.startsWith(config.prefix + commands['cmd']):
                    commandcontroller.data.showCommands(channel);
                    break;

                case content.startsWith(config.prefix + commands['flo']):
                    datecontroller.data.triggerCountDown(channel);
                    break;

                case content.startsWith(config.prefix + commands['oink']):
                    soundcontroller.data.oink(voiceChannel, message);
                    break;

                case content.startsWith(config.prefix + commands['dick']):
                    message.channel.send("<:eggblow:475692753200611352>");
                    break;

                case content.startsWith(config.prefix + commands['hmm']):
                    message.channel.send("<:hmm:475702364960194570>");
                    break;              
            }
         }
});



