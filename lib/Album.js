"use strict"

/**
* Class that represents an album
* @class
*/
class Album{
    /**
    * Builds a new album object
    * @param {string} name - Required parameter. The name of the album
    * @param {string} path - Optional parameter. The path to the folder were the album's songs are saved.
    * @param {int} year - Optional parameter. The year of the album. Defaults to current year
    * @constructor
    */
    constructor(name, path="", year=new Date().getFullYear()){
        this._name = name;
        this._path = path;
        this._year = year;
    }

    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set path(path){
        this._path = path;
    }

    get path(){
        return this._path;
    }

    set year(year){
        this.year = year;
    }

    get year(){
        return this.year;
    }

}

module.exports = Album;
