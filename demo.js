var request = require("request");
var cheerio = require("cheerio");
const xlsx = require("xlsx");

jsonData = [{ Domain: "blogger.com" }, { Domain: "stackoverflow.com" }];
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
      var keywords = ["Developers", "beautiful"];

      var results = [];
      for (let i = 0; i < keywords.length; i++) {
        if (title.includes(keywords[i])) {
          results.push(keywords[i]);
        }
      }
      // console.log(match);

      if (results.length > 0) {
        UrlArray.push({
          Domain: url,
          Keywords: "" + results + "",
          Title: title,
          Output: output,
        });
        console.log(UrlArray);
        // finalJsonData = JSON.stringify(UrlArray);
        const ws = xlsx.utils.json_to_sheet(UrlArray);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Responses");
        xlsx.writeFile(wb, "output.xlsx");
      }
    } else {
      console.log(
        `Error = ${error}, code = ${response && response.statusCode}`
      );
    }

    console.log(`output = ${output} \n\n`);

    if (onComplete) onComplete(output);
  });
}

jsonData.forEach(function (table) {
  var tableName = table.Domain;
  var URL = "http://" + tableName;
  fetchTitle(URL);
});
