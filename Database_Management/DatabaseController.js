const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const Album = require("./Album");
const Group = require("./Group");
const Performer = require("./Performer");
const Person = require("./Person");
const Rola = require("./Rola");

class Database{

    constructor(path=__dirname.slice(0,__dirname.lastIndexOf("/")), dbName="rolas.db"){
        this.path = path;
        this.dbName = dbName;
    }

    initDatabase(){
        let me = this;
        return new Promise(function(resolve, reject){
            var db = undefined;
            try{
                var files = fs.readdirSync(me.path);
                if(files.indexOf(me.dbName)>=0){
                    //db already exists
                    db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                        if(err) return resolve(false)
                    });
                    db.close(function(err){
                        if(err){
                            console.log(err);
                            return resolve(false);
                        }else{
                            return resolve(true);
                        }
                    });
                }else{
                    //db does not exist
                    db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                        if(err){
                            console.log(err);
                            return resolve(false);
                        }else{
                            return resolve(true);
                        }
                    });
                    if(db){
                        var SQLFile = fs.readFileSync(__dirname.slice(0,__dirname.lastIndexOf("/"))+"/rolas.sql", "utf8");
                        var statements = SQLFile.split(";").map(function(statement){
                            return statement.replace(/\n/gm, "")+";";
                        });
                        db.serialize(function(){
                            db.run(statements[0])
                            .run(statements[1])
                            .run(statements[2])
                            .run(statements[3])
                            .run(statements[4])
                            .run(statements[5])
                            .run(statements[6])
                            .run(statements[7])
                            .run(statements[8])
                            .run(statements[9]);
                        });
                        db.close(function(err){
                            if(err){
                                console.log(err);
                                return resolve(false);
                            }else{
                                return resolve(true);
                            }
                        });
                    }else{
                        return resolve(false);
                    }
                }
            }catch(error){
                console.log(error);
                return resolve(false);
            }
        });
    }

    addRola(rola){
        let me = this;
        return new Promise(function(resolve, reject){
            if(!rola) return resolve(false);
            var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                if(err) return resolve(false)
            });
            db.serialize(async function(){
                //check the performer is unique, if not, create it.
                var performerID = await me.findOrCreate(db, "performers", {name: rola.performer});
                var albumID = await me.findOrCreate(db, "albums", {path: rola.album.dir, name:rola.album.name , year:rola.year });
                if(!performerID || !albumID) return resolve(undefined);
                db.run( "INSERT into rolas(id_performer, id_album, path, title, track, year, genre) "+
                        "VALUES ("+performerID+", "+albumID+", '"+rola.rolaDir+"', '"+rola.title+"', "+rola.track+", "+rola.year+", '"+rola.genre+"');",
                      function(err){
                          if(err) return resolve(undefined);
                          return resolve(this.lastID);
                      }
                );
                db.close()
            });
        });
    }

    addPerformer(performer){

    }

    addGroup(group){

    }

    addPerson (person){

    }

    associatePersonToGroup(person, group){

    }

    associateRolaToGroup(rola, group){

    }

    associateRolaToAlbum(rola, album){

    }

    setPerformerType(performer, type){

    }

    findOrCreate(db, type, object){
        return new Promise(function(resolve, reject){
          var selectQuery = "SELECT * from "+type;
          var insertQuery = "INSERT into "+type;
          switch (type) {
            case "performers":
                selectQuery = selectQuery + " WHERE name = '"+object.name+"';"
                insertQuery = insertQuery + "(id_type, name) VALUES (2,'"+object.name+"');"
                break;
            case "albums":
                selectQuery = selectQuery + " WHERE name = '"+object.name+"' AND path = '"+object.path+"';"
                insertQuery = insertQuery + "(path, name, year) VALUES ('"+object.path+"', '"+object.name+"', "+object.year+");"
            default:
          }
          db.get(selectQuery, function(err, row){
              if (err) return resolve(undefined);
              if (row) return resolve(row["id_"+type.slice(0,type.length-1)])
              db.run(insertQuery, function(err){
                  if (err){
                    console.log(err);
                    return resolve(undefined)
                  };
                  return resolve(this.lastID);
              })
          });
        });
    }
}



var main = async function(){
    var db = new Database();
    db.initDatabase();
    var result = await db.addRola({performer: "thatGuy", album:{name:"otherOne", dir: __dirname+"/lolol"}, year:2018, title: "SomeOtherTitle", rolaDir: __dirname, track: 10, genre:"RB"});
}

main();

module.exports = Database;
