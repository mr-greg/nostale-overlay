const ancel = document.getElementById('ancel');
const ancelStart = new Date();
var ancelStop = new Date();
ancelStop.setHours(ancelStop.getHours() + 1);
console.log(ancelStart);
console.log(ancelStop);

var pause = document.getElementById("pause");
var restart = document.getElementById("restart");

var clicked = false;

ancel.addEventListener('click', (e) => {
    console.log("yeppers");
    e.preventDefault();
    if (clicked) {
        return;
    }
    ancel.style.background = "rgb(118 34 69 / 60%)"
    ancel.style.cursor = "default";

    clicked = true;

    var pause = document.getElementById("pause");
    var restart = document.getElementById("restart");
    var timer = document.getElementById('timer').style.display = "inline"

    ancel.classList.remove('bene');
    pause.style.display = "inline"
    restart.style.display = "inline"
   

    var timeoutHandle;
    var paused = false;
    function secondsToTime(seconds){
        if(seconds < 60) {
            return seconds < 10 ? `0${seconds}` : seconds;
        } else {
            if(seconds/60 < 60) {
            const mins = Math.floor(seconds/60);
            const secs = seconds-mins*60;
            return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
            } else {
            const hours = Math.floor((seconds/60)/60);
            const mins = Math.floor(seconds/60 - hours*60);
            const secs = seconds-mins*60-hours*60*60;

            return `${hours}:${mins < 10 ? `0${mins}`: mins}:${secs < 10 ? `0${secs}`: secs}`;
            }
        }
    }

    function countdown(minutes) {
        var seconds = minutes * 60
        function tick() {
            var timer = document.getElementById("timer");
            if (!paused) {
                seconds--;
                timer.innerHTML = secondsToTime(seconds);
                if (seconds > 1) {
                    timeoutHandle = setTimeout(tick, 1000);
                } else {
                    console.log("done");
                    document.getElementById('timer').style.display = "none";
                    document.getElementById('restart').style.display = "none";
                    document.getElementById('pause').style.display = "none";
                    ancel.classList.add('bene');
                    ancel.style.cursor = "pointer";
                    ancel.style.background = ""
                    paused = false;
                    clicked = false;
                    window.electronAPI.beneNotif();
                }
            } else {
                timeoutHandle = setTimeout(tick, 1000);
            }
        }
        tick()
    }

    pause.addEventListener('click', function() {
        if (paused == false) {
            paused = true;
            pause.style.backgroundImage = "url('./img/play.png')";
            ancel.style.background = "rgba(65, 41, 51, 0.623)"
        } else {
            paused = false;
            pause.style.backgroundImage = "url('./img/pause.png')";
        }
    })

    restart.addEventListener('click', function() {
        clearTimeout(timeoutHandle);

        ancel.style.cursor = "wait";
        ancel.classList.add('bene');
        ancel.style.background = ""

        document.getElementById('timer').style.display = "none";
        restart.style.display = "none";
        document.getElementById('pause').style.display = "none";
        document.getElementById('pause').style.backgroundImage = "url('./img/pause.png')";
        setTimeout(setPauseFalse, 1000)

    })
    function setPauseFalse() {
        console.log("nopp");
        ancel.style.cursor = "pointer";
        paused = false;
        clicked = false;
    }

    countdown(60)

})

