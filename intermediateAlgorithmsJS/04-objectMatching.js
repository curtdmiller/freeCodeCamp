/*
 * Wherefore art thou
 *
 * Make a function that looks through an array of objects (first argument) and
 * returns an array of all objects that have matching property and value pairs
 * (second argument). Each property and value pair of the source object has to
 * be present in the object from the collection if it is to be included in the
 * returned array.
 *
 * For example, if the first argument is [{ first: "Romeo", last: "Montague" },
 * { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], and
 * the second argument is { last: "Capulet" }, then you must return the third
 * object from the array (the first argument), because it contains the property
 * and its value, that was passed on as the second argument.
 */

function whatIsInAName(collection, source) {
    // What's in a name?
    var arr = [];
    // Only change code below this line
    var keys = Object.keys(source);
    for (var i = 0, length = collection.length; i < length; i++) { // for each object in collection
        var equivalent = true; // innocent until proven guilty
        for(var j = 0, kLength = keys.length; j < kLength; j++) { //for each key
            if(collection[i].hasOwnProperty(keys[j]) === false){ // current object doesn't have current key
                equivalent = false; // rejected
            } else if(collection[i][keys[j]] != source[keys[j]]) { // current object has key but not property
                equivalent = false; // rejected
            }
        }
        if (equivalent === true) {
            arr.push(collection[i]); // current collection has all source key:property pairs
        }
    }
    // Only change code above this line
    return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }); // should return [{ first: "Tybalt", last: "Capulet" }].
whatIsInAName([{ "a": 1 }, { "a": 1 }, { "a": 1, "b": 2 }], { "a": 1 }); // should return [{ "a": 1 }, { "a": 1 }, { "a": 1, "b": 2 }].
whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 }); // should return [{ "a": 1, "b": 2 }, { "a": 1, "b": 2, "c": 2 }].
whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "c": 2 }); // should return [{ "a": 1, "b": 2, "c": 2 }].
