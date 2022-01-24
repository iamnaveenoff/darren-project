// var string = "hi, I need support for apple, android and nokia phones.";

// var keywords = ["apple", "nokia", "android"];

// for (i = 0; i < keywords.length; i++) {
//   var match = string.match(keywords[i]);
//   console.log(match);
// }

// ================================================

// var string = "hi, I need support for apple, android and nokia phones.";

// var keywords = ["apple", "nokia", "android"];

// for (i = 0; i < keywords.length; i++) {
//   var match = string.match(new RegExp(keywords.join("|"), "g"));
//   console.log(match);
// }

// ====================================
// var str = "Basque Homes - Holiday rentals in San Sebastian";
// validatestring = str.toLowerCase();
// console.log(validatestring);

// // It will check word from begginging to the end of the string
// if (validatestring.match(/(^|\W) naveen, rentals($|\W)/)) {
//   console.log("found");
// }

// ======================================================================

// var string = "Stack Overflow - Where Developers Learn, Share, & Build Careers";

// var keywords = ["Developers", "Careers"];

// var results = [];
// for (var i = 0; i < keywords.length; i++) {
//   var match = string.match(new RegExp(keywords.join("|"), "g"));
// }
// if (match.length > 0) {
//   console.log("keyword found");
// }
// console.log("contains: " + match);

// ======================================================================================

const keywordArray = ["Millinocket"];

const stringArray =
  "Baxter Park Inn | Rates as low as $89! Exceptionally clean, quiet hotel in the Katahdin region - Millinocket, Maine";

const result_array = [];

for (let d = 0; d < keywordArray.length; d++) {
  if (stringArray.includes(keywordArray[d])) {
    result_array.push(keywordArray[d]);
  }
}

console.log(result_array);
