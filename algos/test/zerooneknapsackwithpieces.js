var count = (function zerooneknapsackwithpieces(algos) {
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

    function TC(data, W, expected) {
        assert(true, JSON.stringify(algos.zerooneknapsackwithpieces(data, W)) === JSON.stringify(expected));
    }

    var data = [
        {name: 'map',                    weight:  9, value:150, pieces:1},
        {name: 'compass',                weight: 13, value: 35, pieces:1},
        {name: 'water',                  weight:153, value:200, pieces:2},
        {name: 'sandwich',               weight: 50, value: 60, pieces:2},
        {name: 'glucose',                weight: 15, value: 60, pieces:2},
        {name: 'tin',                    weight: 68, value: 45, pieces:3},
        {name: 'banana',                 weight: 27, value: 60, pieces:3},
        {name: 'apple',                  weight: 39, value: 40, pieces:3},
        {name: 'cheese',                 weight: 23, value: 30, pieces:1},
        {name: 'beer',                   weight: 52, value: 10, pieces:3},
        {name: 'suntan, cream',          weight: 11, value: 70, pieces:1},
        {name: 'camera',                 weight: 32, value: 30, pieces:1},
        {name: 'T-shirt',                weight: 24, value: 15, pieces:2},
        {name: 'trousers',               weight: 48, value: 10, pieces:2},
        {name: 'umbrella',               weight: 73, value: 40, pieces:1},
        {name: 'waterproof, trousers',   weight: 42, value: 70, pieces:1},
        {name: 'waterproof, overclothes',weight: 43, value: 75, pieces:1},
        {name: 'note-case',              weight: 22, value: 80, pieces:1},
        {name: 'sunglasses',             weight:  7, value: 20, pieces:1},
        {name: 'towel',                  weight: 18, value: 12, pieces:2},
        {name: 'socks',                  weight:  4, value: 50, pieces:1},
        {name: 'book',                   weight: 30, value: 10, pieces:2}
    ];

    var expected = {
        map:      {count: 1, weight: 9, value: 150},
        compass:  {count: 1, weight: 13, value: 35},
        water:    {count: 1, weight: 153, value: 200},
        glucose:  {count: 2, weight: 15, value: 60},
        banana:   {count: 3, weight: 27, value: 60},
        cheese:   {count: 1, weight: 23, value: 30},
        'suntan, cream': {count: 1, weight: 11, value: 70},
        'waterproof, overclothes': {count: 1, weight: 43, value: 75},
        'note-case': {count: 1, weight: 22, value: 80},
        sunglasses: {count: 1, weight: 7, value: 20},
        socks: {count: 1, weight: 4, value: 50},

        'total-weight': 396,
        'total-value': 1010
    };

    TC(data, 400,  expected);

    // Case 2
    data = [
            {name: 'book',        weight: 2, value: 3, pieces:1},
            {name: 'pen',         weight: 3, value: 4, pieces:1},
            {name: 'eraser',      weight: 4, value: 5, pieces:1},
            {name: 'pencil',      weight: 5, value: 6, pieces:1}
    ];
    expected = {
        pen:      {count: 1, weight: 3, value: 4},
        pencil:   {count: 1, weight: 5, value: 6},

        'total-weight': 8,
        'total-value': 10
    };
    TC(data, 8, expected);


    // Case 3:
    data = [
            {name: 'book',        weight: 1, value: 8, pieces:1},
            {name: 'pen',         weight: 3, value: 6, pieces:1},
            {name: 'eraser',      weight: 5, value: 5, pieces:1}
    ];
    expected = {
        book:  {count: 1, weight: 1, value: 8},
        pen:   {count: 1, weight: 3, value: 6},

        'total-weight': 4,
        'total-value': 14
    };
    TC( data, 7, expected);

    //TC( [8, 6, 5], [1, 3, 5], 7, [2, 5] );
    //TC( [1, 4, 5, 7], [1, 3, 4, 5], 9, [4, 5] );
    //TC([60,20,15,30], [4,2,3,5], 8, 80);
    //TC([60, 100, 120], [10, 20, 30], 50, 220);




    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
