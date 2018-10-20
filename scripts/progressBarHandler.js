const electron = require('electron');
const {ipcRenderer} = electron;

const progressBar = document.getElementById("progress");
ipcRenderer.on("rolaAdded", function(evt, progress){
    console.log("ADDED ROLA!")
    progressBar.innerHTML = progress.current+"/"+progress.total;
});
