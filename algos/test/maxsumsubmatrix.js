var count = (function maxsumsubmatrix(algos) {
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

    function TC(matrix, expected) {
        assert(String(expected), String(algos.maxsumsubmatrix(matrix)));
    }

    TC([
            [ 1,  2, -1, -4, -20],
            [-8, -3,  4,  2,   1],
            [ 3,  8, 10,  1,   3],
            [-4, -1,  1,  7,  -6]

        ], [[1, 1], [3, 3], 29]
    );


    TC([
            [-1,  2, -3,  5, -4, -8,  3, -3],
            [ 2, -4, -6, -8,  2, -5,  4,  1],
            [ 3, -2,  9, -9,  3,  6, -5,  2],
            [ 1, -3,  5, -7,  8, -2,  2, -6]
        ], [[2, 4], [3, 5], 15]
    );

    TC([
            [-1, -1,  3,  3],
            [-1, -1,  3,  3],
            [10, -1, -1, -1],
            [-1, -1, -1, -1]
        ], [[0, 0],[2, 3],15]
    );

    TC([
            [-1,  4,  3,  1],
            [-1, -1,  1,  3],
            [10, -1, -1, -1],
            [-1, -1, -1, -1]
        ], [[0, 0], [2, 3], 16]
    );

    TC([
            [ 1,  2, -1, -4, -20],
            [-8, -3,  4,  2,   1],
            [ 3,  8, 10,  1,   3],
            [-4, -1,  1,  7,  -6]
       ], [[1, 1], [3, 3], 29]
    );

    TC([
            [11,  4,  3, 7,  4],
            [ 1, -5, -7, 8, -3],
            [ 2,  3, -4, 5, -2]
        ], [[0, 0], [0, 4], 29]
    );

    TC([
            [-1, -1, -1],
            [ 9, 9,  -1],
            [-1, -1, -1]
        ], [[1, 0], [1, 1], 18]
    );

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
