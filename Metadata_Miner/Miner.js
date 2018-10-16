"use strict";
const fs = require('fs');
const mm = require('music-metadata');
const Rola = require('../Database_Management/Rola');

/**
* Class that represents the metadata miner
* @class
*/
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

    /**
    * Function that mines metadata from all mp3 files inside a directory
    * @param {string} dir - Optional argument. Directory where to mine the information from. Defaults to ~home/Music.
    * @param {array} mined - Internal argument. Keeps track of the already mined songs during recursion.
    * @return {array} Returns an array of Rola objects.
    */
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
                            mined.push(new Rola(tags));
                        }
                    }
                }
            };
            return mined;
        }catch(error){
            console.log(error);
        }
    }

    /**
    * Function that returns the ID3v4 tags of a single song.
    * @param {Promise} Promise returned from the music-metadata library.
    * @return {object} Returns a JSON object with all the tags found for the song.
    */
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
