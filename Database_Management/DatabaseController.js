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
}

module.exports = Database;
