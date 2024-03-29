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
            if(!rola ||  !(rola instanceof Rola)){
              console.log("NO ES ROLA!")
              return resolve(false);
            }
            var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                if(err){
                  console.log("COULD NOT READ DB")
                  return resolve(false);
                }
            });
            db.serialize(async function(){
                //check the performer is unique, if not, create it.
                var performerID = await me.findOrCreate(db, "performers", {name: rola.performer});
                var albumID = await me.findOrCreate(db, "albums", {path: rola.album.dir, name:rola.album.name , year:rola.year });
                if(!performerID || !albumID) return resolve(undefined);
                var rolaQuery = "INSERT into rolas(id_performer, id_album, path, title, track, year, genre) "+
                                "VALUES ("+performerID+", "+albumID+", '"+rola.path+"', '"+rola.title+"', "+rola.track+", "+rola.year+", '"+rola.genre+"');";
                db.run(rolaQuery,function(err){
                    if(err){
                      console.log("COULD NOT ADD ROLA");
                      console.log(err);
                      console.log(rolaQuery);
                      return resolve(false);
                    }
                    return resolve(this.lastID);
                });
                db.close();
            });
        });
    }

    getAllRolas(){
        let me = this;
        return new Promise(function(resolve, reject){
          var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
              if(err) return resolve(false);
          });
          var allQuery ="SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
                        "FROM rolas, performers, albums "+
                        "WHERE rolas.id_performer = performers.id_performer "+
                        "AND rolas.id_album = albums.id_album ";
          db.all(allQuery, function(err, rows){
              if(err){
                  return resolve(false);
              }else{
                  return resolve(rows);
              }
          })
        });
    }

    addPerformer(performer){
        let me = this;
        return new Promise(function(resolve, reject){
            if(!performer ||  !(performer instanceof Performer)) return resolve(false);
            var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                if(err) return resolve(false);
            });
            db.serialize(function(){
                db.run("INSERT into performers(id_type, name) VALUES ("+performer.getTypeID()+", '"+performer.name+"');",
                        function(err){
                            if (err) return resolve (undefined);
                            return resolve(this.lastID);
                        }
                );
                db.close();
            });
        });
    }

    addGroup(group){
        let me = this;
        return new Promise(function(resolve, reject){
            if(!group ||  !(group instanceof Group)) return resolve(false);
            var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                if(err) return resolve(false);
            });
            db.serialize(function(){
                db.run("INSERT into groups(name, start_date, end_date) VALUES ('"+group.name+"', '"+group.startDate+"', '"+group.endDate+"');",
                        function(err){
                            if (err) return resolve (undefined);
                            return resolve(this.lastID);
                        }
                );
                db.close();
            });
        });
    }

    addPerson (person){
        let me = this;
        return new Promise(function(resolve, reject){
            if(!person ||  !(person instanceof Person)) return resolve(false);
            var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                if(err) return resolve(false);
            });
            db.serialize(function(){
                db.run("INSERT into persons(stage_name, real_name, birth_date, death_date) VALUES ('"+person.name+"', '"+person.realName+"', '"+person.birthDate+"', '"+person.deathDate+"');",
                        function(err){
                            if (err) return resolve (undefined);
                            return resolve(this.lastID);
                        }
                );
                db.close();
            });
        });
    }

    associatePersonToGroup(person, group){
        let me = this;
        return new Promise(function(resolve, reject){
            if( (!person ||  !(person instanceof Person)) || (!group ||  !(group instanceof Group)) ) return resolve(false);
            var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
                if(err) return resolve(false);
            });
            db.serialize(async function(){
                var personID = await me.findOrCreate(db, "persons", person);
                var groupID = await me.findOrCreate(db, "groups", group);
                if (!personID || !groupID) return resolve(false);
                db.run("INSERT into in_group(id_person, id_group) VALUES ("+personID+","+groupID+");",
                        function(err){
                            if(err) return resolve(false);
                            return resolve(this.lastID);
                        }
                );
                db.close();
            });
        });
    }

    setPerformerType(performer, type){
      let me = this;
      return new Promise(function(resolve, reject){
          if( !performer ||  !(performer instanceof Performer)) return resolve(false);
          var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
              if(err) return resolve(false);
          });
          db.serialize(async function(){
              var performerID = await me.findOrCreate(db, "performers", performer);
              if (!performerID) return resolve(false);
              db.run("UPDATE performers SET id_type = "+performer.getTypeID(type)+" WHERE id_performer = "+performerID,
                      function(err){
                          if(err) return resolve(false);
                          return resolve(true);
                      }
              );
          });
      });
    }

    findOrCreate(db, type, object){
        return new Promise(function(resolve, reject){
            var selectQuery = "SELECT * from "+type;
            var insertQuery = "INSERT into "+type;
            switch (type) {
              case "performers":
                  selectQuery = selectQuery + " WHERE name = '"+object.name+"';";
                  insertQuery = insertQuery + "(id_type, name) VALUES (2,'"+object.name+"');";
                  break;
              case "albums":
                  selectQuery = selectQuery + " WHERE name = '"+object.name+"' AND path = '"+object.path+"';";
                  insertQuery = insertQuery + "(path, name, year) VALUES ('"+object.path+"', '"+object.name+"', "+object.year+");";
                  break;
              case "persons":
                  selectQuery = selectQuery + " WHERE real_name = '"+object.realName+"' AND stage_name = '"+object.name+"';";
                  insertQuery = insertQuery + "(stage_name, real_name, birth_date, death_date) VALUES ('"+object.name+"', '"+object.realName+"', '"+object.birthDate+"', '"+object.deathDate+"');";
                  break;
              case "groups":
                  selectQuery = selectQuery + " WHERE name = '"+object.name+"';";
                  insertQuery = insertQuery + "(name, start_date, end_date) VALUES ('"+object.name+"', '"+object.startDate+"', '"+object.endDate+"');";
            }
            db.get(selectQuery, function(err, row){
                if (err){
                    console.log("COULD NOT FIND "+type);
                    console.log(err);
                    console.log(selectQuery);
                    return resolve(undefined);
                }
                if (row){
                    return resolve(row["id_"+type.slice(0,type.length-1)]);
                }else{
                    db.run(insertQuery, function(err){
                        if (err){
                            console.log("COULD NOT INSERT "+type);
                            console.log(err);
                            console.log(selectQuery);
                            return resolve(undefined)
                        };
                        return resolve(this.lastID);
                    });
                }
            });
        });
    }

    search(query){
      let me = this;
      return new Promise(function(resolve, reject){
          var db = new sqlite3.Database(me.path+"/"+me.dbName, function(err){
              if(err) return resolve(false);
          });
          db.all(query, function(err, rows){
              if(err){
                  return resolve(false);
              }else{
                  return resolve(rows);
              }
          });
      });
    }
}

module.exports = Database;
