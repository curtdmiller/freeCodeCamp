/* Missing letters
 *
 * Find the missing letter in the passed letter range and return it.
 *
 * If all letters are present in the range, return undefined.
 */

function fearNotLetter(str) {
    for(var i = 1, length = str.length; i < length; i++) {
        if (str.charCodeAt(i) !== str.charCodeAt(i - 1) + 1) { // if current char is not previous char plus one
            return String.fromCharCode(str.charCodeAt(i - 1) + 1); // return prev char + 1
        }
    }
    return undefined;
}

fearNotLetter("abce"); // should return "d".
fearNotLetter("abcdefghjklmno"); // should return "i".
fearNotLetter("bcd"); // should return undefined.
fearNotLetter("yz"); // should return undefined.
