// var XLSX = require("xlsx");
// var request = require("request");
// var cheerio = require("cheerio");

// var workbook = XLSX.readFile("test.xlsx");
// var sheet_name_list = workbook.SheetNames;
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// var jsonData = JSON.stringify(xlData);
// finalData = JSON.parse(jsonData);

// console.log(finalData);

var request = require("request");
function handler(req, res) {
  request("http://www.bar-n-ranch.com", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("URL is OK"); // Print the google web page.
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("URL is OK");
    } else {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("URL broke:" + JSON.stringify(response, null, 2));
    }
  });
}

require("http").createServer(handler).listen(4000);
