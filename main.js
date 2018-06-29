const Discord = require('discord.js');
const filesystem = require('fs');
const datecontroller = require('./datecontroller.js')
const config = JSON.parse(filesystem.readFileSync('config.json', 'utf8'));

var DiscordClient = new Discord.Client();
DiscordClient.login(config.token);

DiscordClient.on('ready', function(){
    console.log(DiscordClient.user.username + ": Gestartet.");
    DiscordClient.user.setActivity("with dicks.");
});

DiscordClient.on('message', function(message){
    // name of the bot
    console.log(DiscordClient.user.username + ": Kein Prefix erkannt.");

    var content = message.content,
        author  = message.member,
        channel = message.channel,
        guild   = message.guild
 
        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix)){
            console.log("oink");
            var currenTime = datecontroller.data.getCurrentTime();
            var countdownDate = datecontroller.data.getCountdownDate();
            var differenceTime = countdownDate - currenTime;

            console.log("jetzt: " + currenTime);
            console.log("n. Dienstag: " + countdownDate);
            console.log("Diffenzenz-TS: " + differenceTime);

            generateTimerOutput(channel, differenceTime);

           

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

