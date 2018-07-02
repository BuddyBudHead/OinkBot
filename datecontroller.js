var methods = {};

/**
 * Gets the current time
 */
methods.getCurrentTime = function(){
    return new Date().getTime();
 
 }

 /**
 * Gets the next Tuesday 7pm
 */
methods.getCountdownDate = function(){
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
    else {date.setDate(date.getDate() + (2 + 7 - date.getDay()) % 7);}
    var day = date.getUTCDate();
    var month = date.getUTCMonth()+1;
    var year = date.getUTCFullYear();
    var nexTuesday = month+"/"+day+"/"+year;
    //add 19 hours in seconds
    var nexTuesdayTimestamp = new Date(nexTuesday).getTime() + 68400000;
    
    //The next Tuesday 07.00pm
    return nexTuesdayTimestamp;
}

exports.data = methods;