function addOneDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
}

function lodTimer(data) {
    console.log("fonc lodTimer");

    var now = new Date();
    var nextLod = new Date();

    const lodHours = [1, 4, 7, 10, 13, 16, 19, 22];
    if (now.getHours() >= 22) {
        nextLod = addOneDay(nextLod);

        nextLod.setHours(1);
        nextLod.setMinutes(0);
        nextLod.setSeconds(0);

        lodCalc(nextLod.getHours())
    }else if (lodHours.includes(now.getHours())){
        nextLod.setHours(nextLod.getHours() + 3);
        nextLod.setMinutes(0);
        nextLod.setSeconds(0);
        // lodCalc();
        lodCalc(nextLod.getHours());
    }else if (lodHours.includes(now.getHours() + 2)) {
        nextLod.setHours(nextLod.getHours() + 2);
        nextLod.setMinutes(0);
        nextLod.setSeconds(0);

        // lodCalc();
        lodCalc(nextLod.getHours());
    } else if (lodHours.includes(now.getHours() + 1)) {
        nextLod.setHours(nextLod.getHours() + 1);
        nextLod.setMinutes(0);
        nextLod.setSeconds(0);

        // lodCalc();
        lodCalc(nextLod.getHours());
    }else {
        nextLod.setHours(nextLod.getHours() + 1);
        nextLod.setMinutes(0);
        nextLod.setSeconds(0);

        // lodCalc();
        lodCalc(nextLod.getHours());
    }



    function lodCalc(number){
        var hoursString = "0";
        var minutesString = "0";
        nextLod.setHours(number);
        nextLod.setMinutes(0);
        var timeLeft = nextLod - now;
    
        var hours = Math.floor((timeLeft / (1000 * 60 * 60)));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
        hours.toString().length == 1 ? hoursString += hours.toString() : hoursString = hours.toString();
        minutes.toString().length == 1 ? minutesString += minutes.toString() : minutesString = minutes.toString();
    
        lodP.innerHTML = hoursString + ":" + minutesString

        if (data.notifLod == true) {
            const data = new Object;
            data.event = "DH at Lod";
            data.img = "dh";

            if (hours == 0 && minutes == 30) {
                data.time = 30;
                window.electronAPI.alertNotif(data);
            } else if (hours == 0 && minutes == 5) {
                data.time = 5;
                window.electronAPI.alertNotif(data);
            }
        }

        
        
    }
}