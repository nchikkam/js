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

    // Scenario #1
    ////////////////////////////////////////////////////////////////////////////////////////
    cache.reset();
    cache.init(5);
    var externaldata = {                        // simulating data source external for demo
        "userId-1": "userNameOne",
        "userId-2": "userNameTwo",
        "userId-3": "userNameThree",
        "userId-4": "userNameFour",
        "userId-5": "userNameFive"
    };

    for(var key in externaldata){
        cache.get(key);
    }

    TC(cache.hits,      0);
    TC(cache.misses,    5);

    for(var key in externaldata){
            cache.get(key);
    }

    TC(cache.hits,      5);
    TC(cache.misses,    5);
    ////////////////////////////////////////////////////////////////////////////////////////

    // Scenario #2
    ////////////////////////////////////////////////////////////////////////////////////////
    cache.reset();
    cache.init(2);

    var extData = {
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five"
    }
    for (var key in extData){
        cache.get(key, extData);
    }

    var r = cache.dl.get_as_list();
    TC(r[1].key, ""+5);
    TC(r[2].key, ""+4);   // last two elements lookedup !!!


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.cache);
if (typeof module !== 'undefined' && module.exports) module.exports = count;