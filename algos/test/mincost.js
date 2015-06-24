var count = (function mincost(algos) {
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

    function TC(arr, dstRow, dstCol, expected) {
        assert(String(expected), String(algos.mincost(arr, dstRow, dstCol)));
    }

    TC([
            [1,2,3],
            [4,8,2],
            [1,5,3],
            [6,2,9]

        ], 3, 2, 17);

    TC([
            [1,3,5,8],
            [4,2,1,7],
            [4,3,2,3]

        ], 2, 3, 7);

    TC([
            [1, 2, 3],
            [4, 8, 2],
            [1, 5, 3]

        ], 2, 2, 8);


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
