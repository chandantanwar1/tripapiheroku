 (function () {
    "use strict";

    var assert = require("assert");

    var NearBySearch = require("../lib/NearBySearch");
    var config = require("./config.js");

    var nearBySearch = new NearBySearch(config.apiKey, config.outputFormat);

    var parameters = {
        location: [28.640446,77.1027291],
        keyword: "restaurants",
        radius : "1000",
        rankby : "prominence"     	
    };
 

nearBySearch(parameters,  function (error, response,callback) {
        if (error)
        	{throw error;
        	}
        	
       // assert.notEqual(response.results.length, 0, "Place search must not return 0 results");
     console.log(response.results[0].types);
        var abc = response.results[0].types;
        results= abc;
        //results = results + response.results[0].types;
        callback(response);
    });


})();
