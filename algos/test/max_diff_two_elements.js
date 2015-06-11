var count = (function max_diff_two_elements(algos) {
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
        assert(String(expected), String(algos.max_diff_two_elements(arr)));
    }

    TC( [2, 3, 10, 2, 4, 8, 1], 8);  // 10 - 2, 10 appears on right of 2
    TC([7, 9, 5, 6, 3, 2], 2);       // 9-7, 9 appears on right 
    TC([10, 1, 12, 3, 4, 28, 1], 27); // 28-1, 28 appears on right
    TC([9, 2, 6, 7], 5);             // 7-2, 7 comes after
    TC([10, 15, 90, 200, 110], 190); // 200-10, 200 comes after
    TC([10, 3, 6, 8, 9, 4, 3], 6);   // 9-6, 9 comes after
    TC([1, 2, 6, 80, 100], 99);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
