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
        //Regular search, no special modifiers
        if(queryString.indexOf("#") < 0 && queryString.indexOf('"') < 0 && queryString.indexOf("|") < 0){
            return "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
            "FROM rolas, performers, albums "+
            "WHERE rolas.id_performer = performers.id_performer "+
            "AND rolas.id_album = albums.id_album "+
            "AND (album like '%"+queryString+"%' OR performer like '%"+queryString+"%' OR title like '%"+queryString+"%');"
        }

        //Field specific search only one field
        if(queryString.indexOf("#") == 0 && queryString.indexOf("|") < 0){
            var field = queryString.slice(1,queryString.indexOf(" "));
            field = getDbField(field);
            if(!field) return "";
            var search = queryString.slice(queryString.indexOf(" ")+1, queryString.length);
            var query = "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
            "FROM rolas, performers, albums "+
            "WHERE rolas.id_performer = performers.id_performer "+
            "AND rolas.id_album = albums.id_album "+
            "AND "+field+" ";

            if( search.indexOf('"') == 0 && search.lastIndexOf('"') == search.length-1 ){
                //literal search
                query = query + "= '"+search.slice(1,search.length-1)+"';"
            }else{
                //substring search
                query = query + "like '%"+search+"%';"
            }
            return query;
        }

        //Multiple field specific search
        if(queryString.indexOf("#") >= 0 && queryString.lastIndexOf("|") > 0){
            var searchFields = queryString.split("|");
            var query = "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
            "FROM rolas, performers, albums "+
            "WHERE rolas.id_performer = performers.id_performer "+
            "AND rolas.id_album = albums.id_album "

            for(var i=0; i< searchFields.length; i++){
                var search = searchFields[i].trim();
                var field = search.slice(1,search.indexOf(" "));
                field = getDbField(field);
                if(!field) continue;
                var searchValue = search.slice(search.indexOf(" ")+1, search.length);
                if( searchValue.indexOf('"') == 0 && searchValue.lastIndexOf('"') == searchValue.length-1 ){
                    //literal search
                    query = query + "AND "+field+" = '"+searchValue.slice(1,searchValue.length-1)+"' "
                }else{
                    //substring search
                    query = query + "AND "+field+" like '%"+searchValue+"%' "
                }
            };
            return query.trim()+";";

        }
    }
}

var getDbField = function(field){
    switch (field) {
        case "titulo":
            return "rolas.title";
        case "album":
            return "album";
        case "artista":
            return "performer";
        case "genero":
            return "rolas.genre";
        case "año":
            return "rolas.year";
        default:
            return "";
    }
}

exports.Parser = new Parser();
