describe("Parser", function(){

    var parser = require('../../lib/Parser').Parser;

    describe("convert string to SQL query", function(){

        afterEach(function() {
            parser.queryString = "";
        });

        it("should search in album, performer or name when given a basic string",function(){
            parser.queryString = "green";
            expect(parser.parse()).toEqual(
              "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
              "FROM rolas, performers, albums "+
              "WHERE rolas.id_performer = performers.id_performer "+
              "AND rolas.id_album = albums.id_album "+
              "AND (album like '%green%' OR performer like '%green%' OR title like '%green%');");
        });

        it("should only search on the specified element when explicitly stated",function(){
            parser.queryString = "#titulo wa"
            expect(parser.parse()).toEqual(
              "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
              "FROM rolas, performers, albums "+
              "WHERE rolas.id_performer = performers.id_performer "+
              "AND rolas.id_album = albums.id_album "+
              "AND rolas.title like '%wa%';");
        });

        it("should only search on the specified element when explicitly stated and use the exact values if within double quotes",function(){
            parser.queryString = '#album "International Superhits!"'
            expect(parser.parse()).toEqual(
              "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
              "FROM rolas, performers, albums "+
              "WHERE rolas.id_performer = performers.id_performer "+
              "AND rolas.id_album = albums.id_album "+
              "AND album = 'International Superhits!';");
        });


        it("should apply an 'AND' operator when the '|' symbol is found",function(){
            parser.queryString = "#titulo wa | #album inter"
            expect(parser.parse()).toEqual(
              "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
              "FROM rolas, performers, albums "+
              "WHERE rolas.id_performer = performers.id_performer "+
              "AND rolas.id_album = albums.id_album "+
              "AND rolas.title like '%wa%' "+
              "AND album like '%inter%';");
        });

        it("should apply an 'AND' operator when the '|' symbol is found and use literal search on double quotes", function(){
            parser.queryString = '#titulo wa | #album "International Superhits!"'
            expect(parser.parse()).toEqual(
              "SELECT rolas.id_rola, rolas.id_performer, rolas.id_album, rolas.path, rolas.title, rolas.track, rolas.year, rolas.genre, albums.name as album, performers.name as performer "+
              "FROM rolas, performers, albums "+
              "WHERE rolas.id_performer = performers.id_performer "+
              "AND rolas.id_album = albums.id_album "+
              "AND rolas.title like '%wa%' "+
              "AND album = 'International Superhits!';");
        });

    });

});
