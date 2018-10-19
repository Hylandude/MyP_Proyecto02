"use strict"

/**
* Class that represents a single artist.
* @class
*/
class Person{

    /**
    * Builds a new Person.
    * @param {string} name - Required argument. The stage name of the Person.
    * @param {string} realName - Optional argument. The real name of the Person. Defaults to the provided stage name.
    * @param {string} birthDate - Optional argument. The date when the Person was born. Defaults to "".
    * @param {string} deathDate - Optional argument. The date when the Person died. Defaults to "".
    * @constructor
    */
    constructor(name, realName=name, birthDate="", deathDate=""){
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
