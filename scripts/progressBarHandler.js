const electron = require("electron");
const ipc = electron.ipcRenderer;
document.addEventListener("DOMContentLoaded", function(){
    ipc.on("rolaAdded", function(evt, progress){
        let progressBar = document.getElementById("mined-progress");
        progressBar.value = progress.current/progress.total;
    });
})
