/**
 * http://usejsdoc.org/
 */
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyCyI0p8LFLngM4s9qCu-zVl6P1MAe-e7j4";

console.log("Visiting page " + pageToVisit);

request(pageToVisit, function(error, response, body) {
	   if(error) {
	     console.log("Error: " + error);
	   }
	   // Check status code (200 is HTTP OK)
	   console.log("Status code: " + response.statusCode);
	   if(response.statusCode === 200) {
	     // Parse the document body
	   console.log(response);
	   }
	   else
		   {
		   console.log("Status code: " + response.statusCode);
		   }
	});