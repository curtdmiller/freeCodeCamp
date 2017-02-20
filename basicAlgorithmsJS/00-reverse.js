// reverse a given string

function reverseString(str) {
  var strArray = str.split('');
  strArray.reverse();
  str = strArray.join('');
  return str;
}

reverseString("hello");
console.log(reverseString("hello"));
