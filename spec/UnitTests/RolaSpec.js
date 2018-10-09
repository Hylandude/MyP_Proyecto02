describe("Rola", function() {

    var Rola = require('../../Database_Management/Rola');
    var testRola = new Rola({
        TPE1 : 'Green Day',
        TIT2 : 'Longview',
        TALB : 'International Superhits',
        TDRC : '2001',
        TCON : 'Punk Rock',
        TRCK : '7/21',
        dir  : __dirname+'/TestSongs/Green Day/International Superhits!/Longview.mp3'
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
