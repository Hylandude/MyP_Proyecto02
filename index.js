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
let progressWindow;

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
    var busqueda = searchQuery== "" ? await DAO.getAllRolas() : await DAO.search(SQLstring);
    mainWindow.webContents.send("searchPerformed", busqueda);
});

//Catch editRolaRequest
ipcMain.on("editRolaRequest", async function(event,rola){
		showEditRola(rola);
});

//Catch mainWindowLoaded
ipcMain.on("mainWindowLoaded", async function(event){
		var allRolas = await DAO.getAllRolas();
		mainWindow.webContents.send("searchPerformed", allRolas);
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

//Progress Window
function showProgress(){
		progressWindow = new BrowserWindow({width: 500, height: 150, title:"Progreso"});
		progressWindow.loadURL(`file://${__dirname}/views/Progress.html`);
}

//Mine data on request
async function mineData(){
		showProgress();
		console.log("MINING...");
		var minedRolas = await Miner.mine();
		console.log("MINE COMPLETE UPLOADING TO DB");
		for(var i=0; i<minedRolas.length; i++){
				console.log((i+1)+"/"+minedRolas.length);
				await DAO.addRola(minedRolas[i]);
				progressWindow.webContents.send("rolaAdded",{current:i+1, total: minedRolas.length});
		}
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
					label: "Minar Datos",
					accelerator: process.platform == 'darwin' ? 'Command+M' : 'Ctrl+M',
					click(){
							mineData();
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

//End process when all windows are closed
app.on("window-all-closed", () => { app.quit() })
