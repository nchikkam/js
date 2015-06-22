var count = (function lcs(algos) {
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

    function TC(src, dst, expected) {
        assert(String(expected), String(algos.lcs(src, dst)));
    }

    /*  --ggc--a-ccacg
        acggcggat--acg 
    */
    TC("ggcaccacg", "acggcggatacg", "ggcaacg"); 
    TC("XMJYAUZ", "MZJAWXU", "MJAU");
    TC("nematode knowledge", "empty bottle", "emt ole");
    TC("ABCDGH", "AEDFHR", "ADH");
    TC("AGGTAB", "GXTXAYB", "GTAB");

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
