"use strict"

class Performer{

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

}
