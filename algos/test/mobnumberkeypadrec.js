var count = (function mobnumberkeypadrec(algos) {
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

    function TC(keypad, N, expected) {
        assert(String(expected), String(algos.mobnumberkeypadrec(keypad, N)));
    }

    var keypad = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['*','0','#']
    ];

    TC(keypad,  1, 10);
    TC(keypad,  2, 36);
    TC(keypad,  3, 138);
    TC(keypad,  4, 532);
    TC(keypad,  5, 2062);
    TC(keypad,  6, 7990);
    TC(keypad,  7, 30984);
    TC(keypad,  8, 120130);
    TC(keypad,  9, 465832);
    TC(keypad, 10, 1806282);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
