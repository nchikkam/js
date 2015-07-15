var count = (function boolenparenthesization(algos) {
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

    function TC(list_symb, list_oper, expected) {
        assert(String(expected), String(algos.boolenparenthesization(list_symb, list_oper)));
    }

    TC(['T', 'T', 'F', 'T'], ['|', '&', '^'], 4);   // ((T|T)&(F^T)), (T|(T&(F^T))), (((T|T)&F)^T) and (T|((T&F)^T))
    TC(['T', 'F', 'T'], ['^', '&'], 2);             //"((T ^ F) & T)" and "(T ^ (F & T))"
    TC(['T', 'F', 'F'], ['^', '|'], 2);             //( (T ^ F) | F )" and "( T ^ (F | F) )


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
