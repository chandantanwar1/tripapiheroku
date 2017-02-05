(function () {
    "use strict";

    var querystring = require("querystring");
    var https = require("https");

    var HttpResponseProcessor = require("./HttpResponseProcessor.js");
    var validate = require("./validate.js");

    module.exports = function (apiKey, outputFormat) {
        return function (parameters, callback) {
            validate.apiKey(apiKey);
            validate.outputFormat(outputFormat);
            parameters.key = apiKey;
            parameters.location = parameters.location || "-33.8670522,151.1957362";
            if (typeof parameters.location === "object") 
            	{parameters.location = parameters.location.toString();
            		}
            if (!parameters.rankby) 
            	{parameters.radius = parameters.radius || 500;
            		}
			 if (parameters.type==="restaurant") 
            	{parameters.types = "cafe" || "food" || "restaurant";
            		}
			if (parameters.type==="adventure") 
            	{parameters.keyword = "adventure";
            		}		
			if (parameters.type==="art") 
            	{parameters.types = "art_gallery";
            		}	
			if (parameters.type==="nature") 
            	{parameters.types = "zoo" || "campground";
            		}	
			if (parameters.type==="shopping") 
            	{parameters.types = "clothing_store" || "convenience_store" || "department_store" || "electronics_store" || "home_goods_store" || "jewelry_store" || "liquor_store" || "shoe_store" || "shopping_mall";
            		}
            if (parameters.type==="park") 
            	{parameters.types = "park" || "rv_park";
            		}	
			if (parameters.type==="entertainment") 
            	{parameters.types = "bowling_alley" || "casino" || "movie_theater" || "night_club" || "spa" || "stadium";
            		}	
			if (parameters.type==="religious") 
            	{parameters.types = "place_of_worship";
            		}			
					
            var options = {
                hostname: "maps.googleapis.com",
                path: "/maps/api/place/nearbysearch/" + outputFormat + "?" + querystring.stringify(parameters)
            };
            var request = https.request(options, new HttpResponseProcessor(outputFormat === "json", callback));
            request.on("error", function (error) {
                callback(new Error(error));
            });
            request.end();
        };
    };

})();
