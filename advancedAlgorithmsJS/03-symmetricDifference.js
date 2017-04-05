/* Symmetric Difference
 *
 * Create a function that takes two or more arrays and returns an array of the
 * symmetric difference (△ or ⊕) of the provided arrays.
 *
 * Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the
 * mathematical term "symmetric difference" of two sets is the set of elements
 * which are in either of the two sets, but not in both (A △ B = C = {1, 4}).
 * For every additional symmetric difference you take (say on a set D = {2, 3}),
 * you should get the set with elements which are in either of the two the sets
 * but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).
 */

function sym(args) {
    args = Array.from(arguments);
    args = args.reduce(function(acc, cur){
        cur = cur.filter(function(val, i){
            return cur.indexOf(val) === i; // deduplicate array
        });
        var diff = [];
        for(var i = 0, l = cur.length; i < l; i++){ // for each element of cur
            var loc = acc.indexOf(cur[i]);
            if (loc === -1) { // if not in acc
                diff.push(cur[i]); // push to diff
            } else {
                acc.splice(loc, 1); // else don't push and remove el of acc
            }
        }
        return acc.concat(diff); // return combination of filtered acc and new unique elements
    },[]);
    return args.sort(); // return sorted version
}

sym([1, 2, 3], [5, 2, 1, 4]); // should return [3, 4, 5].
sym([1, 2, 3], [5, 2, 1, 4]); // should contain only three elements.
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]); // should return [1, 4, 5]
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]); // should contain only three elements.
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]); // should return [1, 4, 5].
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]); // should contain only three elements.
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]); // should return [2, 3, 4, 6, 7].
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]); // should contain only five elements.
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]); // should return [1, 2, 4, 5, 6, 7, 8, 9].
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]); // should contain only eight elements.
