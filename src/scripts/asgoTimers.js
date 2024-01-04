function addOneDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
}

function asgoTimer(data) {
    console.log("fonc asgoTimer");
    var asgoEleven = new Date();
    asgoEleven.setHours(11);
    asgoEleven.setMinutes(30);

    var asgoSeventeen = new Date();
    asgoSeventeen.setHours(17);
    asgoSeventeen.setMinutes(30);

    var asgoTwentyOne = new Date();
    asgoTwentyOne.setHours(21);
    asgoTwentyOne.setMinutes(30);

    var asgoTwentyThree = new Date();
    asgoTwentyThree.setHours(23);
    asgoTwentyThree.setMinutes(30);
    
    var now = new Date();

    function asgoCalc(asgoTime){
        console.log(data);

        var hoursString = "0";
        var minutesString = "0";
        var timeLeft = asgoTime - now;
        
        var hours = Math.floor((timeLeft / (1000 * 60 * 60)));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        hours.toString().length == 1 ? hoursString += hours.toString() : hoursString = hours.toString();
        minutes.toString().length == 1 ? minutesString += minutes.toString() : minutesString = minutes.toString();
        asgoP.innerHTML = hoursString + ":" + minutesString

        if (data.notifAsgo == true) {
            const data = new Object;
            data.event = "Asgobas IC";
            data.img = "asgo";

            if (hours == 0 && minutes == 30) {
                data.time = 30;
                window.electronAPI.alertNotif(data);
                console.log(data);
            } else if (hours == 0 && minutes == 5) {
                data.time = 5;
                window.electronAPI.alertNotif(data);
            }
        }        
    }

    if (now.getHours() == 23 && now.getMinutes() > 30) {
        asgoEleven = addOneDay(asgoEleven);
        asgoCalc(asgoEleven);
    }
    
    switch (true) {
        case (now < asgoEleven): asgoCalc(asgoEleven); break;
        case (now < asgoSeventeen): asgoCalc(asgoSeventeen); break;
        case (now < asgoTwentyOne): asgoCalc(asgoTwentyOne); break;
        case (now < asgoTwentyThree): asgoCalc(asgoTwentyThree); break;
    }
}