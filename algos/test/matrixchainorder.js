var count = (function matrixchainorder(algos) {
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
        assert(String(expected), String(algos.matrixchainorder(arr)));
    }

    TC([2, 3, 6, 4, 5], 124);    // matrix with: 2X3, 3X6, 6X4, 4X5
    
    TC([10, 30, 5, 60], 4500);
    TC([10, 100, 5, 30], 6500);
    TC([1, 2, 3, 4, 3], 30);
    TC([1, 2, 3, 4], 18);
    TC([10, 100, 5, 50], 7500);
    TC([30, 35, 15, 5, 10, 20, 25], 15125);  // CLR's Excercise.
    

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;