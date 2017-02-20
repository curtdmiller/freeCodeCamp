/*
 * Title Case a Sentence
 *
 * Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.
 *
 * For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".
 */


 function titleCase(str) {
   str = str.toLowerCase();
   var strArray = str.split(" ");

   for (var i = 0, length = strArray.length; i < length; i++) {
     var word = strArray[i].split('');
     word[0] = word[0].toUpperCase();
     
     strArray[i] = word.join('');
   }
   str = strArray.join(' ');

   return str;
 }

 titleCase("I'm a little tea pot") // should return "I'm A Little Tea Pot".
 titleCase("sHoRt AnD sToUt") // should return "Short And Stout".
 titleCase("HERE IS MY HANDLE HERE IS MY SPOUT") // should return "Here Is My Handle Here Is My Spout".
