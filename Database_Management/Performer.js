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
