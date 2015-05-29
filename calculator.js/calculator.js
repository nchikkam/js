;(function (global) {
    'use strict';

    var Calculator;

    /*
     * Create and return a Calculator constructor.
     */
    function another() {
        Calculator = {
            add: function(a, b){
                return a+ b;
            }
        };


        return Calculator;
    }


    // EXPORT


    Calculator = another();

    // AMD.
    if ( typeof define == 'function' && define.amd ) {
        define( function () { return Calculator; } );

    // Node and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Calculator;

    // Browser.
    } else {
        global.Calculator = Calculator;
    }
})(this);