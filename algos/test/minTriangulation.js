var count = (function minTriangulation(algos) {
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

    function TC(points, expected) {
        assert(String(expected), String(algos.minTriangulation(points)));
    }


    TC([[0, 0], [1, 0], [2, 1], [1, 2], [0, 2]], 15.30056307974577);
    

    /*
        TC([[0, 0], [10, 4], [0, 8], [4, 5], [5, 4]], 8);
        //@ToDo: Add methods to check the no or chords and so on.
        https://code.google.com/p/minimum-weight-triangulator/source/browse/trunk/test/Triangulation/FastLMTTriangulator_test.java
    */

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;