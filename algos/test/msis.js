var count = (function msis(algos) {
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
        assert(String(expected), String(algos.msis(arr)));
    }

    
    TC([1, 101, 2, 3, 100, 4, 5], [1, 2, 3, 100]);
    TC([3, 4, 5, 10], [3, 4, 5, 10]);
    TC([10, 5, 4, 3], [10]);
    TC([50, 23, 1, 67, 30], [50, 67]);
    TC([9, 15, 11, 3, 12, 10], [9, 11, 12]);
    TC([3, 5, 9, 1, 2, 6, 8, 10, 4], [3, 5, 6, 8, 10]);
    TC([1, 101, 10, 2, 3, 100, 4], [1, 10, 100]); 
    TC([4, 6, 1, 3, 8, 4, 6], [4,6,8]);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;