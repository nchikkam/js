var count = (function lissnlogn(algos) {
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
        assert(String(expected), String(algos.lissnlogn(arr)));
    }

    TC([23,10,22,5,33,8,9,21,50,41,60,80,99, 22,23,24,25,26,27], [5,8,9,21,22,23,24,25,26,27]);
    TC([3, 4, -1, 0, 6, 2, 3], [-1, 0, 2, 3]);
    TC([0, 7, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], [0,2,6,9,11,15]);
    TC([1, 7, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], [1,2,6,9,11,15]);
    TC([3, 2, 6, 4, 5, 1], [2, 4, 5]);
    TC([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], [0, 2, 6, 9, 11, 15]);
    TC([2, 5, 3, 7, 11, 8, 10, 13, 6], [2,3,7,8,10,13]);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
