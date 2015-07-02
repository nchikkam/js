var count = (function cutrod(algos) {
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

    function TC(arr, n, expected) {
        assert(String(expected), String(algos.cutrod(arr, n)));
    }


    
    /*            |            |  ==> cutting into 2, 6 pieces gives 22 with length 8=[2_6]
                  V            V
      index: | 1  2  3  4  5   6   7   8
      -------+--------------------------
      price: | 1  5  8  9 10  17  17  20
    */
    var prices = [1, 5, 8, 9, 10, 17, 17, 20];
    TC(prices, 8, [2, 6]);

    /*         |  =========> cutting 8 pieces with one length each gives max price & profit.
               v
      index: | 1  2  3  4  5   6   7   8
      -------+--------------------------
      price: | 3  5  8  9 10  17  17  20
    */
    prices = [3, 5, 8, 9, 10, 17, 17, 20];
    TC(prices, 8, [1, 1, 1, 1, 1, 1, 1, 1 ]);

    /*         
                  |  |    ===> 5, 7 with lengths [2+3] == 5
                  v  v
      index: | 1  2  3  4  --> lenght or indices
      -------+------------
      price: | 2  5  7  8

               |  |   ==> 1, 2, 2 also gives max prof of 12.
               v  v  v
      index: | 1  2  3  4  --> lenght or indices
      -------+------------
      price: | 2  5  7  8
    */
    prices = [2, 5, 7, 8];
    TC(prices, 5, [1, 2, 2]);

    /*         |               |   ==> 1, 1, 6 lengths gives max price.
               v               v
      index: | 1  2  3  4  5   6   7   8
      -------+--------------------------
      price: | 3  5  8  9 10  20  22  25
    */
    prices = [3,5,8,9,10,20,22,25];
    TC(prices, 8, [1, 1, 6]);

    /*            |            |   ==> 2, 6 lengths gives max price.
                  v            v
      index: | 1  2  3  4  5   6   7   8   9  10
      -------+-----------------------------------
      price: | 1  5  8  9 10  17  17  20  24  30
    */
    prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
    TC(prices, 8, [2, 6]);

    /*            |               ==> 2, 2 lengths gives max price.
                  v            
      index: | 1  2  3  4  5   6   7   8   9  10
      -------+-----------------------------------
      price: | 1  5  8  9 10  17  17  20  24  30
    */
    prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
    TC(prices, 4, [2, 2]);

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
