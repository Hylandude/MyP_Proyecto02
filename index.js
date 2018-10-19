const { app, BrowserWindow, ipcMain } = require("electron")

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

app.on("ready", () => {
	let mainWindow = new BrowserWindow({ height: 800, width: 800, show: false })
	mainWindow.loadURL(`file://${__dirname}/main.html`)
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", async function () {
      var minedRolas = await Miner.mine();
      console.log(minedRolas.length+" Have been mined adding to DB.")
      var dbOK = await DAO.initDatabase();
      if(dbOK){
          for(var i=0; i<minedRolas.length; i++){
              var rola = minedRolas[i]
              console.log((i+1)+" / "+minedRolas.length)
              await DAO.addRola(rola);
          }
      }
      var allRolas = await DAO.getAllRolas();
      mainWindow.webContents.send("resultSent", allRolas);
	});
});



app.on("window-all-closed", () => { app.quit() })
