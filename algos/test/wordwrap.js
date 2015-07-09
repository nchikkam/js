var count = (function wordwrap(algos) {
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

    function TC(l, Width, expected) {
        assert(String(expected), String(algos.wordwrap(l, Width)));
    }

    TC([3, 2, 2, 5], 6, [[1, 1, 1], [2, 2, 3], [3, 4, 4]]);


    /*
        ---------
        a b c d e
        f g h i j
        k l m n o
        p
        qqqqqqqqq

        Array representation of above text:
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9]

        expected solution must be: 
        ---------
        a b c d
        e f g h
        i j k l
        m n o p
        qqqqqqqqq
    */
    TC([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9], 9, 
        [   // line, start-word-index, end-word-index
            [1,1,4],     // line :1  words 1  to  4
            [2,5,8],     // line :2  words 5  to  8 
            [3,9,12],    // line :3  words 9  to 12
            [4,13,16],   // line :4  words 13 to 16
            [5,17,17]    // line: 5  words 17 to 17
        ]
    );


    /*
        Just testing to see how this works. 
        [4, 7, 2, 3, 3, 4, 6]
    */
    TC([4, 7, 2, 3, 3, 4, 6], 12, 
        [
            [1,1,2],  // line :1 words  1  to  2
            [2,3,5],  // line :2 words  3  to  5
            [3,6,7]   // line :3 words  6  to  7
        ]
    );

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;