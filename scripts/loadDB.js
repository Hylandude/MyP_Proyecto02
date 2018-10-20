document.addEventListener("DOMContentLoaded", function(){
    ipcRenderer.send("mainWindowLoaded");
});
