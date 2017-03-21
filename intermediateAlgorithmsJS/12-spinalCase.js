/* Spinal Tap Case
 *
 * Convert a string to spinal case. Spinal case is
 * all-lowercase-words-joined-by-dashes.
 */


function spinalCase(str) {
    function replacer(match, p1, p2, p3, offset) {
        if (p1 || p2) return (offset ? '-' : '') + match.toLowerCase();
        if (p3) return '';
    }
    reg = /([A-Z])|(\b[a-z0-9])|([^A-Za-z0-9]+)/g; // (capital) or (lowercase/number after boundary) or (not alphanumeric)
    return str.replace(reg, replacer);
}

spinalCase("This Is Spinal Tap"); // should return "this-is-spinal-tap".
spinalCase("thisIsSpinalTap"); // should return "this-is-spinal-tap".
spinalCase("The_Andy_Griffith_Show"); // should return "the-andy-griffith-show".
spinalCase("Teletubbies say Eh-oh"); // should return "teletubbies-say-eh-oh".
spinalCase("AllThe-small Things"); // should return "all-the-small-things".
