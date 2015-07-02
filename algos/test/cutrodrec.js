var count = (function cutrodrec(algos) {
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

    function TC(arr, len, expected) {
        assert(String(expected), String(algos.cutrodrec(arr, len)));
    }

    var prices = [1, 5, 8, 9, 10, 17, 17, 20];
    TC(prices, 8, 22);

    prices = [3, 5, 8, 9, 10, 17, 17, 20];
    TC(prices, 8, 24);

    prices = [2, 5, 7, 8];
    TC(prices, 5, 12);

    prices = [3,5,8,9,10,20,22,25];
    TC(prices, 8, 26);

    prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
    TC(prices, 8, 22);

    prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
    TC(prices, 4, 10);


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
