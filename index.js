const { app, BrowserWindow, Menu, ipcMain } = require("electron")

//Database Access Object
const Database = require('./lib/DatabaseController');
const DAO =  new Database();
DAO.initDatabase();

//Classes
const Album = require('./lib/Album');
const Group = require('./lib/Group');
const Performer = require('./lib/Performer');
const Person = require('./lib/Person');
const Rola = require('./lib/Rola');

//Miner
const Miner = require('./lib/Miner').Miner;

//SQL Query pseudo-compiler
const Parser = require('./lib/Parser').Parser;

//Windows
let mainWindow;
let aboutWindow;
let editRolaWindow;

//Check for app to be ready
app.on("ready", () => {
	mainWindow = new BrowserWindow({ height: 800, width: 800, show: false });

	mainWindow.loadURL(`file://${__dirname}/views/main.html`);
	mainWindow.once("ready-to-show", () => { mainWindow.show() });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", function(){
      app.quit();
  });

});

//Catch searchPerformed
ipcMain.on("searchRequested",async function(event, searchQuery){
    var SQLstring = Parser.parse(searchQuery);
    var busqueda = await DAO.search(SQLstring);
    mainWindow.webContents.send("searchPerformed", busqueda);
});

//Catch editRolaRequest
ipcMain.on("editRolaRequest", async function(event,rola){
		showEditRola(rola);
});


//Catch editRolaReady
var editing;
ipcMain.on("readyToEdit", function(event){
		editRolaWindow.webContents.send("editValue", editing);
		editing = null;
});

//Catch submitEditionRequest
ipcMain.on("submitEditionRequest", function(event, newValues){
		console.log(newValues);
		editRolaWindow.close();
});

//Edit Rola Window
function showEditRola(rola){
		editRolaWindow = new BrowserWindow({width: 500, height: 450, title: "Editar Rola"});
	  editRolaWindow.loadURL(`file://${__dirname}/views/editRola.html`);
		editing = rola;
	  editRolaWindow.on("close", function(){
	      editRolaWindow = null;
	  });
}

//About Window
function showAbout(){
  aboutWindow = new BrowserWindow({width: 200, height: 300, title: "Acerca de..."});
  aboutWindow.loadURL(`file://${__dirname}/views/acercaDe.html`);

  aboutWindow.on("close", function(){
      aboutWindow = null;
  });
}

//Menu template
const mainMenuTemplate = [
    {
      label: "Menu",
      submenu: [
        {
          label: "Salir",
          accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click(){
            app.quit();
          }
        },
        {
          label: "Acerca De",
          click(){
              showAbout();
          }
        }
      ]
    }
]

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: "Dev tools",
        submenu:[
          {
            label: 'Toggle Tools',
            accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
          },
          {
            role: "reload"
          }
        ]
    });
}


app.on("window-all-closed", () => { app.quit() })
