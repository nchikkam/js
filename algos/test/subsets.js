var count = (function subsets(algos) {
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

    function TC(a, c, pos, start, k, expected) {
        assert(String(expected), String(algos.subsets(a, c, pos, start, k, [])));
    }

    TC(["a", "b", "c"], '', 0, 0, 2, ["ab", "ac", "bc"]);
    TC(["a", "b", "c"], '', 0, 0, 3, ["abc"]);
    TC(["a", "b", "c"], '', 0, 0, 0, []);
    TC(["a", "b", "c", "d"], '', 0, 0, 2, ["ab", "ac", "ad", "bc", "bd", "cd"]);
    TC(["a", "b", "c", "d"], '', 0, 0, 1, ["a", "b", "c", "d"]);
    TC(["a", "b", "c", "d"], '', 0, 0, 3, ["abc", "abd", "acd", "bcd"]);
    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
