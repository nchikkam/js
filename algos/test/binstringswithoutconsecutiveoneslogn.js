var count = (function binstringswithoutconsecutiveoneslogn(algos) {
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

    function TC(n, expected) {
        assert(String(expected), String(algos.binstringswithoutconsecutiveoneslogn(n)));
    }

    
    TC(2, 3);    //notice: its actuall a fibonnacci sequence that is coming out.
    TC(3, 5);
    TC(4, 8);
    TC(5, 13);
    TC(6, 21);
    TC(7, 34);
    TC(8, 55);
    TC(9, 89);
    TC(10, 144);
    TC(19, 10946);

    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
