const ul = document.getElementById("display-rolas");
console.log("HEWWO?");
ipcRenderer.on("searchPerformed", function(e, searchResults){
    console.log("SEARCH RECEIVED");
    for(var i=0; i<searchResults.length; i++){
        var li = document.createElement('li');
        var itemText = document.createTextNode(JSON.stringify(searchResults[i]));
        li.appendChild(itemText);
        ul.appendChild(li);
    }
});
