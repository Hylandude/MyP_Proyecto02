const electron = require('electron');
const {ipcRenderer} = electron;

var searchForm = document.getElementById("busqueda");
searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    var searchText = document.querySelector("#search-box").value;
    ipcRenderer.send("searchRequested", searchText);
});
