/**
 * http://usejsdoc.org/
 */
var request = require('request');
//var EventEmitter = require('events').EventEmitter;
var url = "https://www.swiggy.com/";
//emitter = new EventEmitter();
//function doCrawl(){
var hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
	       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
	       'Accept-Encoding': 'none',
	       'Accept-Language': 'en-US,en;q=0.8',
	       'Connection': 'keep-alive'};
      setTimeout(function(){
    	  console.log("Visiting page ");
        //do crawling operation, e.g.
        request({url:url,header:hdr}, function(err, resp, html){
          if(!err){
            //do all you want with the response then trigger another one
//            emitter.emit('fetchNext');
        	  console.log(resp);
          }
          else
        	  {
        	  console.log(err);
        	  }
        });
      }, 60000);
//    }


//emitter.on('fetchNext', doCrawl);