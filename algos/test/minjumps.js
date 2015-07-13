var count = (function minjumps(algos) {
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
        assert(String(expected), String(algos.minjumps(arr)));
    }

    TC([2, 3, 1, 1, 2, 4, 2, 0, 1, 1], [0, 1, 4, 5, 9]);
    TC([1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9], [0, 1, 3, 10]);
    TC([1, 3, 5, 3, 2, 2, 6, 1, 6, 8, 9], [0, 1, 2, 6, 10]);
    TC([2, 8, 3, 6, 9, 3, 0, 0, 1, 3], [0, 1, 9]);
    TC([1, 5, 4, 6, 9, 3, 0, 0, 1, 3], [0, 1, 3, 9]);
    TC([2, 3, 1, 1, 4], [0, 1, 4]);
    TC([1, 1, 2, 3, 1, 4], [0, 1, 2, 3, 5]);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
