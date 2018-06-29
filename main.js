const Discord = require('discord.js');
const filesystem = require('fs');
const config = JSON.parse(filesystem.readFileSync('config.json', 'utf8'));

var DiscordClient = new Discord.Client();
DiscordClient.login(config.token);

DiscordClient.on('ready', function(){
    console.log(DiscordClient.user.username + ": Gestartet.");
});

DiscordClient.on('message', function(message){
    // name of the bot
    console.log(DiscordClient.user.username + ": Kein Prefix erkannt.");

    var content = message.content,
        author  = message.member,
        channel = message.channel,
        guild   = message.guild
        DiscordClient.user.setActivity("with dicks."); 
        if(author.id != DiscordClient.user.id && content.startsWith(config.prefix)){
            console.log("oink");
            var currenTime = getCurrentTime();
            var countdownDate = getCountdownDate();
            var differenceTime = countdownDate - currenTime;

            console.log("jetzt: " + currenTime);
            console.log("n. Dienstag: " + countdownDate);
            console.log("Diffenzenz-TS: " + differenceTime);
            var days = Math.floor(differenceTime / (1000 * 60 * 60 * 24));
            var hours = Math.floor((differenceTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((differenceTime % (1000 * 60)) / 1000);


            channel.send("Es dauert noch " + days +" Tage " + hours + " Stunden " + minutes + " Minuten und " + seconds + " Sekunden bis zum nächsten Schweinegeräusch :3")
            .catch(console.error); // add error handling here

        }
});

function getCurrentTime(){
   return new Date().getTime();

}

function getCountdownDate(){
    var date = new Date();

    //tuesday - before 7pm
    if(date.getDay() == 2 && date.getHours >=19){
        date.setDate(date.getDate() + (2 + (7 - date.getDay()) % 7));
    }
    //tuesday - after 7pm
    if(date.getDay() == 2 && date.getHours <19){
        date.setDate(date.getDate() + 2 + (7 - date.getDay()) % 7);
    }
    //every other day
    else {date.setDate(date.getDate() + (2 + (7 - date.getDay()) % 7));}
    var day = date.getUTCDate();
    var month = date.getUTCMonth()+1;
    var year = date.getUTCFullYear();
    var nexTuesday = month+"/"+day+"/"+year;
    //add 19 hours in seconds
    var nexTuesdayTimestamp = new Date(nexTuesday).getTime() + 68400000;
    
    //The next Tuesday 07.00pm
    return nexTuesdayTimestamp;
}