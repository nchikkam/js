var count = (function maxsubseqsum(algos) {
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

    function TC(arr, expected) {
        assert(String(expected), String(algos.maxsubseqsum(arr)));
    }

    
    TC([-2, 1, -3, 4, -1, 2, 1, -5, 4], [4, -1, 2, 1]);
    TC([3, -1, 5, 3, -6, -9, 6, 1],     [3, -1, 5, 3]);
    TC([3, -1, 5, 3, -6, -9, 6, 3],     [3, -1, 5, 3]);
    TC([20, -1, 5, 3, -6, -9, 6],       [20, -1, 5, 3]);
    TC([-1, 2, 5, -1, 3, -2, 1],        [2, 5, -1, 3]);
    TC([10, -2, 15, 9, -8, 12, 20, -5], [10, -2, 15, 9, -8, 12, 20]);
    TC([7, 1, 3, 1, 4, 5, 1, 3, 6],     [7, 1, 3, 1, 4, 5, 1, 3, 6]);
    TC([3, -1, -1, -1, -1, -1, 2, 0, 0, 0], [3]);
    TC([-1, 3, -5, 4, 6, -1, 2, -7, 13, -3], [4, 6, -1, 2, -7, 13]);
    TC([-6,-2,-3,-4,-1,-5,-5], [-1]);  // special case for Kadane's algo.

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
