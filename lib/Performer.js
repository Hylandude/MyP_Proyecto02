"use strict"

/**
* Class that represents the performer of a song.
* This performer can be an individual (Person) or a band (Group)
* @class
*/
class Performer{

    /**
    * Builds a new Performer
    * @param {string} name - Required parameter. The name of the performer.
    * @param {string} type - Optional parameter. The type of performer. Defaults to "Unknown"
    * @constructor
    */
    constructor(name, type='Unknown'){
        this._name = name;
        this._type = type;
    }

    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set type(type){
        this._type = type;
    }

    get type(){
        return this._type;
    }

    /**
    * Returns the database ID of performer type.
    * @param {string} type - Optional parameter. The type to get the id of. Defaults to the type of the performer who called the function.
    * @return {int} The database id of the type. 0 for Person, 1 for Group, 2 for Unknown. 
    */
    getTypeID(type = this._type){
        switch (type) {
          case 'Person':
              return 0;
          case 'Group':
              return 1;
          case 'Unknown':
          default:
              return 2;
        }
    }

}

module.exports = Performer;
