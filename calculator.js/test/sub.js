var count = (function sub(Calculator) {
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

    if (!Calculator && typeof require === 'function') Calculator = require('../Calculator');

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

    function TC(a, b, expected) {
        assert(String(expected), String(Calculator.sub(a, b)));
    }

    TC(1, 1, 0);
    TC(-1, 1, -2);
    TC(-1, -1, 0);

    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.Calculator);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
