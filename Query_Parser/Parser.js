"use strict";

class Parser {

    constructor(){
        this._queryString = "";
    }

    set queryString(queryString){
        this._queryString = queryString
    }

    get queryString(){
        return this._queryString;
    }

    parse(queryString = this._queryString){
      return "parsed";
    }

}

exports.Parser = new Parser();
