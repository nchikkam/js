var count = (function fibycombinator(algos) {
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
        assert(String(expected), String(algos.fibycombinator(a)));
    }

    TC(0, 0)
    TC(1, 1);
    
    TC(2, 1);
    TC(3, 2);
    
    TC(4, 3);
    TC(5, 5);
    TC(6, 8);
    TC(7, 13);
    
    TC(8, 21);
    TC(9, 34);
    TC(10, 55);
    TC(11, 89);
    TC(12, 144);
    TC(13, 233);
    TC(14, 377);
    TC(15, 610);
    TC(16, 987);
    TC(17, 1597);
    TC(18, 2584);
    TC(19, 4181);
    TC(20, 6765);
    
    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
