var count = (function lpsrec(algos) {
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

    function TC(seq, i, j, expected) {
        assert(String(expected), String(algos.lpsrec(seq, i, j)));
    }

    var data = "BBABCBCAB";
    TC(data, 0,  data.length-1, 7);

    data = "GEEKSFORGEEKS";
    TC(data, 0,  data.length-1, 5);

    data = "alfalfa";
    TC(data, 0,  data.length-1, 5);  //alala, afafa, alfla, and aflfa

    data = "ABCDEBCA";
    TC(data, 0,  data.length-1, 5);

    data = "NAMAN IS NAMAN";
    TC(data, 0,  data.length-1, 13);

    data = "XAYBZBA";
    TC(data, 0,  data.length-1, 5);

    data = "abacba";
    TC(data, 0,  data.length-1, 5);






    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;