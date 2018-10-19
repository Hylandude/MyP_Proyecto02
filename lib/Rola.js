"use strict"

/**
* Class that represents an individual song
* @class
*/
class Rola{

    /**
    * Builds a new Rola.
    * @param {object} tags - Required parameter. JSON with the ID3 tags from the mp3.
    * @param {string} tags.TIT2 - The title of the song.
    * @param {string} tags.rolaDir - The absolute path of the .mp3 file location.
    * @param {string} tags.TCON - The genre of the song.
    * @param {string} tags.TPE1 - The song's performer.
    * @param {string} tags.TRCK - The track number inside the album.
    * @param {string} tags.TDRC - The date when the song was recorded.
    * @param {string} tags.TYER - The year when the song was recoded.
    * @param {string} tags.TALB - The title of the album to which the song belongs.
    * @param {string} tags.albumDir - The absolute path of the directory where the .mp3 file is located.
    * @constructor
    */
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

/**
* Function that converts the string tag TRCK to a valid integer.
* @param {string} TRCK - the ID3v4 TRCK tag
*/
var parseTRCK = function(TRCK){
    if(typeof TRCK == 'undefined') return 1;
    if(typeof TRCK == 'number') return TRCK;
    var trackNumber = TRCK.split("/")[0];
    trackNumber = parseInt(trackNumber);
    return (isNaN(trackNumber) ? 1 : trackNumber);
}

/**
* Function that converts either the TDRC or TYER tag to a valid integer
* @param {string} TDRC - the ID3v4 TDRC tag
* @param {string} TYER - the ID3v4 TYER tag
*/
var parseTDRC = function(TDRC, TYER){
    if(!isNaN(parseInt(TYER))) return TYER;
    if(typeof TDRC == 'undefined') return new Date().getFullYear();
    if(typeof TDRC == 'number') return TDRC;
    var dateRecorded = new Date(TDRC);
    if(dateRecorded.toString() == 'Invalid Date') return new Date().getFullYear();
    return dateRecorded.getFullYear();
}

module.exports = Rola;
