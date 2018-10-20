ul.addEventListener('dblclick', function(e){
    var rola = e.target.name;
    console.log(rola)
    ipcRenderer.send("editRolaRequest", rola);
});
