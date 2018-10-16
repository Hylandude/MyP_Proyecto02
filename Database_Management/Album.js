"use strict"

class Album{

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
