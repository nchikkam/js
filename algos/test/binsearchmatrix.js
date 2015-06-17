var count = (function binsearchmatrix(algos) {
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

    function TC(arr, k, expected) {
        assert(String(expected), String(algos.binsearchmatrix(arr, k)));
    }

    TC([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]], 4, [1, 0]);

    TC([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]], 1, [0, 0]);

    TC([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]], 10, [-1, -1]);

    var matrix = [[], [], [], [], [], [], [], [], [], []];
    var n = 1;
    for(var i=0; i < 10; i++)
        for(var j=0; j < 10; j++)
            matrix[i].push(n++);
    TC(matrix, 32, [3, 1]);

    matrix[3][1] = 33;
    TC(matrix, 32, [-1, -1])


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
