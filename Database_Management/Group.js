"use strict"

class Group{

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
