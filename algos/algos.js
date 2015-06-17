;(function (global) {
    'use strict';

    var algos;

    function another() {
        algos = {
            isPrime: function (n){
                //check simple cases
                if (n == 2 || n == 3)
                    return true;
                if (n % 2 == 0)
                    return false;

                var divisor = 3, 
                  limit = Math.sqrt(n);

                for (;divisor <= limit;divisor += 2){
                    if (n % divisor == 0)
                        return false;
                }
                return true;
            },

            primeFactors: function(num) {
                num = Math.floor(num);
                var root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num;
                while( doLoop ){
                    root = sqrt(num);
                    x = 2;
                    if (num % x) {
                        x = 3;
                        while ((num % x) && ((x += 2) < root));
                    }
                    x = (x > root) ? num : x;
                    factors.push(x);
                    doLoop = ( x != num );
                    num /= x;
                }
                return factors;
            },

            fibonacci: (function(n) {
                var memo = {};   // Memoization
                function fib(n) {
                    var value;

                    if (n in memo) {
                        value = memo[n];
                    } else {
                        if (n === 0 || n === 1)
                            value = n;
                        else
                            value = fib(n - 1) + fib(n - 2);
                        memo[n] = value;
                    }
                    return value;
                }
                return fib;
            })(),

            gcd: function(a,b) {
                a = Math.abs(a);
                b = Math.abs(b);

                if (b > a) {
                    var temp = a;
                    a = b;
                    b = temp; 
                }

                while (true) {
                    a %= b;
                    if (a === 0) { return b; }
                    b %= a;
                    if (b === 0) { return a; }
                }
            },

            gcd_array: function(arr) {
                var i, y,
                  n = arr.length,
                  x = Math.abs(arr[0]);

                for (i = 1; i < n; i++) {
                    y = Math.abs(arr[i]);

                    while (x && y) {
                      (x > y) ? x %= y : y %= x;
                    }
                    x += y;
                }
                return x;
            },


            unique: function(arr) {
                var lookup = {},
                    ret = [];

                for(var i =0; i < arr.length; i++){
                    if (!lookup[arr[i]]){
                        lookup[arr[i]] = true;
                        ret.push(arr[i]);
                    }
                }
                return ret;
            },

            merge: function(a, b){  // merge two sorted arrays
                var merged = [], 
                  aElm = a[0],
                  bElm = b[0],
                  i = 1,
                  j = 1;

                if(a.length ==0)
                    return b;
                if(b.length ==0)
                    return a;
                /* 
                if aElm or bElm exists we will insert to merged array
                (will go inside while loop)
                to insert: aElm exists and bElm doesn't exists
                         or both exists and aElm < bElm
                this is the critical part of the example            
                */
                while(aElm || bElm){
                    if((aElm && !bElm) || aElm < bElm){
                     merged.push(aElm);
                     aElm = a[i++];
                    }   
                    else {
                         merged.push(bElm);
                         bElm = b[j++];
                    }
                }
                return merged;
            },

            reverse: function(str){
                var a = str.split('');  // strings are immutable in js, so convert it to array and swap
                var l = a.length;
                var mid = Math.floor(l/2)-1;
                for( var i = 0; i <= mid; i++){
                    var t = a[i];
                    a[i] = a[l-i-1];
                    a[l-i-1] = t;
                }
                return a.join('');
            },

            reverse_words: function(str){  // ask if there would be multiple white spaces
                var a = str.split(' ');
                var l = a.length;
                var mid = Math.floor(l/2)-1;
                for( var i = 0; i <= mid; i++){
                    var t = a[i];
                    a[i] = a[l-i-1];
                    a[l-i-1] = t;
                }
                return a.join(' ');

            },

            reverse_words_in_place: function(str){ 
                var a = str.split(' ');
                var l = a.length;
                for( var i = 0; i < l; i++){ // reverse could be used here!
                    a[i] = this.reverse(a[i]);
                }
                return a.join(' ');
            },

            first_non_repeating_char: function(str){ 
                var lookup = {};
                for(var i =0; i< str.length; i++){
                    if (!lookup[str[i]]){
                        lookup[str[i]] = 1;
                    }else
                        lookup[str[i]]++;
                }

                for(var i =0; i< str.length; i++){
                    if (lookup[str[i]] == 1)
                        return str[i];
                }
                return -1; //all chars repeated so -1
            },

            two_sum: function(arr, two_sum){
                var lookup = {};
                for (var i =0; i < arr.length; i++){
                    if(lookup[two_sum-arr[i]])
                        return true;
                    else
                        lookup[arr[i]] = true;
                }
                return false;
            },

            max_diff_two_elements: function(arr){
                /*Calculate the difference between any 2 elements in the array where 
                  large element appears after the smaller.*/
                  var maxDiff = arr[1] - arr[0];
                  var minElem = arr[0];
                  for(var i = 1; i < arr.length; i++){       
                    if(arr[i] - minElem > maxDiff)                               
                      maxDiff = arr[i] - minElem;
                    if(arr[i] < minElem)
                         minElem = arr[i];                     
                  }
                  return maxDiff;
            },

            three_sum: function(arr, three_sum){ //O(n^2)
                arr.sort();  // O(n log n) assuming average case Qsort ;)
                var left, right, l = arr.length;
                for(var i =0; i < l; i++){ // for each i, try O(n) time finding sum
                    left = i+1; 
                    right = l-1;
                    while(left < right){
                        var sum = arr[i] + arr[left]+ arr[right];
                        if( sum == three_sum) return true;
                        else if(sum < three_sum) left++;
                        else right--;
                    }
                }
                return false;
            },

            closestPair: function(arr, two_sum){
                var indexOne,
                    indexTwo,
                    left = 0, 
                    right = arr.length-1, 
                    diff = Number.MAX_VALUE;
                     
                    while (right > left){
                       if (Math.abs(arr[left] + arr[right] - two_sum) < diff){
                           indexOne = left;
                           indexTwo = right;
                           diff = Math.abs(arr[left] + arr[right] - two_sum);
                       }
                 
                       // If this pair has more sum, move to smaller values.
                       if (arr[left] + arr[right] > two_sum)
                           right--;
                       else // Move to larger values
                           left++;
                    }
                    return [arr[indexOne], arr[indexTwo]];
            },

            combinations: function combi(s, c,  holder){
                var n = s.length;
                if (n == 0) {
                    holder.push(c);
                    return holder;
                }
                for( var i=0; i < n ; i++){
                      var t = s[0];
                      s[0] = s[i];
                      s[i] = t;

                      combi(s.slice(1, n), c+s[0], holder)

                      var t = s[0];
                      s[0] = s[i];
                      s[i] = t;
                  }
                  return holder;
            },

            /*
                //a is an input array with element names.
                //n is the size of the entire set of elements.
                //pos is the position in selector to fill
                //start is the starting index for the next recursive call. Next recursion call must
                // -  start from where the previous call set the start .
                //k is the cardinality of the subset. 
            */
            subsets: function subsets(a, c, pos, start, k, holder){
                if( k == 0 ){
                    holder.push(c);
                   return holder;
                }
                for(var i=start;i<=(a.length-k);++i){
                  subsets(a, c+a[i], pos+1, i+1, k-1, holder);
                }
                return holder;
            },

            powerset: function(s){
                var pset = [];
                for(var i=0; i <= s.length; ++i){
                    var kset = this.subsets(s, '', 0, 0, i, []);
                    pset = pset.concat(kset);
                }
                return pset;
            },

            maxarea: function getMaxAreaInHistogram(hist){  //O(n)
                function top(stack){
                    return stack[stack.length-1];
                }
                function isEmpty(stack){
                    return stack.length == 0;
                }
                /*
                    if stack is empty or, we keep pusing he indexes in ascending order
                    if we find value at index i while traversing hist is 
                    1) Create an empty stack.

                    2) Start from first bar, and do following for every bar ‘hist[i]’ where ‘i’ varies from 0 to n-1.
                        a) If stack is empty or hist[i] is higher than the bar at top of stack, then push ‘i’ to stack.
                        b) If this bar is smaller than the top of stack, then keep removing the top of stack while top 
                           of the stack is greater. Let the removed bar be hist[tp]. Calculate area of rectangle with 
                           hist[tp] as smallest bar. For hist[tp], the ‘left index’ is previous (previous to tp) item 
                           in stack and ‘right index’ is ‘i’ (current index).

                    3) If the stack is not empty, then one by one remove all bars from stack and do step 2.b for every removed bar.
                */
                /*Create an empty stack. The stack holds indexes of hist[] array
                 The bars stored in stack are always in ascending order of their
                 heights. */
                var stack = new Array();
             
                var max_area = 0;   // Initalize max area
                var tp;             // To store top of stack
                var area_with_top;  // To store area with top bar as the smallest bar
             
                // Run through all bars of given histogram
                var i = 0;
                while (i < hist.length){
                    // If this bar is higher than the bar on top stack, push it to stack
                    if (isEmpty(stack) || hist[top(stack)] <= hist[i])
                        stack.push(i++);
             
                    // If this bar is lower than top of stack, then calculate area of rectangle 
                    // with stack top as the smallest (or minimum height) bar. 'i' is 
                    // 'right index' for the top and element before top in stack is 'left index'
                    else {
                        tp = stack.pop();  // store the top index
                        //stack.pop();  // pop the top
             
                        // Calculate the area with hist[tp] stack as smallest bar
                        area_with_top = hist[tp] * (isEmpty(stack) ? i : i - top(stack) - 1);
             
                        // update max area, if needed
                        if (max_area < area_with_top)
                            max_area = area_with_top;
                    }
                }
             
                // Now pop the remaining bars from stack and calculate area with every
                // popped bar as the smallest bar.
                while (isEmpty(stack) == false){
                    tp = stack.pop();// peek into stack to get the top most element.

                    
                    area_with_top = hist[tp] * (isEmpty(stack) ? i : i - top(stack) - 1);
             
                    if (max_area < area_with_top)
                        max_area = area_with_top;
                }
                return max_area;
            },

            maxareanlogn: function getMaxArea(hist, left, right){  // divide & conquer no 'segment tree'
                //dcmaxRecHist(int *height, int start, int end)
                {
                    if(left == right) return hist[left];
                    if(left == right-1)
                        return     Math.max( Math.max(hist[left], hist[right]), 
                            2* Math.min(hist[left], hist[right]));
                    
                    var mid=Math.ceil((left+right)/2);

                    //find max from one half
                    var max = Math.max( getMaxArea(hist, left, mid-1), getMaxArea(hist, mid+1, right) );
                    //merge part,check whether the rectangle containing mid is larger
                    var j=mid-1,k=mid+1;
                    var cur_height = hist[mid];
                    var area=0;
                    while(true){
                        while(j >= left && hist[j] >= cur_height)  {j--;}
                        while(k <= right && hist[k] >= cur_height) {k++;}
                        area = (k-j-1)*cur_height;
                        if(area > max)max = area;

                        if(j >= left && k <= right) cur_height = Math.max(hist[j],hist[k]);
                        else{
                            if( j < left && k > right ) break;
                            else if(j<left) cur_height = hist[k];
                            else if(k>right) cur_height = hist[j];
                        }
                    }
                    return max;
                }
            },


            dominator: function dominator(a){ // Moore’s Voting Algorithm
                var x = 0, count = 0;
                for(var i = 0; i < a.length; i++) {
                    if (count == 0){
                        x = i
                        count = count + 1
                    }
                    else if (a[i] == a[x]) 
                        count = count + 1
                    else
                        count = count - 1
                }

                count = 0;
                for (var i = 0; i < a.length; i++)
                  if(a[i] == a[x])
                     count++;

                

                if (count > a.length/2) 
                   return a[x];
                else
                   return -1;
            },

            longestpalindrome: function(s){  //manachar's algorithm O(n) time, O(n) space.
                function convert(s) {  // 
                    var n = s.length;
                    if (n == 0) return "^$";
                    var ret = "^";
                    for (var i = 0; i < n; i++)
                        ret += "#" + s.substr(i, 1);

                    ret += "#$";
                    return ret.split('');
                }

                function longestPalindrome(s) {
                    /*
                        sourcce: http://articles.leetcode.com/2011/11/longest-palindromic-substring-part-ii.html
                        if P[ i’ ] ≤ R – i,
                        then P[ i ] ← P[ i’ ]
                        else P[ i ] ≥ P[ i’ ]. (Which we have to expand past the right edge (R) to find P[ i ].
                    */
                    var T = convert(s);
                    var n = T.length;
                    var P = new Array();
                    var C = 0, R = 0;
                    for (var i = 1; i < n-1; i++) {
                        var i_mirror = 2*C-i; // equals to i' = C - (i-C)

                        P[i] = (R > i) ? Math.min(R-i, P[i_mirror]) : 0;

                        // Attempt to expand palindrome centered at i
                        while (T[i + 1 + P[i]] == T[i - 1 - P[i]]) P[i]++;

                        // If palindrome centered at i expand past R,
                        // adjust center based on expanded palindrome.
                        if (i + P[i] > R) {
                            C = i;
                            R = i + P[i];
                        }
                    }

                    // Find the maximum element in P.
                    var maxLen = 0;
                    var centerIndex = 0;
                    for (var i = 1; i < n-1; i++) {
                        if (P[i] > maxLen) {
                            maxLen = P[i];
                            centerIndex = i;
                        }
                    }
                    var r = s.substr((centerIndex - 1 - maxLen)/2, maxLen);
                    return r;
                }

                return longestPalindrome(s);
            },


            rotatebyk: function(a, k){  // rotates left
                
                function reverse_s(s, b, e){
                    var i, j, t;
                    for( i =b, j = e-1; i < j; i++, j--){
                        t = s[i];
                        s[i] = s[j];
                        s[j] = t;  
                    }
                }
                //rotate_length = rotate_length%m; //if rotate_length is more than m, mod it to limit m.
                function rotate_left(a, k){
                    var s = a.split('');
                    reverse_s(s, 0, k);
                    reverse_s(s, k, s.length);
                    reverse_s(s, 0, s.length);
                    return s.join('');
                }

                function rotate_right(a, k){
                    var s = a.split('');
                    reverse_s(s, 0, s.length);
                    reverse_s(s, 0, k-1);
                    reverse_s(s, k, s.length);
                }

                
                return rotate_left(a, k);
            }

        }; //algo object
        return algos;
    }

    // EXPORT
    algos = another();

    // AMD.
    if ( typeof define == 'function' && define.amd ) {
        define( function () { return algos; } );

    // Node and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = algos;

    // Browser.
    } else {
        global.algos = algos;
    }
})(this);