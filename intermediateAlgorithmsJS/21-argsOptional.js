/* Arguments Optional
*
* Create a function that sums two arguments together. If only one argument is
* provided, then return a function that expects one argument and returns the sum.
*
* For example, addTogether(2, 3) should return 5, and addTogether(2) should
* return a function.
*
* Calling this returned function with a single argument will then return the sum:
*
* var sumTwoAnd = addTogether(2);
*
* sumTwoAnd(3) returns 5.
*
* If either argument isn't a valid number, return undefined.
*/

function addTogether() {
    var args = Array.from(arguments);
    for (var i = 0, l = args.length; i < l; i++) {
        if (typeof args[i] !== 'number') return undefined;
    }
    if(args.length > 1) {
        return arguments[0] + arguments[1];
    } else {
        return function adder(addend){
            if(typeof addend !== 'number'){
                return undefined;
            } else {
                return args[0] + addend; // cannot use arguments[0] here, calls arguments again when adder is called
            }
        };
    }
}

// addTogether(2, 3); // should return 5.
console.log(addTogether(2,3));
// addTogether(2)(3); // should return 5.
console.log(addTogether(2)(3));
// addTogether("http://bit.ly/IqT6zt"); // should return undefined.
console.log(addTogether("http://bit.ly/IqT6zt"));
// addTogether(2, "3"); // should return undefined.
console.log(addTogether(2, "3"));
// addTogether(2)([3]); // should return undefined.
console.log(addTogether(2)([3]));
