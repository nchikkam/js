var count = (function dominator(algos) {
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
        assert(String(expected), String(algos.dominator(arr)));
    }

    TC([2, 2, 3, 5, 2, 2, 6], 2);
    TC([2, 2, 3, 3, 3, 5, 5], -1);  // no dominator
    TC([3, 67, 23, 67, 67], 67);
    TC([1, 3, 6, 7, 6, 8, 6, 6], -1);
    TC([1, 3, 3, 1,1,1,2,3,1,2,1,1], 1);
    TC([-1, 3, 4, 3, 2, 2, 3, -1, 3, 3], -1);
    TC([3, 67, 23, 67, 67], 67);
    TC([3, 67, 23, 67, 23, 67, 23, 1, 23, 23, 1], -1);
    TC([3, 67, 23, 67, 23, 67, 23, 1, 23, 23, 1, 1, 1, 1, 1], -1);
    TC([7, 4, 8, 2, 4, -1, 4, 4, 4, 4, 6, 4], 4);
    TC([0, 2, 2, 4, 0, 2, 0, 0, 2, 2, 2, 8, 2, 2, 2, 0, 0, 2], 2);
    TC([0, 2, 2, 4, 0, 2, 0, 0, 2, 2, 2, 8, 2, 2, 2, 0, 0, 0], -1);
    TC([1, 2, 3, 4], -1);
    TC([1, 0, 1, 1], 1);


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
