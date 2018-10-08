describe("Parser", function(){
    var parser = require('../../Query_Parser/Parser').Parser;

    describe("convert string to SQL query", function(){

        afterEach(function() {
            parser.queryString = "";
        });

        it("should search in album, performer or name when given a basic string",function(){
            parser.queryString = "green"
            expect(parser.parse()).toEqual("SELECT * FROM rolas WHERE title LIKE '%green%' OR ***** ");
        });

        it("should only search on the specified element when explicitly stated",function(){
            parser.queryString = "titulo: wa"
            expect(parser.parse()).toEqual("SELECT * FROM rolas WHERE title LIKE '%wa%'");
        });

        it("should apply an 'AND' operator when the ';' symbol is found",function(){
            parser.queryString = "titulo: wa ; album: inter"
            expect(parser.parse()).toEqual("SELECT * FROM rolas WHERE title LIKE '%wa%' AND ****** " );
        });

        it("should search for values literally when between 'single quotes'", function(){
            parser.queryString = "'Green Day'"
            expect(parser.parse()).toEqual("SELECT * FROM rolas WHERE title = 'Green Day' OR ***** ");
        });

        it("should combine all previous operators", function(){
            parser.queryString = "titulo: wa ; album:'International Superhits!'"
            expect(parser.parse()).toEqual("SELECT * FROM rolas WHERE title LIKE '%wa%' AND *******");
        })

    });

});
