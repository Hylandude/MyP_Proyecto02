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

var main = function(){
    var parser = new Parser();
    parser.queryString = "hola";
    console.log(parser.queryString);
    console.log(parser.parse());
}

main();
