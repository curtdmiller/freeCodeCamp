/* Factorialize a Number
 * Return the factorial of the provided integer.
 *
 * factorialize(5) should return a number.
 * factorialize(5) should return 120.
 * factorialize(10) should return 3628800.
 * factorialize(20) should return 2432902008176640000.
 * factorialize(0) should return 1.
 */


function factorialize(num) {
  var fac = 1;
  for (var i = 0; i < num; i++){
    fac *= i+1;
  }
  return fac;
}

factorialize(5);
