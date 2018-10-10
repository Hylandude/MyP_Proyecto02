"use strict";
const fs = require('fs');
const mm = require('music-metadata');

class Miner{

    constructor(){
        this.percentage = 0;
    }

    set percentage(percentage){
        this._percentage = percentage;
    }

    get percentage(){
        return this._percentage;
    }

    async mine(dir=require('os').homedir()+'/Music', mined=[]){
        try{
            var me = this;
            var files = fs.readdirSync(dir);
            for(var i=0; i<files.length; i++){
                var file = files[i];
                if(fs.statSync(dir+'/'+file).isDirectory()){
                    mined = await me.mine(dir+'/'+file, mined);
                }else{
                    if(file.indexOf('.mp3')>=0){
                        var tags = await me.farmTags(mm.parseFile(dir+'/'+file, {native: true, duration: true}));
                        if (typeof tags != 'undefined'){
                            tags.albumDir = dir;
                            tags.rolaDir = dir+'/'+file;
                            mined.push(tags);
                        }
                    }
                }
            };
            return mined;
        }catch(error){
            console.log(error);
        }
    }

    farmTags(promisedTag){
        return new Promise(function(resolve, reject){
            promisedTag.then(function(metadata){
                var ID3Tags = metadata.native['ID3v2.4'] || metadata.native['ID3v2.3'];
                var tags = {
                  TPE1 : 'Unknown',
                  TIT2 : 'Unknown',
                  TALB : 'Unknown',
                  TDRC : 2018,
                  TCON : 'Unknown',
                  TRCK : 1
                };
                ID3Tags.forEach(function(tag){
                    tags[tag.id] = tag.value;
                });
                return resolve(tags);
            }).catch(function(){
                console.log("No tags in file");
                return resolve(undefined);
            });
        });
    }
}

exports.Miner = new Miner();
