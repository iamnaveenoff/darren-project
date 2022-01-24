var XLSX = require("xlsx");
var request = require("request");
var cheerio = require("cheerio");

var workbook = XLSX.readFile("original.xlsx");
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var jsonData = JSON.stringify(xlData);
finalData = JSON.parse(jsonData);
var UrlArray = [];
console.log("Before: " + UrlArray);
function fetchTitle(url, onComplete = null) {
  request(url, function (error, response, body) {
    var output = url; // default to URL
    if (!error && (response && response.statusCode) === 200) {
      var $ = cheerio.load(body);
      console.log(`URL = ${url}`);

      var title = $("head > title").text().trim();
      console.log(`Title = ${title}`);
      output = `[${title}] (${url})`;

      var keywords = [
        "travel",
        "travel guides",
        "destination",
        "destinations",
        "hotel reviews",
        "travel tips",
        "guides",
        "accommodations",
        "lifestyle",
        "travel checklist",
        "travel blog",
        "city guides",
      ];
      var results = [];
      for (let i = 0; i < keywords.length; i++) {
        if (title.includes(keywords[i])) {
          results.push(keywords[i]);
        }
      }
      if (results.length > 0) {
        UrlArray.push({
          Domain: url,
          Keywords: "" + results + "",
          Title: title,
          Output: output,
        });
        console.log(UrlArray);
        const ws = XLSX.utils.json_to_sheet(UrlArray);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Responses");
        XLSX.writeFile(wb, "output.xlsx");
      }
    } else {
      console.log(
        `Error = ${error}, code = ${response && response.statusCode}`
      );
    }

    if (onComplete) onComplete(output);
  });
}
finalData.forEach(function (table) {
  var tableName = "http://" + table.Domain;
  fetchTitle(tableName);
});
