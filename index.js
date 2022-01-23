var request = require("request");
var cheerio = require("cheerio");
var XLSX = require("xlsx");
var express = require("express");
var app = express();

app.get("/", (req, res, next) => {
  res.json("Welcome Application Started Successfully!!!...");
});

app.get("/start", (req, res, next) => {
  function fetchTitle(url, onComplete = null) {
    request(url, function (error, response, body) {
      var output = url; // default to URL
      if (!error && (response && response.statusCode) === 200) {
        var $ = cheerio.load(body);
        console.log(`URL = ${url}`);

        var title = $("head > title").text().trim();
        console.log(`Title = ${title}`);

        output = `[${title}] (${url})`;
        res.json([output]);
      } else {
        console.log(
          `Error = ${error}, code = ${response && response.statusCode}`
        );
      }

      if (onComplete) onComplete(output);
    });
  }

  var workbook = XLSX.readFile("original.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  var jsonData = JSON.stringify(xlData);
  finalData = JSON.parse(jsonData);
  finalData.forEach(function (table) {
    var tableName = table.Domain;
    // console.log("http://" + tableName);

    fetchTitle("http://" + tableName);
  });

  //   fetchTitle("http://www.bassmaster.com");
});

app.listen(3000, () => {
  //   console.log("Server running on port 3000");
  console.log("Application started and Listening on port 3000");
});
