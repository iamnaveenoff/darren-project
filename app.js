var XLSX = require("xlsx");
var request = require("request");
var cheerio = require("cheerio");

var workbook = XLSX.readFile("test.xlsx");
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var jsonData = JSON.stringify(xlData);
finalData = JSON.parse(jsonData);
var UrlArray = [];
function fetchTitle(url, onComplete = null) {
  request(url, function (error, response, body) {
    var output = url; // default to URL
    if (!error && (response && response.statusCode) === 200) {
      var $ = cheerio.load(body);
      console.log(`URL = ${url}`);

      var title = $("head > title").text().trim();
      console.log(`Title = ${title}`);
      output = `[${title}] (${url})`;
      validateTitle = title.toLowerCase();
      if (
        validateTitle.match(
          /(^|\W)'travel', 'travel guides', 'destination', 'destinations', 'hotel reviews', 'travel tips', 'guides', 'accommodations', 'lifestyle', 'travel checklist', 'travel blog', 'city guides' ($|\W)/
        )
      ) {
        this.UrlArray.push({ Domain: url });
        const ws = XLSX.utils.json_to_sheet(this.UrlArray);
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
  var tableName = table.Domain;
  //   console.log("http://" + tableName);
  UrlArray.push("http://" + tableName);
  try {
    fetchTitle("http://" + tableName);
  } catch (error) {
    // const ws = XLSX.utils.json_to_sheet(JSON.stringify(UrlArray));
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Responses");
    // XLSX.writeFile(wb, "output.xlsx");
    console.log("its not working");
  }
});
