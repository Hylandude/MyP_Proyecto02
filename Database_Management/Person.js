"use strict"

class Person{

    constructor(name, realName="", birthDate="", deathDate=""){
        this._name = name;
        this._realName = realName;
        this._birthDate = birthDate;
        this._deathDate = deathDate;
    }

    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set realName(realName){
        this._realName = realName;
    }

    get realName(){
        return this._realName;
    }

    set birthDate(birthDate){
        this._birthDate = birthDate;
    }

    get birthDate(){
        return this._birthDate;
    }

    set deathDate(deathDate){
        this._deathDate = deathDate;
    }

    get deathDate(){
        return this._deathDate;
    }

}

module.exports = Person;
