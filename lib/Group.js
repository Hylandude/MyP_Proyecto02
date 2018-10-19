"use strict"

/**
* Class that represents a group/band of performers
* @class
*/
class Group{

    /**
    * Builds a new group.
    * @param {string} name - Required parameter. The name of the group.
    * @param {string} startDate - Optional parameter. The date when the group was founded. Defaults to "".
    * @param {string} endDate - Optional parameter. The date when the group broke apart. Defaults to "".
    * @constructor
    */
    constructor(name, startDate="", endDate=""){
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
    }

    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set startDate(startDate){
        this._startDate = startDate;
    }

    get startDate(){
        return this._startDate;
    }

    set endDate(endDate){
        this._endDate = endDate;
    }

    get endDate(){
        return this._endDate;
    }

}

module.exports = Group;
