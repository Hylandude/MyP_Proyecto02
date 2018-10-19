describe("Rola", function() {

    var Rola = require('../../lib/Rola');
    var testRola = new Rola({
        TPE1 : 'Performer',
        TIT2 : 'Title',
        TALB : 'Album',
        TDRC : '2018',
        TCON : 'Genre',
        TRCK : '1/09',
        rolaDir  : __dirname+'/Tags Test MP3s/test1.mp3'
    });

    describe("construction", function(){

        it("should have an integer on the track attribute", function(){
            expect(typeof testRola._track).toEqual('number');
        });

        it("should have an integer on the year attribute", function(){
            expect(typeof testRola._year).toEqual('number');
        });

        it("should point to a valid directory on the dir attribute", function(){
            var fs = require('fs');
            try{
                var rolon = fs.readdirSync(testRola._path.slice(0,testRola._path.lastIndexOf("/")));
                expect(false).toBeFalsy();
            }catch(error){
                expect(true).toBeFalsy();
            }

        });

    });

});
