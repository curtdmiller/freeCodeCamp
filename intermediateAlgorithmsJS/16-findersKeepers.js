/* Finders Keepers
 * Create a function that looks through an array (first argument) and returns
 * the first element in the array that passes a truth test (second argument).
 */

function findElement(arr, func) {
    var filtered = arr.filter(func);
    return filtered[0];
}

findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; }); // should return 2
findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }); // should return 8.
findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; }); // should return undefined.
