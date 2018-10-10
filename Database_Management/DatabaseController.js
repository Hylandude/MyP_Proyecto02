const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

let Database = function(){
    this.initDatabase = initDatabase;
    this.addRola = addRola;
    this.addPerformer = addPerformer;
    this.addGroup = addGroup;
    this.addPerson = addPerson;
    this.associatePersonToGroup = associatePersonToGroup;
    this.associateRolaToGroup = associateRolaToGroup;
    this.associateRolaToAlbum = associateRolaToAlbum;
    this.setPerformerType = setPerformerType;

}

let initDatabase = function(path=__dirname.slice(0,__dirname.lastIndexOf("/")), dbName="rolas.db"){
    return new Promise(function(resolve, reject){
        var db = undefined;
        try{
            var files = fs.readdirSync(path);
            if(files.indexOf(dbName)>=0){
                //db already exists
                db = new sqlite3.Database(path+"/"+dbName, function(err){
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
                db = new sqlite3.Database(path+"/"+dbName, function(err){
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

let addRola = function(rola){

}

let addPerformer = function(performer){

}

let addGroup = function(group){

}

let addPerson = function(person){

}

let associatePersonToGroup = function(person, group){

}

let associateRolaToGroup = function(rola, group){

}

let associateRolaToAlbum = function(rola, album){

}

let setPerformerType = function(performer, type){
  
}

exports.Database = new Database();
