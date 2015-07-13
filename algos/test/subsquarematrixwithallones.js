var count = (function subsquarematrixwithallones(algos) {
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
        assert(String(expected), String(algos.subsquarematrixwithallones(matrix)));
    }

    TC([
            [0, 1, 1, 0, 1], 
            [1, 1, 0, 1, 0], 
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0]

        ], [4, 3, 3]);

    TC([
            [1, 1, 1, 1],
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 1, 1, 1]

        ], [2, 2, 3]);

    TC([
            [0, 1, 0, 1, 0, 1 ], 
            [1, 0, 1, 0, 1, 0 ],
            [0, 1, 1, 1, 1, 0 ], 
            [0, 0, 1, 1, 1, 0 ],
            [1, 1, 1, 1, 1, 1 ]
        ], [4, 4, 3]);


    TC([
            [0, 1, 1, 0, 1],
            [1, 1, 0, 1, 0],
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0]
        ], [5, 3, 4]);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
