var fs = require('fs');

describe("Miner", function() {

    var miner = require('../../Metadata_Miner/Miner').Miner;
    var demoPath = __dirname+'/TestSongs';
    var originalTimeout;
    var minedItems = [];

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("should mine ID3v2.4 tags", done => {
        asyncMine(miner, demoPath).then(function(mI){
            minedItems = mI
            //returns an array of tags
            expect(Array.isArray(minedItems)).toBeTruthy();

            //only checks .mp3 files
            expect(minedItems.length).toEqual(25)

            //has required tags populated
            var tags = Object.keys(minedItems[0]);
            expect(tags).toContain("TPE1");
            expect(tags).toContain("TIT2");
            expect(tags).toContain("TALB");
            expect(tags).toContain("TDRC");
            expect(tags).toContain("TCON");
            expect(tags).toContain("TRCK");

            done();
        });
    });

});

function asyncMine(miner, path) {
    return new Promise(async function(resolve, reject){
        var mined = await miner.mine(path, []);
        return resolve(mined);
    });
}
