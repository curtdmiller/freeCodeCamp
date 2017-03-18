/* Pig Latin
 * Translate the provided string to pig latin.
 *
 * Pig Latin takes the first consonant (or consonant cluster) of an English
 * word, moves it to the end of the word and suffixes an "ay".
 *
 * If a word begins with a vowel you just add "way" to the end.
 *
 * Input strings are guaranteed to be English words in all lowercase.
 */

 function translatePigLatin(str) {
    var reg = str.search(/[aeiou]/i);
    if (reg === 0) {
        str = str + 'way';
    } else {
        var end = str.substr(0, reg);
        str = str.substr(reg);
        str += end + 'ay';
    }
    return str;
 }

 translatePigLatin("consonant");
 translatePigLatin("california"); // should return "aliforniacay".
 translatePigLatin("paragraphs"); // should return "aragraphspay".
 translatePigLatin("glove"); // should return "oveglay".
 translatePigLatin("algorithm"); // should return "algorithmway".
 translatePigLatin("eight"); // should return "eightway".
