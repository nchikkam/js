var count = (function subsetsum(algos) {
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

    function TC(arr, sum, expected) {
        assert(String(expected), String(algos.subsetsum(arr, sum)));
    }

    TC([3, 34, 4, 12, 5, 2], 9, [4, 5]);
    TC([3, 34, 4, 12, 5, 2], 7, [3, 4]);
    TC([3, 34, 4, 12, 5, 2], 17, [5, 12]);
    TC([3, 34, 4, 12, 5, 2], 38, [4, 34]);
    TC([3, 34, 4, 12, 5, 2], 20, [3, 5, 12]);
    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
