;(function (global) {
    'use strict';

    var Cache;

    function another() {
        var entry = {
            key:    undefined,
            value:  undefined,
            prev:   undefined,
            next:   undefined
        };

        var dllist = {
            head: JSON.parse(JSON.stringify(entry)),
            tail: JSON.parse(JSON.stringify(entry)),
            count: 0,

            init: function(){
                this.head.prev = undefined;
                this.tail.next = undefined;
                this.head.next = this.tail;
                this.tail.prev = this.head;

                return this;
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

        var externaldata = {                        // simulating data source external for demo
            "userId-1": "userNameOne",
            "userId-2": "userNameTwo",
            "userId-3": "userNameThree",
            "userId-4": "userNameFour",
            "userId-5": "userNameFive"
        };

        var Cache = {
            hash:{},
            dl: dllist.init(),
            hits: 0,
            misses: 0,
            capacity: 0,

            init: function(capacity){
                this.capacity = capacity;
            },

            cache_full: function(){
                return Object.keys(this.hash).length >= this.capacity;
            },

            get: function (key, extData) {
                if (key in this.hash){
                    var node = this.hash[key];
                    console.log("<HIT>  --> requested UserID found in Cache.");
                    this.dl.remove(node);
                    this.dl.add_in_front(node);
                    this.hits += 1;
                    return node.value;
                }else{
                    console.log("<MISS>  --> UserID not found in Cache, Reading from Memory");
                    if (!(key in externaldata)){
                        console.log("Invalid UserID or user doens't Exist.");
                        if(extData){
                            this.set(key, extData[key]);
                            return extData[key];  // for testing hack!!
                        }
                        return "";
                    }
                    var value = externaldata[key];
                    this.set(key, value);
                    this.misses += 1;
                    return value;
                }
            },

            set: function(key, value){
                if (key in this.hash){
                    node = this.hash[key];    //re-organize the hash and doublyLList
                    this.dl.remove(node);
                    node.key = key;
                    node.value = value;
                    this.dl.addInFront(node);
                }else{
                    if ( this.cache_full() ){
                        var node = this.dl.tail.prev;
                        this.dl.remove(node);
                        delete this.hash[node.key];
                        node.key = key;
                        node.value = value;
                        this.hash[key] = node;
                        this.dl.add_in_front(node);
                    }else{
                        node = JSON.parse(JSON.stringify(entry));  // new entry
                        node.key = key;
                        node.value = value;
                        this.hash[key] = node;
                        this.dl.add_in_front(node);
                    }
                }
            },

            reset: function(){
                this.hash = {};
                this.dl = dllist.init();
                this.hits = 0;
                this.misses = 0;
                this.capacity = 0;
            }

        };
        return Cache;
    }


    // EXPORT


    Cache = another();

    // Node and other environments that support module.exports.
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Cache;

    // Browser.
    } else {
        global.Cache = Cache;
    }
})(this);