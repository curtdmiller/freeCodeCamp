/*
 * Sorted Union
 * Write a function that takes two or more arrays and returns a new array of
 * unique values in the order of the original provided arrays.
 *
 * In other words, all values present from all arrays should be included in
 * their original order, but with no duplicates in the final array.
 *
 * The unique numbers should be sorted by their original order, but the final
 * array should not be sorted in numerical order.
 *
 * Check the assertion tests for examples.
 */

function uniteUnique(arr) {
    var args = Array.prototype.slice.call(arguments); // create arguments array
    var union = args.reduce(function(acc, curr){
        var unique = [];
        for (var i = 0, length = curr.length; i < length ; i++) {
            if(acc.indexOf(curr[i]) === -1) { // if curr does not exist in acc array push to unique
                unique.push(curr[i]);
            }
        }
        return acc.concat(unique);
    }, []); // [] is the initial value
    return union;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]); // should return [1, 3, 2, 5, 4].
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]); // should return [1, 3, 2, [5], [4]].
uniteUnique([1, 2, 3], [5, 2, 1]); // should return [1, 2, 3, 5].
uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]); // should return [1, 2, 3, 5, 4, 6, 7, 8].
