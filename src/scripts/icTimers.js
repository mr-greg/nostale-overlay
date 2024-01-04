//icTimer faut la lancer toutes les heures

function icTimer(data) {
    var now = new Date();
    console.log(data);
  
    function icCalc(){
        var hoursString = "0";
        var minutesString = "0";
        var timeLeft = nextIc - now;
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
        hours.toString().length == 1 ? hoursString += hours.toString() : hoursString = hours.toString();
        minutes.toString().length == 1 ? minutesString += minutes.toString() : minutesString = minutes.toString();
        icP.innerHTML = hoursString + ":" + minutesString


        if (data.notifIc == true) {
            console.log("notifIc true");
            const data = new Object;
            data.event = "IC";
            data.img = "ic";

            if (hours == 0 && minutes == 30) {
                data.time = 30;
                window.electronAPI.alertNotif(data);
            } else if (hours == 0 && minutes == 5) {
                data.time = 5;
                window.electronAPI.alertNotif(data);
            }
        }        
    }  

    var nextIc = new Date();
    const icHours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    if (icHours.includes(now.getHours())){
        nextIc.setHours(nextIc.getHours() + 2);
        nextIc.setMinutes(0);
        nextIc.setSeconds(0);

        icCalc();
    } else {
        nextIc.setHours(nextIc.getHours() + 1);
        nextIc.setMinutes(0);
        nextIc.setSeconds(0);

        icCalc();
    }
}