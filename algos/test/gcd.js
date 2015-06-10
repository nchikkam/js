var count = (function gcd(algos) {
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

    function TC(a, b, expected) {
        assert(String(expected), String(algos.gcd(a, b)));
    }

    TC(57, -45, 3);
    TC(48, 64, 16);
    TC(44, 19, 1);
    TC(20, 8, 4);
    

    TC(2345, 72, 1);
    TC(1406700, 164115, 23445);
    TC(1368, 339, 3);
    TC(55534, 434334, 2);
    TC(30315475, 24440870, 31415);

    //TC(243532, 0, 243532);
    //TC(4323874085395, 586898689868986900219865, 85);
    //TC(37279462087332, 366983722766, 564958         ??);
    //TC(3823485236523624, 43882834845621,            ??);
    //TC(233961810342958422635, 3927915395316175446,  ??);
    //TC(34823484334858234892934, 438923489238932492, ??);
    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
