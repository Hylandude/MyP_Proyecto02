var radios = document.getElementsByName("tipo");
var typeForm = document.getElementById("type-selector");
var inputForms = document.getElementsByName("input-fields");

typeForm.addEventListener('change', function(event){
    var rola = document.getElementById("rola");
    rola = JSON.parse(rola.innerHTML);
    var editionObject = {}
    switch(event.target.value){
        case "Person":
            inputForms[0].className="";
            inputForms[1].className="hide";
            inputForms[2].className="hide";
            inputForms[0].addEventListener('submit', function(ev){
                ev.preventDefault();
                newValues = {
                    type: "Person",
                    name: document.getElementById("person-name").value || rola.performer,
                    realName: document.getElementById("person-name").value || rola.performer,
                    birthDate: document.getElementById("person-birth").value || "",
                    deathDate: document.getElementById("person-death").value || ""
                }
                ipcRenderer.send("submitEditionRequest", newValues);
            });
            break;
        case "Group":
            inputForms[0].className="hide";
            inputForms[1].className="";
            inputForms[2].className="hide";
            inputForms[1].addEventListener('submit', function(ev){
                ev.preventDefault();
                newValues = {
                    type: "Group",
                    name: document.getElementById("group-name").value || rola.performer,
                    realName: document.getElementById("group-create").value || "",
                    birthDate: document.getElementById("group-disband").value || ""
                }
                ipcRenderer.send("submitEditionRequest",newValues);
            });
            break;
        case "Unknown":
            inputForms[0].className="hide";
            inputForms[1].className="hide";
            inputForms[2].className="";
            inputForms[2].addEventListener('submit', function(ev){
                ev.preventDefault();
                newValues = {
                    type: "Unknown",
                    name: document.getElementById("performer-name").value || rola.performer
                }
                ipcRenderer.send("submitEditionRequest",newValues);
            });
            break;
    }
});
