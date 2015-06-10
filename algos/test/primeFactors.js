var count = (function primeFactors(algos) {
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

    function TC(a, expected) {
        assert(String(expected), String(algos.primeFactors(a)));
    }

    TC(2, [2]);
    TC(1034, [2,11,47] );
    TC(111,  [3,37])
    TC(1111, [11,101]);
    TC(11111, [41,271]);
    TC(111111, [3,7,11,13,37]);
    TC(1111111, [239,4649]);
    TC(11111111, [11,73,101,137]);
    TC(111111111, [3,3,37,333667]);
    TC(1111111111, [11,41,271,9091]);
    TC(11111111111, [21649,513239]);
    TC(111111111111, [3,7,11,13,37,101,9901]);
    TC(1111111111111, [53,79, 265371653]);
    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
