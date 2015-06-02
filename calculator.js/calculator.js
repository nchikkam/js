;(function (global) {
    'use strict';

    var Calculator;

    /*
     * Create and return a BigNumber constructor.
     */
    function another() {
        Calculator = {
            add: function(a, b){
                return a + b;
            },

            sub: function(a, b){
                return a - b;
            },

            mul: function(a, b){
                return a * b;
            },

            div: function(a, b){
                return a / b;
            },
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