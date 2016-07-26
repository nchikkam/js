;(function (global) {
    'use strict';

    var dllist;

    function another() {

        var entry = {
            key:    undefined,
            value:  undefined,
            prev:   undefined,
            next:   undefined
        };

        dllist = {
            head: JSON.parse(JSON.stringify(entry)),
            tail: JSON.parse(JSON.stringify(entry)),
            count: 0,

            init: function(){
                this.head.prev = undefined;
                this.tail.next = undefined;
                this.head.next = this.tail;
                this.tail.prev = this.head;
            },


            remove: function (node) {
                node.prev.next = node.next
                node.next.prev = node.prev
                this.count -= 1
            },


            add_in_front: function(node){
                node.next = this.head.next
                node.prev = this.head
                this.head.next = node
                node.next.prev = node
                this.count += 1
            },

            get_as_list: function(){
                var ret  = []
                var temp = this.head;
                while (temp.next != undefined){
                    console.log(temp.key);
                    ret.push(temp);
                    temp = temp.next
                }
                return ret;
            }
        };


        return dllist;
    }

    // EXPORT
    dllist = another();

    // Node and other environments that support module.exports.
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = dllist;

    // Browser.
    } else {
        global.dllist = dllist;
    }
})(this);