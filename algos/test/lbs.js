var count = (function lbs(algos) {
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

    function TC(seq, expected) {
        assert(String(expected), String(algos.lbs(seq)));
    }

    TC([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], 7);
    TC([1, 4, 3, 7, 2, 1, 8, 11, 13, 0], 7);
    TC([9, 10, 1, 3, 5, 8, 2, 1, 7, 5, 3, 1], 8);
    TC([9, 10, 3, 1, 2], 4);
    TC([3, 0, 1, 4, 2, -1], 5);
    TC([4, 2, 1, 5, 7, 3, 1, 4, 7, 8, 2, 1, 3, 2], 7);  // we count equals as well. 
    TC([1, 2, 4, 6, 8, 7, 5, 4, 3, 2, 1], 11);
    TC([1, 11, 2, 10, 4, 5, 2, 1], 6);
    TC([12, 11, 40, 5, 3, 1], 5);
    TC([80, 60, 30, 40, 20, 10], 5);
    TC([1, 3, 2, 7, 4, 6, 8, 9], 6);
    TC([7, 4, 8, 9, 3, 5, 2, 1], 6);
    TC([1, 4, 6, 8, 3, -2], 6);
    TC([9, 2, -4, -10, -5], 4);
    TC([1, 2, 3, 4], 4);
    TC([9, 10, 1, 3, 5, 8, 2, 1, 7, 5, 3, 1], 8);
    TC([3, 1, 2, 5, 2, 6, 8, 6, 7, 3, 5], 7);


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;