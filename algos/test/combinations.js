var count = (function combinations(algos) {
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

    function TC(arr, s, expected) {
        assert(String(expected), String(algos.combinations(arr, s, [])));
    }

    TC(["a", "b"], '', ["ab", "ba"]);
    TC(["a", "b", "c"], '', ["abc", "acb", "bac", "bca", "cba", "cab"]);
    TC(["a", "b", "c", "d"], '', 
        ["abcd","abdc","acbd","acdb","adcb","adbc",
        "bacd","badc","bcad","bcda","bdca","bdac",
        "cbad","cbda","cabd","cadb","cdab","cdba",
        "dbca","dbac","dcba","dcab","dacb","dabc"]);

    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
