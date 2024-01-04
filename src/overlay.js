const asgoDiv = document.getElementById('asgo');
const asgoP = document.getElementById('asgoP');
const lodDiv = document.getElementById('lod');

const icDiv = document.getElementById('ic');
const icP = document.getElementById('icP');
const lodP = document.getElementById('lodP');

const closeBtn = document.getElementById('close');

document.addEventListener("DOMContentLoaded", () => {
    const isVisible = true;
})

closeBtn.addEventListener('click', () => {
    // const clicked = true
    window.electronAPI.closeOverlay()
})

window.electronAPI.setOverlay((event, data) => {
    var date = new Date();
    console.log(data);
    if (data.asgo == true) {
        console.log("yep data asgo");
        asgoDiv.style.display = "flex";
        asgoTimer(data);
        setTimeout(function() {
            setInterval(asgoTimer, 60000, data);
            asgoTimer(data);
        }, (60 - date.getSeconds()) * 1000);
    } else asgoDiv.style.display = "none";

    if (data.ic == true){
        console.log("yep data ic");
        icDiv.style.display = "flex";
        icTimer(data);
        setTimeout(function() {
            setInterval(icTimer, 60000, data);
            icTimer(data);
        }, (60 - date.getSeconds()) * 1000);
    } else icDiv.style.display = "none";


    if (data.lod == true){
        console.log("yep data lod");
        lodDiv.style.display = "flex";
        lodTimer(data);
        setTimeout(function() {
            setInterval(lodTimer, 60000, data);
            lodTimer(data);
        }, (60 - date.getSeconds()) * 1000);
    } else lodDiv.style.display = "none";
})














// 11:30, 17:30, 21:30, 23:30 CI ASGO