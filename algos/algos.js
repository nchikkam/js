;(function (global) {
    'use strict';

    var algos;

    function another() {
        algos = {
            isPrime: function (n){
                //check simple cases
                if (n == 2 || n == 3)
                    return true;
                if (n % 2 == 0)
                    return false;

                var divisor = 3, 
                  limit = Math.sqrt(n);

                for (;divisor <= limit;divisor += 2){
                    if (n % divisor == 0)
                        return false;
                }
                return true;
            },

            primeFactors: function(num) {
                num = Math.floor(num);
                var root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num;
                while( doLoop ){
                    root = sqrt(num);
                    x = 2;
                    if (num % x) {
                        x = 3;
                        while ((num % x) && ((x += 2) < root));
                    }
                    x = (x > root) ? num : x;
                    factors.push(x);
                    doLoop = ( x != num );
                    num /= x;
                }
                return factors;
            },

            fibonacci: (function(n) {
                var memo = {};   // Memoization
                function fib(n) {
                    var value;

                    if (n in memo) {
                        value = memo[n];
                    } else {
                        if (n === 0 || n === 1)
                            value = n;
                        else
                            value = fib(n - 1) + fib(n - 2);
                        memo[n] = value;
                    }
                    return value;
                }
                return fib;
            })(),

            gcd: function(a,b) {
                a = Math.abs(a);
                b = Math.abs(b);

                if (b > a) {
                    var temp = a;
                    a = b;
                    b = temp; 
                }

                while (true) {
                    a %= b;
                    if (a === 0) { return b; }
                    b %= a;
                    if (b === 0) { return a; }
                }
            },

            gcd_array: function(arr) {
                var i, y,
                  n = arr.length,
                  x = Math.abs(arr[0]);

                for (i = 1; i < n; i++) {
                    y = Math.abs(arr[i]);

                    while (x && y) {
                      (x > y) ? x %= y : y %= x;
                    }
                    x += y;
                }
                return x;
            },


            unique: function(arr) {
                var lookup = {},
                    ret = [];

                for(var i =0; i < arr.length; i++){
                    if (!lookup[arr[i]]){
                        lookup[arr[i]] = true;
                        ret.push(arr[i]);
                    }
                }
                return ret;
            },

            merge: function(a, b){  // merge two sorted arrays
                var merged = [], 
                  aElm = a[0],
                  bElm = b[0],
                  i = 1,
                  j = 1;

                if(a.length ==0)
                    return b;
                if(b.length ==0)
                    return a;
                /* 
                if aElm or bElm exists we will insert to merged array
                (will go inside while loop)
                to insert: aElm exists and bElm doesn't exists
                         or both exists and aElm < bElm
                this is the critical part of the example            
                */
                while(aElm || bElm){
                    if((aElm && !bElm) || aElm < bElm){
                     merged.push(aElm);
                     aElm = a[i++];
                    }   
                    else {
                         merged.push(bElm);
                         bElm = b[j++];
                    }
                }
                return merged;
            }



        }; //algo object



        return algos;
    }

    // EXPORT
    algos = another();

    // AMD.
    if ( typeof define == 'function' && define.amd ) {
        define( function () { return algos; } );

    // Node and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = algos;

    // Browser.
    } else {
        global.algos = algos;
    }
})(this);