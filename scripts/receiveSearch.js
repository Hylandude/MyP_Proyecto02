const ul = document.getElementById("display-rolas");
ipcRenderer.on("searchPerformed", function(e, searchResults){
    for(var i=0; i<searchResults.length; i++){
        var li = document.createElement('li');
        li.name = JSON.stringify(searchResults[i]);
        li.className = "row collection-item"

        //generateFields
        var titleDiv = document.createElement('div');
        var performerDiv = document.createElement('div');
        var albumDiv = document.createElement('div');
        var genreDiv = document.createElement('div');
        var trackDiv = document.createElement('div');
        var yearDiv = document.createElement('div');

        titleDiv.innerHTML = searchResults[i].title;
        performerDiv.innerHTML = searchResults[i].performer;
        albumDiv.innerHTML = searchResults[i].album;
        genreDiv.innerHTML = searchResults[i].genre;
        trackDiv.innerHTML = searchResults[i].track;
        yearDiv.innerHTML = searchResults[i].year;

        titleDiv.name = JSON.stringify(searchResults[i]);;
        performerDiv.name = JSON.stringify(searchResults[i]);
        albumDiv.name = JSON.stringify(searchResults[i]);;
        genreDiv.name = JSON.stringify(searchResults[i]);;
        trackDiv.name = JSON.stringify(searchResults[i]);;
        yearDiv.name = JSON.stringify(searchResults[i]);

        titleDiv.className = "col s2"
        performerDiv.className = "col s2"
        albumDiv.className = "col s2"
        genreDiv.className = "col s2"
        trackDiv.className = "col s2"
        yearDiv.className = "col s2"

        li.appendChild(titleDiv);
        li.appendChild(performerDiv);
        li.appendChild(albumDiv);
        li.appendChild(genreDiv);
        li.appendChild(trackDiv);
        li.appendChild(yearDiv);

        ul.appendChild(li);
    }
});
