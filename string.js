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
var str = "Hi, Its Stack | - over flow and stackoverflow Rocks.";
// var data = str.toLocaleLowerCase;
const yourString = "DOGS ARE BETTER THAN CATS.";

validatestring = str.toLowerCase();
console.log(validatestring);

// It will check word from begginging to the end of the string
if (validatestring.match(/(^|\W)stack ($|\W)/)) {
  console.log("found");
}
