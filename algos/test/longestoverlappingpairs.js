var count = (function longestoverlappingpairs(algos) {
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

    function TC(pairs_array, expected) {
        assert(String(expected), String(algos.longestoverlappingpairs(pairs_array)));
    }

    TC([[5, 24], [39, 60], [15, 28], [27, 40], [50, 90]], 3);
    TC([[5, 24], [39, 60], [15, 28], [50, 90], [27, 40]], 3);
    TC([[5, 24], [27, 40], [50, 60]], 3);
    TC([[1, 3], [12, 14], [2, 4], [13, 15], [5, 10]], 3);


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;