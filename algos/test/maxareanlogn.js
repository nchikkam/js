var count = (function maxareanlogn(algos) {
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

    function TC(arr, left, right, expected) {
        assert(String(expected), String(algos.maxareanlogn(arr, left, right)));
    }

    TC([6, 2, 5, 4, 5, 2, 6], 0, 6, 14);  // histogram, leftPos, rightPos, expected ////
    TC([7, 4], 0, 1, 8);
    TC([2,2,2,6,1,5,4,2,2,2,2], 0, 10, 12);
    TC([1, 3, 5, 8, 5, 4, 6, 7, 5, 2, 1, 0], 0, 11, 28);
    TC([2, 1, 4, 5, 1, 3, 3], 0, 6, 8);
    TC([1000, 1000, 1000, 1000], 0, 3, 4000);
    TC([100, 80, 60, 70, 60, 75, 85], 0, 6, 420);
    TC([1, 0], 0, 1, 1);
    TC([1, 2], 0, 1, 2);
    TC([1, 2, 3], 0, 2, 4);
    TC([1, 2, 3, 3, 2, 1], 0, 5, 8);
    

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
