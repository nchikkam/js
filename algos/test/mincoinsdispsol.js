var count = (function mincoinsdispsol(algos) {
    var start = +new Date(),
        log,
        error,
        undefined,
        passed = 0,
        total = 0;

    if (typeof window === 'undefined') {
        log = console.log;
        error = console.error;
    } else {
        log = function (str) { document.body.innerHTML += str.replace('\n', '<br>') };
        error = function (str) { document.body.innerHTML += '<div style="color: red">' +
          str.replace('\n', '<br>') + '</div>' };
    }

    if (!algos && typeof require === 'function') algos = require('../algos');

    function assert(expected, actual) {
        total++;
        if (expected !== actual) {
           error('\n Test number: ' + total + ' failed');
           error(' Expected: ' + expected);
           error(' Actual:   ' + actual);
        }
        else {
            passed++;
        }
    }

    function TC(coins, total, expected) {
        assert(String(expected), String(algos.mincoinsdispsol(coins, total)));
    }

    TC([1, 5, 6, 8], 11, [6, 5]);
    TC([1, 4, 6], 8, [4, 4]);
    TC([1,3,4,6,7,9], 15, [9, 6]);
    TC([1,2,3], 5, [3, 2]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 44, [22, 22]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 45, [23, 22]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 46, [23, 23]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 47, [25, 22]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 48, [25, 23]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 49, [17, 16, 16]);
    TC([1, 2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 22, 23, 25, 28, 31, 34, 37, 43], 43, [43]);
    TC([1, 2, 5, 10], 9, [5, 2, 2]);
    TC([1, 5, 10], 9, [5, 1, 1, 1, 1]);   // nice case :)
    TC([1, 10], 10, [10]);
    TC([1, 2, 5, 10, 56], 66, [56, 10]);
    

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;