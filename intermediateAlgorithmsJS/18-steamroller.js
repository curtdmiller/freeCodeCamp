/* Steamroller
*
* Flatten a nested array. You must account for varying levels of nesting.
*/

function steamrollArray(arr) {
    function flatten(a) {
        var flat = a.reduce(function(acc, val){
            if(!Array.isArray(val)){ // if not array
                return acc.concat(val); // concatenate current val to accumulated array
            } else { // if isArray
                return acc.concat(flatten(val)); // recursion! ...retest isArray until false and concatenate
            }
        }, []);
        return flat;
    }
    return flatten(arr);
}

steamrollArray([[["a"]], [["b"]]]); // should return ["a", "b"].
steamrollArray([1, [2], [3, [[4]]]]); // should return [1, 2, 3, 4].
steamrollArray([1, [], [3, [[4]]]]); // should return [1, 3, 4].
steamrollArray([1, {}, [3, [[4]]]]); // should return [1, {}, 3, 4].
