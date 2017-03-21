/* Sum All Primes
 *
 * Sum all the prime numbers up to and including the provided number.
 *
 * A prime number is defined as a number greater than one and having only two
 * divisors, one and itself. For example, 2 is a prime number because it's only
 * divisible by one and two.
 *
 * The provided number may not be a prime.
 */

function sumPrimes(num) {
    var primes = [];
    var sum;
    for(var i = 2; i <= num; i++){ // for integers from 2 up to and including num
        var pTest = true;
        for(j = 2; j < i && pTest === true; j++){ // for 2 up to i while pTest is still true
            if(i%j === 0) { // if divisible by current number
                pTest = false; // not prime
            }
        }
        if (pTest) {
            primes.push(i);
        }
    }
    sum = primes.reduce(function(acc, val){
        return acc + val;
    },0);
    return sum;
}

sumPrimes(10); // should return 17.
sumPrimes(977); // should return 73156.
