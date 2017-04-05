/* Exact Change
 *
 * Design a cash register drawer function checkCashRegister() that accepts
 * purchase price as the first argument (price), payment as the second argument
 * (cash), and cash-in-drawer (cid) as the third argument.
 *
 * cid is a 2D array listing available currency.
 *
 * Return the string "Insufficient Funds" if cash-in-drawer is less than the
 * change due. Return the string "Closed" if cash-in-drawer is equal to the change due.
 *
 * Otherwise, return change in coin and bills, sorted in highest to lowest order.
 */

 function checkCashRegister(price, cash, cid) {
     price *= 100; // just say no to floating point math
     cash *= 100;
     var rem = cash - price;
     var change = [];
     var closed = true;
     var Units = {
         'PENNY': 1,
         'NICKEL': 5,
         'DIME': 10,
         'QUARTER': 25,
         'ONE': 100,
         'FIVE': 500,
         'TEN': 1000,
         'TWENTY': 2000,
         'FIFTY': 5000,
         'ONE HUNDRED': 10000
     };
     for(var i = cid.length - 1; i >= 0; i--) { // for each denomination, from large to small
         var den = cid[i][0]; // get the denomination name
         var available = parseInt(cid[i][1] * 100); // amount of cash in den, in cents.
         var used = 0;
         while (rem >= Units[den] && available > 0) { // while remainder > one unit of den, and that den is available
             rem -= Units[den]; // subtract the amount of one unit of denomination
             available -= Units[den];
             used++;
         }
         if (used) { // if this denomination has been used
             change.push([den, used * Units[den] / 100]); // add to array
         }
         if (available) { // if any are left
             closed = false; // not closed
         }
     }
     if (rem !== 0) {
         return 'Insufficient Funds';
     } else if (closed) {
         return 'Closed';
     } else {
         // Here is your change, ma'am.
         return change;
     }
 }

 // Example cash-in-drawer array:
 // [["PENNY", 1.01],
 // ["NICKEL", 2.05],
 // ["DIME", 3.10],
 // ["QUARTER", 4.25],
 // ["ONE", 90.00],
 // ["FIVE", 55.00],
 // ["TEN", 20.00],
 // ["TWENTY", 60.00],
 // ["ONE HUNDRED", 100.00]]

 checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]); // should return an array.
 checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return a string.
 checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return a string.
 checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]); // should return [["QUARTER", 0.50]].
 checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]); // should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].
 checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return "Insufficient Funds".
 checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return "Insufficient Funds".
 checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]); // should return "Closed".
