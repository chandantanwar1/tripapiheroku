   var abc;
   var results;
    var assert = require("assert");

    var NearBySearch = require("../lib/NearBySearch");
    var config = require("./config.js");
    var nearBySearch = new NearBySearch(config.apiKey, config.outputFormat);

    var parameters = {
        location: [28.640446,77.1027291],
        keyword: name,
        radius : "1000",
        rankby : "prominence"     	
    };
 
  function sample(callback)
    {
    
 nearBySearch(parameters,  function (error, response) {
        if (error)
        	{throw error;
        	//callback();
        	}	
       // assert.notEqual(response.results.length, 0, "Place search must not return 0 results");
     console.log(response.results[0].types);
       callback(response);
    });
    }
  
 //console.log(abc);
 sample(function(res){
	    console.log(res);
	});
