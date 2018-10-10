"use strict"

class Rola{
    constructor(tags){
        this._title = tags.TIT2;
        this._path = tags.rolaDir;
        this._genre = tags.TCON;
        this._performer = tags.TPE1;
        this._track = parseTRCK(tags.TRCK);
        this._year = parseTDRC(tags.TDRC, tags.TYER);
        this._album = {name: tags.TALB, dir: tags.albumDir}
    }

    set title(title){
        this._title = title;
    }

    get title(){
        return this._title;
    }

    set path(path){
        this._path = path;
    }

    get path(){
        return this._path;
    }

    set genre(genre){
        this._genre = genre;
    }

    get genre(){
        return this._genre;
    }

    set performer(performer){
        this._performer = performer;
    }

    get performer(){
        return this._performer;
    }

    set track(track){
        this._track = parseTRCK(track);
    }

    get track(){
        return this._track;
    }

    set year(year){
        this._year = parseTDRC(year, 'NaN');
    }

    get year(){
        return this._year;
    }

    set album(album){
        this._album = album;
    }

    get album(){
        return this._album;
    }

}

var parseTRCK = function(TRCK){
    if(typeof TRCK == 'undefined') return 1;
    if(typeof TRCK == 'number') return TRCK;
    var trackNumber = TRCK.split("/")[0];
    trackNumber = parseInt(trackNumber);
    return (isNaN(trackNumber) ? 1 : trackNumber);
}

var parseTDRC = function(TDRC, TYER){
    if(!isNaN(parseInt(TYER))) return TYER;
    if(typeof TDRC == 'undefined') return new Date().getFullYear();
    if(typeof TDRC == 'number') return TDRC;
    var dateRecorded = new Date(TDRC);
    if(dateRecorded.toString() == 'Invalid Date') return new Date().getFullYear();
    return dateRecorded.getFullYear();
}

module.exports = Rola;
