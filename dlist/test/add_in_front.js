var count = (function add(dllist) {
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

    if (!dllist && typeof require === 'function') dllist = require('../dllist');

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

    function TCObject(a, b) {
        assert(a.key, b.key);
        assert(a.value, b.value);
    }

    dllist.init();

    node = {
        key: 1, value:1, prev: undefined, next: undefined
    };
    dllist.add_in_front(node)

    TC(dllist.head.next.key, 1);
    TC(dllist.head.next.value, 1);
    TC(dllist.head.next, node);
    TC(dllist.head.prev, undefined);
    TC(dllist.tail.prev, node);
    TC(dllist.tail.next, undefined);
    TCObject(node, dllist.head.next);
    TCObject(node, dllist.tail.prev);


    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.dllist);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
