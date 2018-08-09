const Discord = require('discord.js');
const filesystem = require('fs');
const datecontroller = require('./datecontroller.js');
const soundcontroller = require('./soundcontroller.js')
const config = JSON.parse(filesystem.readFileSync('config.json', 'utf8'));

var DiscordClient = new Discord.Client();
DiscordClient.login(config.token);

var commands = {
        'flo'      : 'flo', 
        'flo-help' : 'flo-help',
        'oink'     : 'oink',
        'emoji'    : 'emoji',
        'hmm'      : 'hmm'
    };

DiscordClient.on('ready', function(){
    console.log(DiscordClient.user.username + ": Gestartet.");
    DiscordClient.user.setActivity("with dicks.");
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
        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix + commands['flo'])){

            var currenTime = datecontroller.data.getCurrentTime();
            var countdownDate = datecontroller.data.getCountdownDate();
            var differenceTime = countdownDate - currenTime;

            console.log("jetzt: " + currenTime);
            console.log("n. Dienstag: " + countdownDate);
            console.log("Diffenzenz-TS: " + differenceTime);

            datecontroller.data.generateTimerOutput(channel, differenceTime);

        }

        // handle the oink sound
        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix + commands['oink'])){
            soundcontroller.data.oink(voiceChannel, message);            
        }

        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix + commands['emoji'])){
        
            message.channel.send("<:eggblow:475692753200611352>");


        }

        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix + commands['hmm'])){
        
            message.channel.send("<:hmm:475702364960194570>");


        }
});



