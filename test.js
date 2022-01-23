const xlsx = require("xlsx");

const json = [
  {
    id: 1,
    color: "red",
    number: 75,
  },
  {
    id: 2,
    color: "blue",
    number: 62,
  },
  {
    id: 3,
    color: "yellow",
    number: 93,
  },
];
var UrlArray = [];
console.log(UrlArray);
// for (var i = 0; i < 10; i++) {
//   // console.log("added index " + i);
// }

var workbook = xlsx.readFile("test.xlsx");
var sheet_name_list = workbook.SheetNames;
var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var jsonData = JSON.stringify(xlData);
finalData = JSON.parse(jsonData);
// console.log(finalData);

finalData.forEach(function (table) {
  var tableName = table.Domain;
  UrlArray.push({ Domain: tableName });
  // console.log("http://" + tableName);
});

console.log(UrlArray);

// finalJsonData = JSON.stringify(UrlArray);
const ws = xlsx.utils.json_to_sheet(UrlArray);
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, "Responses");
xlsx.writeFile(wb, "output.xlsx");
