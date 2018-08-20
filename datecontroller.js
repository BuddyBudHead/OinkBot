var methods = {};

/**
 * Show the countdown
 */
methods.triggerCountDown = function(channel){
    var currenTime = getCurrentTime();
    var countdownDate = getCountdownDate();
    var differenceTime = countdownDate - currenTime;

    console.log("jetzt: " + currenTime);
    console.log("n. Dienstag: " + countdownDate);
    console.log("Diffenzenz-TS: " + differenceTime);

    generateTimerOutput(channel, differenceTime);
 }



/**
  * Gets the current time
  */
function getCurrentTime(){
    return new Date().getTime();
 
 }

 /**
  * Gets the next Tuesday 7pm
  */
function getCountdownDate(){
    var date = new Date();
    console.log(date.getDay());
    console.log(date.getHours());

    //tuesday - before 7pm
    if(date.getDay() == 2 && date.getHours() <19){
        console.log("Dienstag vor 19 Uhr");
        date.setDate(date.getDate() + (2 + 7 - date.getDay()) % 7);
    }
    //tuesday - after 7pm
    if(date.getDay() == 2 && date.getHours() >=19){
        console.log("Dienstag nach 19 Uhr");
        date.setDate(date.getDate() + 2 + 7 - date.getDay()) % 7;
    }
    //every other day
    if(date.getDay() != 2) {
        console.log("kein Dienstag"); 
        date.setDate(date.getDate() + (2 + 7 - date.getDay()) % 7);
    }
    var day = date.getUTCDate();
    var month = date.getUTCMonth()+1;
    var year = date.getUTCFullYear();
    var nexTuesday = month+"/"+day+"/"+year;
    console.log(nexTuesday);
    //add 19 hours in seconds
    var nexTuesdayTimestamp = new Date(nexTuesday).getTime() + 68400000;
    
    //The next Tuesday 07.00pm
    return nexTuesdayTimestamp;
}

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

exports.data = methods;