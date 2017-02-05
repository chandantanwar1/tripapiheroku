//async.whilst(function () {
//  return page <= lastPage;
//},
//function (next) {
// console.log(page);
//  page++;
//  next();
//},
//function (err) {
//  // All things are done!
//});
var page = 2;
var last_page = 100;

(function loop() {
    if (page <= last_page) {
       console.log(page);
        page++;
        loop();
    }
}());


(function loop() {
    if (page <= last_page) {
        request("/data?page=" + page, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                store_data(body)
            }
            page++;
            loop();
        });
    }
}());