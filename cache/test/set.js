var count = (function add(cache) {
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

    if (!cache && typeof require === 'function') cache = require('../cache');

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

    function TC(a, b) {
        assert(a, b);
    }

    function compareObjects(a, b){
        return JSON.stringify(a) === JSON.stringify(b);
    }

    
    cache.init(1);
    
    cache.set(1, "One");
    TC(cache.get(1), "One");
    
    



    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.cache);
if (typeof module !== 'undefined' && module.exports) module.exports = count;