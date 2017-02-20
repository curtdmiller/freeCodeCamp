/*
 * Falsy Bouncer
 *
 * Remove all falsy values from an array.
 *
 * Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
 */



function bouncer(arr) {
    arr = arr.filter(function(val){
        return val;

        // less concise but also works:
        // return (val !== false && val !== null && val !== 0 && val !== "" && val !== undefined && !Number.isNaN(val));
        // note that normal global isNaN() fails because it returns true for strings as it tries to forcibly convert to a number
        // and val != undefined will also return false for null, but this is clearer
    })
}

bouncer([7, "ate", "", false, 9]); // should return [7, "ate", 9].
bouncer(["a", "b", "c"]); // should return ["a", "b", "c"].
bouncer([false, null, 0, NaN, undefined, ""]); // should return [].
bouncer([1, null, NaN, 2, undefined]); // should return [1, 2].
