const electron = require('electron');
const {ipcRenderer} = electron;

document.addEventListener("DOMContentLoaded", function(){
    ipcRenderer.send('readyToEdit', {})

});

ipcRenderer.on("editValue", function(evt, rola){
    var hiddenValue = document.createElement('p');
    hiddenValue.innerHTML = rola
    hiddenValue.className = "hide";
    hiddenValue.id = "rola";
    var body = document.getElementById("main");
    body.appendChild(hiddenValue);
});
