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
        'oink'     : 'oink'
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
        voiceChannel = message.member.voiceChannel
 
        // handle the countdown
        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix + commands['flo'])){

            var currenTime = datecontroller.data.getCurrentTime();
            var countdownDate = datecontroller.data.getCountdownDate();
            var differenceTime = countdownDate - currenTime;

            console.log("jetzt: " + currenTime);
            console.log("n. Dienstag: " + countdownDate);
            console.log("Diffenzenz-TS: " + differenceTime);

            generateTimerOutput(channel, differenceTime);

        }

        // handle the oink sound
        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix + commands['oink'])){

            const permissions = voiceChannel.permissionsFor(message.client.user);

           if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');

           if (!permissions.has('CONNECT')) {
               return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
           }
           if (!permissions.has('SPEAK')) {
               return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
            }

            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile('./floink.mp3');
  
                dispatcher.on('end', end => {
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));            
        }
});

/**
 * Calculate the time to go and send it to channel
 * @param {*} timeDifference 
 */
function generateTimerOutput(channel ,timeDifference){
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    channel.send("Es dauert noch " + days +" Tage " + hours + " Stunden " + minutes + " Minuten und " + seconds + " Sekunden bis zum nächsten Schweinegeräusch :3")
    .catch(console.error); // add error handling here
}

