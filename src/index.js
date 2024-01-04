const submitButton = document.getElementById('submitOverlay')
const asgo = document.getElementById('asgo');
const ic = document.getElementById('ic');
const lod = document.getElementById('lod');

const notifAsgo = document.getElementById('notifAsgo');
const notifIc = document.getElementById('notifIc');
const notifLod = document.getElementById('notifLod');

const error = document.getElementById('error');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(asgo.checked);
    const notifs = new Object;
    // console.log(notifs);
    notifs.asgo = (asgo.checked) ? true : false;
    notifs.ic = (ic.checked) ? true : false;
    notifs.lod = (lod.checked) ? true : false;

    notifs.notifAsgo = (notifAsgo.checked) ? true : false;
    notifs.notifIc = (notifIc.checked) ? true : false;
    notifs.notifLod = (notifLod.checked) ? true : false;

    if (!asgo.checked && !ic.checked && !lod.checked) {
        error.style.display = "block";
        return;
    } else error.style.display = "none";
    console.log(notifs);

    window.electronAPI.sendNotif(notifs);
})

const checkListBtn = document.getElementById('checklistBtn');
const checkListContainer = document.getElementById('checkListContainer');

let checkListVisible = false;
checkListBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!checkListVisible) {
        checkListContainer.style.display = "flex"
        checkListVisible = true;

    } else {
        checkListContainer.style.display = "none"
        checkListVisible = false;
    }

})