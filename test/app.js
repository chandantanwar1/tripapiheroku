//Lets require/import the HTTP module
var http = require('http');
var Httpdispatcher = require('httpdispatcher');
var express = require('express');
var app = express();
//Module to get JSON resp
var bodyParser = require('body-parser');
var dispatcher = new Httpdispatcher();
var resp={};
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//Module for google api calling
var NearBySearch = require("../lib/NearBySearch");
var config = require("./config.js");
var nearBySearch = new NearBySearch(config.apiKey, config.outputFormat);
 
 
//Lets define a port we want to listen to
var PORT=8090;
var end_time=600;
var no_days=0;
var counter;
var item;
var day;
var filters=[];
var flag;
 
function loop(parameters,time,callback){
            //console.log(filters[0].type);
            var parameters_local={};
//            console.log(counter);
            //var flag_loop=0;
//            console.log(time);
//            console.log(parameters.type);
            if (time < 600) {
                       
                        if(time>=240)
                                    {
                                       if(flag===0)
                                       {
                                                 parameters_local = {
                                                        location: [parameters.location[0],parameters.location[1]],
                                                        type: filters[0].type,
                                                        radius : "10000",
                                                        rankby : "prominence"                
                                                    };
                                                 time+=filters[0].time;
                                                flag=1;
                                               
                                       }
                                       else
                                       {  //console.log("Inside else");
                                    loop: for(var j=4; j>=1;j--)
                                                            { // console.log("Inside for j");
                                                    for(var i=1; i<filters.length;i++)
                                                              {   //console.log("Inside for i");
                                                                //console.log(filters[i].no);
                                                                          if(filters[i].no==j)
                                                                                    { // console.log("Inside if");
                                                                                    //console.log(filters[i].no);
                                                                       
                                                                                      parameters_local = {
                                                                                   
                                                                                location: [parameters.location[0],parameters.location[1]],
                                                                                type: filters[i].type,
                                                                                radius : "10000",
                                                                                rankby : "prominence"                
                                                                                    };
                                                                        //          console.log(filters[i].no);
                                                                                    filters[i].no=0;
                                                                                   
                                                                                    //console.log(filters);
                                                                                    time+=filters[i].time;
//                                                                                    console.log("Time after deleting entry"+i+"is"+time);
                                                                                    break loop;
                                                                                    }
                                                                       
                                                                          
                                                              }
                                                                          
                                                           
                                                           
                                                            }
                                               
                                               
                                               
                                       }
                                   
                                    }
                        else if(time===0)
                                    {
                                    parameters_local=parameters;
//                                    console.log(parameters_local.location);
//                                    console.log(parameters_local.type);
                                    time+=filters[0].time;
//                                    console.log("Time after elseif is"+time);
                                    }
                        else
                                    {
                                    loop: for(var j=4; j>=1;j--)
                                    {   // console.log("Inside for j");
                            for(var i=1; i<filters.length;i++)
                                      { //  console.log("Inside for i");
                                        //console.log(filters[i].no);
                                                  if(filters[i].no==j)
                                                            { // console.log("Inside if");
                                                            //console.log(filters[i].no);
                                                //console.log(array[counter-1].day[counter-1].lat);
                                                              parameters_local = {
                                                           
                                                        location: [parameters.location[0],parameters.location[1]],
                                                        type: filters[i].type,
                                                        radius : "10000",
                                                        rankby : "prominence"                
                                                            };
                                                           
                                                            filters[i].no=0;
                                                           
                                                            //console.log(filters);
                                                            time+=filters[i].time;
//                                                            console.log("Time after deleting entry"+i+"is"+time);
                                                            break loop;
                                                            }
 
                                      }
 
                                    }
               }
                       
                       
            nearBySearch(parameters_local,  function (error, response) {
                         
                        //console.log("Response results length:"+response.results.length);
                        //console.log(Object.keys(response).length);
            	//console.log(response.results[0].photos);
                        for(var i=0;i<response.results.length;i++)
                        {    
                                                var rating1="";                          
                                                var name1=response.results[i].name;
                                                var lat1=response.results[i].geometry.location.lat;
                                                var lng1=response.results[i].geometry.location.lng;
                                                var type1=[]=response.results[i].types;
                                                var time1=filters[counter].time;
                                       var icon=null;
                                       var url=null;
                                    //  console.log(response.results[i].reference);
                                       //console.log(response.results[i].icon);
                                       if(response.results[i].icon!=null)
                                       {
                                                icon=response.results[i].icon;
                                               
                                       }
//                                              if(response.results[i].photos!=null)
//                                                          { 
//                                                          maxwidth=response.results[i].photos[0].width;
//                                                          maxheight=response.results[i].photos[0].height;
//                                                          photo=response.results[i].photos[0].photo_reference;                                                           
//                                                          }
                                                //console.log(type1);
                                                if(response.results[i].rating)
                                                            {
                                                            rating1 = response.results[i].rating;
                                                            }
                                                else
                                                            {
                                                            rating1 ="N.A";
                                                            }
                                                 //console.log(name1);
                                                //url="https://maps.googleapis.com/maps/api/place/photo?maxwidth="+maxwidth+"&photoreference="+photo+"&key="+config.apiKey;
                                                //console.log(url);
                                                item[i]={place : name1, lat: lat1, lng:lng1, rating: rating1, type:type1[0], time1:time1, photo_icon:icon};
                                                //day[counter].push(item[i]);
                                                //console.log(day[counter]);
//                                      console.log("i for Nearbysearch:"+item[i].place);
                                      //console.log(response.results[i].photos[0].width);
                                      //console.log(response.results[i].photos[0].height);
                                      //console.log(response.results[i].photos[0].photo_reference);
                                                //console.log(day[i].place);
                        }
                        var count=0;
                        while(count<no_days)
                                    {         //console.log(count);    
                                         day[count][counter] = item[count];
//                                         console.log("Item inserted"+item[count].place);
                                         count++;                     
                                     }
                       
                         //array[0]=day;
                        //console.log(day[0]);
            // console.log(array[0].day);
                        // console.log(response.results);
                        if (error)
            {
//          throw error;
            callback(error);
                  
            }           
        
       
        var parameters = {
                   location: [day[0][counter].lat,day[0][counter].lng],
                   type: parameters_local.type,
                   radius : "10000",
                   rankby : "prominence"    
               };
                        counter++;
        loop(parameters,time,callback);
    });
  }
            //if (time >= end_time)
            else
     {
            //console.log(array);
                        // console.log(day);
            //console.log(array[0].day.place);
            console.log("end");
            callback({day:day});
     }
}
//function setParams()
//{
//          loop: for(var j=4; j>=1;j--)
//          { // console.log("Inside for j");
//              for(var i=1; i<filters.length;i++)
//             {   console.log("Inside for i");
//               //console.log(filters[i].no);
//                         if(filters[i].no==j)
//                                  {  console.log("Inside if");
//                                  //console.log(filters[i].no);
//                     
//                                     parameters_local = {
//                                 
//                              location: [parameters.location[0],parameters.location[1]],
//                              keyword: filters[i].type,
//                              radius : "1000",
//                              rankby : "prominence"                
//                                  };
//                                  console.log(filters[i].no);
//                                  filters[i].no=0;
//                                 
//                                  console.log(filters);
//                                  return
//                                  break loop;
//                                 
//                                  }
//                       
//                        
//             }
//          }
//}
app.post("/post1", function(req, res) {
 
            var name=req.body.name;
            var lat=req.body.lat;
            var lng=req.body.lng;
            no_days=req.body.no_days;
            var time = 0;
            counter=0;
            item=[];
            day=[[],[],[],[],[],[],[],[],[],[]];
            flag=0;
            var req_filters=[{type: "restaurant", no: req.body.restaurant, time : 90},
                        {type: "adventure", no: req.body.adventure, time : 150},
                        {type: "art", no: req.body.art, time : 90},
                        {type: "nature", no: req.body.nature, time : 150},
                        {type: "shopping", no: req.body.shopping, time : 120},
                        {type: "park", no: req.body.park, time : 90},
                        {type: "religious",  no: req.body.religious, time : 150},
                        {type: "entertainment",  no: req.body.entertainment, time : 150}
                        ];
            filters=req_filters;
            //console.log(filters);
            var parameters = {
                   location: [req.body.lat,req.body.lng],
                   type: filters[0].type,
                   radius : "5000",
                   rankby : "prominence"    
               };
            //last_page=no_days;
    console.log(parameters.location);
            console.log("Post request");
//          Object.keys(filters).forEach(function(key){
//                         console.log(filters.must_see); //key will city the output will be 'Tev Aviv'
//                      });
            loop(parameters,time,function(response)
                                    {
                                                res.send(response);
                                                //res.end("Gottcha");
                                                });       
});
 
 
app.listen(PORT);
console.log("server is running...");