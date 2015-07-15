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

            fiblogn: function(n){
                function fibo(n) {
                    /* refer to Knuth's TACP fundamentals of computer algorithms Vol.1
                    * [ 1 1 ]     [ F(n+1) F(n)   ]
                    * [ 1 0 ]   = [ F(n)   F(n-1) ]
                    */
                    if (n < 0) return -1; //no fibonacci for -ve numbers
                    if (n <= 1) return n;
                    var result = [
                                [1, 0],        // identity matrix.
                                [0, 1]
                            ];

                    var fiboM = [
                                    [1, 1],        // identity matrix.
                                    [1, 0]
                                ];

                    while (n > 0) {
                        if (n%2 == 1) 
                            result = multMatrix(result, fiboM);
                        n = n >> 1;
                        fiboM = multMatrix(fiboM, fiboM);
                    }
                    return result[1][0];
                };

                function multMatrix(m, n) {
                    var a = m[0][0] * n[0][0] +  m[0][1] * n[1][0];
                    var b = m[0][0] * n[0][1] +  m[0][1] * n[1][1];
                    var c = m[1][0] * n[0][0] +  m[1][1] * n[0][1];
                    var d = m[1][0] * n[0][1] +  m[1][1] * n[1][1];
                    return [
                            [a, b], 
                            [c, d]
                        ];
                };
                return fibo(n);
            },

            fibycombinator: function(n){  // nice one !
                function Y(dn) {
                    return (function(fn) {
                        return fn(fn);
                    }(function(fn) {
                        return dn(function() {
                            return fn(fn).apply(null, arguments);
                        });
                    }));
                }
                var fibY = Y(function(fn) {
                    return function(n) {
                        if (n === 0 || n === 1) return n;
                        return fn(n - 1) + fn(n - 2);
                    };
                });
                return fibY(n);
            },

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
            },


            editdistance: function(src, dst){ 
                //http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Dynamic/Edit/:- traceback here is good
                var dG = new Array();
                function Minimum(a, b, c) {
                    var mi;
                    mi = a;
                    if (b < mi) mi = b;
                    if (c < mi) mi = c;
                    return mi;
                }

                function LD(s, t) {
                    var d = new Array(),
                        n, // length of s
                        m, // length of t
                        i, // iterates through s
                        j, // iterates through t
                        s_i, // ith character of s
                        t_j, // jth character of t
                        cost; // cost

                    // Step 1
                    n = s.length;
                    m = t.length;
                    if (n == 0) return m;

                    if (m == 0) return n;

                    for(i=0; i<=n; i++)
                        d[i] = new Array();

                    // Step 2
                    for (i = 0; i <= n; i++) d[i][0] = i;
                    for (j = 0; j <= m; j++) d[0][j] = j;

                    // Step 3
                    for (i = 1; i <= n; i++) {
                        s_i = s.charAt(i - 1);

                        // Step 4
                        for (j = 1; j <= m; j++) {
                            t_j = t.charAt(j - 1);

                            // Step 5
                            if (s_i == t_j)
                                cost = 0;
                            else
                                cost = 1;

                            // Step 6
                            d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
                        }
                    }

                    for(i=1; i<=n; i++) {
                        dG[i] = new Array();
                        for(j=1; j<=m; j++)
                            dG[i][j] = d[i][j];
                    }

                    // Step 7
                    return d[n][m];
                }

                return LD(src, dst);

            },

            eqbriumindex: function (l){
                var s = l.reduce(function (a, b) { return a + b; }, 0);
                var leftsum = 0
                for (var i=0; i< l.length; i++){
                    s = s - l[i]
                    if (leftsum == s)
                        return i;
                    leftsum = leftsum + l[i]
                }
                return -1
            },

            overlap: function(rectOne, rectTwo){
                // rectOne = [left, top, right, bottom]
                // rectTwo = [left, top, right, bottom]
                /*
                      Y
                      ^  A
                      |
                      +              p(x1,y1)
                      |              p(15,25)ul
                    25.                +---------+
                     ..                |         |
                     ..                |         |
                     ..                |         |
                     ..                |         |
                     ..                +---------+
                     ..  +--+--+--+                p(20,2)lr
                     ..  +--+--+  |                p(x2,y2)
                      |  +--+  |  |
                     2+  |  |  |  |
                      |  |  |  |  |
                     1+  |  |  |  |
                      |  +--+--+--+
                  -+--+--+--+--+--..........+--+-......-+-- > X
                      |  1  2  3  ..........15 .  .  .  20
                      +
                      |
                */
                var px1 = rectOne[0],
                    py1 = rectOne[1],
                    px2 = rectOne[2],
                    py2 = rectOne[3],
                    qx1 = rectTwo[0],
                    qy1 = rectTwo[1],
                    qx2 = rectTwo[2],
                    qy2 = rectTwo[3];

                if (px2 < qx1 || px1 > qx2 || qy1 < py2 || qy2 > py1)
                    return false
                return true
            },

            kthbiggest: function(a, k){  // O(n)
                var l = 0, r = a.length-1;
                var pivot = a[k]
                while( l < r){
                    pivot = a[k]
                    var i = l
                    var j = r
                    while( i < j){
                        while (a[i] < pivot) i = i + 1;
                        while (pivot < a[j]) j = j - 1;
                        if( i <= j ){
                             //b=a+(a=b)-b;
                             a[j]=a[i]+(a[i]=a[j])-a[j];  // tricky way to swap two vars: b = [a, a = b][0];
                            i = i + 1
                            j = j -1
                        }
                        if (j < k) l = i;
                        if (i > k) r = j;
                    }
                }
                return pivot;
            },

            binsearch: function(arr, k){
                var low = 0, 
                    high = arr.length-1,
                    mid;
                while (low <= high){
                    //mid = Math.floor(low + ((high-low)/2));  // taking overflow trick
                    mid = (low + high) >> 1;
                    
                    if ( arr[mid] < k) 
                        low = mid + 1;
                    else if ( arr[mid] > k )
                        high = mid -1;
                    else return mid;
                }
                return -1;
            },

            binsearchmatrix: function (matrix, k){
                var i = 0,
                    j = matrix.length-1;
                    while (i < k && j >= 0 && j < matrix.length && i < matrix.length){
                        if (matrix[i][j] == k)
                            return [i,j]
                        else if (matrix[i][j] > k)
                            j = j - 1;
                        else
                            i = i + 1;
                }
                return [-1, -1];
            },

            mincoinsrecursive: function(coins, total){
                function minCoinsChangeRecursive(coins, total, count){
                    if (total <= 0) return count;
                    var min = Number.MAX_VALUE;
                    for(var i =0; i < coins.length; i++){
                        var sum = minCoinsChangeRecursive(coins, total-coins[i], count+1);
                        if (min > sum) min = sum;
                    }
                    return min;
                }
                return minCoinsChangeRecursive(coins, total, 0);
            },


            mincoins: function(coins, total){
                var temp = [];
                temp[0] = 0;
                for(var i=1; i <= total; i++){
                    temp[i] = Number.MAX_VALUE;
                }
                for(var i=0; i < coins.length; i++){
                    for(var j=1; j <= total; j++){
                        if(j >= coins[i])
                            temp[j] = Math.min(temp[j], temp[j-coins[i]] +1);
                    }
                }
                return temp[total];
            },

            /*
                n is total, k is denominations
                for i := 1 to k
                    C[i, 0] := 0
                for j := 1 to n
                    C[1, j] := j
                for i := 1 to k 
                    for j := 1 to n
                        if j < di then 
                            C[i, j] = C[i-1, j]
                        else
                            C[i, j] = min(C[i-1, j], 1 + C[i, j-di])
            */
            mincoinsdispsol: function(coins, total){
                var C = [];  // constructs all the possibel solutions of coin-i before coin-[i+1]
                var optimalcoinsused = [];

                for(var i =0; i <= coins.length; i++)
                    C[i] = [0];

                for(var i=0; i <= total; i++)
                    C[0][i] = i;

                for(var i=1; i <= coins.length; i++){
                    for(var j=1; j <= total ; j++){
                        if (j < coins[i])
                            C[i][j] = C[i-1][j];
                        else
                            C[i][j] = Math.min(C[i-1][j], 1 + C[i][j-coins[i]]);
                    }
                }

                var row = coins.length-1;  // C[coins.length-1][total] has the solution, start backwards to get actual coins used.
                var col = total;
                var d = [];
                while(total > 0 && row > 0 && col > 0){
                    if ( C[row][col] == C[row-1][col]) {  // row's coin not used in optimal sol
                        row = row - 1;
                    }else{
                        d.push(coins[row]);              // coins[row] was used, back track to that col which it came from.
                        col = col - coins[row];
                    }
                }

                while(col > 0){          // possibility that it ended up more single coins in the smaller denomination
                    d.push(coins[row]);
                    col = col - 1;
                }
                return d;
            },

            binomialrec: function binomialrec(n, k){
                if (k == 0) return 1;
                if (n == 0) return 0;
                return binomialrec(n-1, k) + binomialrec(n-1, k-1);
            },

            binomial: function (N, K){  // will construct only upto needed values, not further
                var dpTable = [];
                for (var n = 0; n <= N; n++) 
                    dpTable[n] = [];

                for (var k = 1; k <= K; k++) dpTable[0][k] = 0;
                for (var n = 0; n <= N; n++) dpTable[n][0] = 1;

                for (var n = 1; n <= N; n++){
                   for (var k = 1; k <= K; k++){
                        dpTable[n][k] = dpTable[n-1][k-1] + dpTable[n-1][k];
                    }
                }
                return dpTable[N][K];
            },


            lcs:  function (a, b) {  //https://www.ics.uci.edu/~eppstein/161/960229.html
                    var m = a.length, 
                        n = b.length,
                        C = [], i, j;
                    for (i = 0; i <= m; i++) C.push([0]);
                    for (j = 0; j < n; j++) C[0].push(0);
                        
                    for (i = 0; i < m; i++)
                        for (j = 0; j < n; j++)
                            C[i+1][j+1] = a[i] === b[j] ? C[i][j]+1 : Math.max(C[i+1][j], C[i][j+1]);

                    /*  int i = 0, j = 0;
                        while(i < M && j < N) {
                            if (x.charAt(i) == y.charAt(j)) {
                                i++;
                                j++;
                            }
                            else if (opt[i+1][j] >= opt[i][j+1]) i++;
                            else                                 j++;
                        }
                    */
                    return (function backtrack(i, j) {
                        if (i*j === 0) { return ""; }
                        if (a[i-1] === b[j-1]) { return backtrack(i-1, j-1) + a[i-1]; }
                        return (C[i][j-1] > C[i-1][j]) ? backtrack(i, j-1) : backtrack(i-1, j);
                    }(m, n));
                },

                liss: function(seq){  // O(N^2)
                    var dpTable = [];
                    for (var i =0; i < seq.length; i++)
                        dpTable[i] = 1;   // by default each int int is a longest increasing sub sequence by one

                    for(var i=1; i < seq.length; i++){   
                        for(var j=0; j < i; j++){
                            if(seq[j] < seq[i]) 
                                dpTable[i] = Math.max(dpTable[i], dpTable[j]+1);
                        }
                    }
                    
                    //return the max int calculated in the dpTable
                    var max_number = 0;
                    var max_index = 0;
                    for(var i = 0; i < dpTable.length; i++){
                        if (max_number < dpTable[i]){
                            max_number = dpTable[i];
                            max_index = i;
                        }
                    }

                    // back track the actual numbers:
                    //var maxValue = Math.max.apply(null, result);
                    var liss_seq = [];
                    liss_seq.push(seq[max_index]);
                    for(var i = max_index ; i >= 0; i--){
                        if(max_number==0)break;
                        if(seq[max_index] > seq[i]  && dpTable[i] == max_number-1){
                            liss_seq.push(seq[i]);
                            max_number--;
                        }
                    }
                    liss_seq.reverse();
                    return liss_seq;
                },

                lissnlogn: function(seq){
                    //http://www.geeksforgeeks.org/construction-of-longest-monotonically-increasing-subsequence-n-log-n/
                    function getCeilIndex(pile, tileIndices, l, r, key) {
                        while( r - l > 1 ) {
                          var mid = (l + r)>>1;
                          if( pile[tileIndices[mid]] >= key ) r = mid;
                          else l = mid;
                        }
                        return r;
                    }

                    function lisspiles(seq){
                        // Add boundary case, when array size is one
                        var tailIndices = [];
                        var prevIndices = [];

                        for(var i =0; i < seq.length; i++){
                            tailIndices[i] = 0;
                            prevIndices[i] = 0xFFFF;
                        }

                        tailIndices[0] = 0;
                        prevIndices[0] = -1;
                        var l = 1; // it will always point to empty location
                        for( var i = 1; i < seq.length ; i++ ) {
                          if( seq[i] < seq[tailIndices[0]] ) {
                             // new smallest value
                             tailIndices[0] = i;
                          } else if( seq[i] > seq[tailIndices[l-1]] ) {
                             // seq[i] wants to extend largest subsequence
                             prevIndices[i] = tailIndices[l-1];
                             tailIndices[l++] = i;
                          } else {
                             // seq[i] wants to be a potential condidate of future subsequence
                             // It will replace ceil value in tailIndices
                            var pos = getCeilIndex(seq, tailIndices, -1, l-1, seq[i]);

                            prevIndices[i] = tailIndices[pos-1];
                            tailIndices[pos] = i;
                          }
                        }
                        var ret = [];
                        for( var i = tailIndices[l-1]; i >= 0 && i < seq.length; i = prevIndices[i] )
                            ret.push(seq[i]);
                        return ret.reverse();
                    }
                    return lisspiles(seq);
                },

                maxsubseqsum: function(arr){
                    //www.algorithmist.com/index.php/Kadane's_Algorithm
                    // above algo works only if there is atleast one +ve element.
                    var maxSum = arr[0], 
                        maxStartIndex = 0, 
                        maxEndIndex = 0,
                        max_element = arr[0];

                    var currentMaxSum = arr[0];
                    var currentStartIndex = 0;
                    for(var i = 0; i < arr.length; i++){
                        currentMaxSum = currentMaxSum + arr[i];
                        max_element     = Math.max(max_element, arr[i]);
                        if (currentMaxSum > maxSum) {
                            maxSum = currentMaxSum;
                            maxStartIndex = currentStartIndex;
                            maxEndIndex = i;
                        }else if (currentMaxSum < 0 ){
                            currentMaxSum = 0;
                            currentStartIndex = i + 1;
                        }
                    }
                    if (maxSum == 0) 
                        return [max_element];
                    else 
                        return arr.slice(maxStartIndex, maxEndIndex+1);  //slice is right exclusive
                },

                mincostrec: function minCost(cost, m, n){
                    /* 
                        Returns cost of minimum cost path from (0,0) to (m, n) in mat[R][C]
                        http://www.geeksforgeeks.org/dynamic-programming-set-6-min-cost-path
                    */
                    if (n < 0 || m < 0) return Number.MAX_VALUE;
                    else if (m == 0 && n == 0)
                      return cost[m][n];
                    else
                      return cost[m][n] + Math.min( minCost(cost, m-1, n-1),
                                                    minCost(cost, m-1, n), 
                                                    minCost(cost, m, n-1) 
                                        );
                },

                mincost: function(cost, m, n){
                    var tc = [];
                    for(var i = 0; i < cost.length; i++)
                        tc[i] = [];

                    tc[0][0] = cost[0][0];

                    /* Initialize first column of total cost(tc) array */
                    for (var i = 1; i <= m; i++)
                        tc[i][0] = tc[i-1][0] + cost[i][0];

                    /* Initialize first row of tc array */
                    for (var j = 1; j <= n; j++)
                        tc[0][j] = tc[0][j-1] + cost[0][j];

                    /* Construct rest of the tc array */
                    for (i = 1; i <= m; i++)
                        for (j = 1; j <= n; j++)
                            tc[i][j] = Math.min(tc[i-1][j-1], tc[i-1][j], tc[i][j-1]) + cost[i][j];

                    return tc[m][n];
                },

                matrixchainorder: function (p) {
                    // https://en.wikipedia.org/wiki/Matrix_chain_multiplication
                    /*
                        Notes: There are algorithms that are more efficient than the O(n3) 
                        dynamic programming algorithm, though they are more complex.
                        An algorithm published in 1981 by Hu and Shing achieves O(n log n) complexity
                        They showed how the matrix chain multiplication problem can be transformed 
                        (or reduced) into the problem of triangulation of a regular polygon
                        Digg into Wikipedia to this. //@ToDo:
                    */

                    function getchain(s, i, j, inAResult){
                        if (i != j) {
                            getchain(s, i, s[i][j], inAResult);
                            getchain(s, s[i][j] + 1, j, inAResult);

                            var istr = inAResult[i] ? "_result " : " ";
                            var jstr = inAResult[j] ? "_result " : " ";
                            console.log(" A_" + i + istr + "* A_" + j + jstr);
                            inAResult[i] = true;
                            inAResult[j] = true;                            
                        }
                    }

                    // Matrix Ai has dimension p[i-1] x p[i] for i = 1..n
                    var n = p.length - 1;
                    // m[i,j] = Minimum number of scalar multiplications (i.e., cost)
                    // needed to compute the matrix A[i]A[i+1]...A[j] = A[i..j]
                    // cost is zero when multiplying one matrix
                    var m = []; 
                    var s = [];
                    for( var i =0; i <= n; i++){
                        m[i] = [];
                        m[i][i] = 0;
                        s[i] = [];
                    }

                    for (var ii = 1; ii < n; ii++) {
                        for (var i = 0; i < n - ii; i++) {
                            var j = i + ii;
                            m[i][j] = 100000;
                            for (var k = i; k < j; k++) {
                                var q = m[i][k] + m[k+1][j] + p[i]*p[k+1]*p[j+1];
                                if (q < m[i][j]) {
                                    m[i][j] = q;
                                    s[i][j] = k;
                                }
                            }
                        }
                    }
                    /*
                        var inAResult = [];
                        for( var i =0; i <= n; i++)
                            inAResult[i] = false;

                        getchain(s, 0, n-1, inAResult)
                    */
                    return m[0][n-1]; //gives the min multiplications possible
                    
                },

                zerooneknapsackwithpieces: function findBestPack(data, TotWeight) {
                    //http://rosettacode.org/wiki/Knapsack_problem/Bounded#JavaScript
                    var m= [[0]]; // maximum pack value found so far
                    var b= [[0]]; // best combination found so far
                    var opts= [0]; // item index for 0 of item 0 
                    var P= [1]; // item encoding for 0 of item 0
                    var choose= 0;
                    for (var j= 0; j<data.length; j++) {
                        opts[j+1]= opts[j]+data[j].pieces; // item index for 0 of item j+1
                        P[j+1]= P[j]*(1+data[j].pieces); // item encoding for 0 of item j+1
                    }
                    for (var j= 0; j<opts[data.length]; j++) {
                        m[0][j+1]= b[0][j+1]= 0; // best values and combos for empty pack: nothing
                    }
                    for (var w=1; w<=TotWeight; w++) {
                        m[w]= [0];
                        b[w]= [0];
                        for (var j=0; j<data.length; j++) {
                            //THIS IS NOT GENERALLY THE CASE in NORMAL 0-1 KP problem
                            var N= data[j].pieces; // how many of these can we have?       
                            var base= opts[j]; // what is the item index for 0 of these?
                            for (var n= 1; n<=N; n++) {
                                var W= n*data[j].weight; // how much do these items weigh?
                                var s= w>=W ?1 :0; // can we carry this many?
                                var v= s*n*data[j].value; // how much are they worth?
                                var I= base+n; // what is the item number for this many?
                                var wN= w-s*W; // how much other stuff can we be carrying?
                                var C= n*P[j] + b[wN][base]; // encoded combination
                                m[w][I]= Math.max(m[w][I-1], v+m[wN][base]); // best value
                                choose= b[w][I]= m[w][I]>m[w][I-1] ?C :b[w][I-1];
                            }
                        }
                    }
                    var best= [];
                    for (var j= data.length-1; j>=0; j--) {
                        best[j]= Math.floor(choose/P[j]);
                        choose-= best[j]*P[j];
                    }
                    var pack = {};
                    var wgt= 0;
                    var val= 0;
                    for (var i= 0; i<best.length; i++) {
                        if (0==best[i]) continue;
                        pack[data[i].name] = {count: best[i], weight: data[i].weight, value: data[i].value };
                        wgt+= best[i]*data[i].weight;
                        val+= best[i]*data[i].value;
                    }
                    pack['total-weight'] = wgt;
                    pack['total-value'] = val;
                    return pack;
                },

                zerooneknapsackrec: function knapsack1(n, val, weight, M){
                    var max_profit;
                    if (M<=0 || n ==0) return 0;
                    else{
                        if (M>=weight[n-1])
                            max_profit = Math.max(knapsack1(n-1, val, weight, M-weight[n-1])+val[n-1], 
                                knapsack1(n-1, val, weight, M)
                            );
                        else
                            max_profit = knapsack1(n-1, val, weight, M);
                    }
                    return max_profit;
                },

                eggdropsrec: function eggDrop(n, k){
                    /*
                        k ==> Number of floors
                        n ==> Number of Eggs
                        eggDrop(n, k) ==> Minimum number of trails needed to find the critical
                                        floor in worst case.
                        eggDrop(n, k) = 1 + min{max(eggDrop(n - 1, x - 1), eggDrop(n, k - x)): 
                                     x in {1, 2, ..., k}}
                    */
                    // If there are no floors, then no trials needed. OR if there is
                    // one floor, one trial needed.
                    if (k == 1 || k == 0) return k;

                    // We need k trials for one egg and k floors
                    if (n == 1) return k;

                    var min = 1000000000, x, res;

                    // Consider all droppings from 1st floor to kth floor and
                    // return the minimum of these values plus 1.
                    for (var x = 1; x <= k; x++)
                    {
                        res = Math.max(eggDrop(n-1, x-1), eggDrop(n, k-x));
                        if (res < min)
                            min = res;
                    }

                    return min + 1;
                },

                eggdrops: function(n, k){
                    /* A 2D table where entery eggFloor[i][j] will represent minimum
                       number of trials needed for i eggs and j floors. */
                    var eggFloor = [], //[n+1][k+1];
                        res,
                        i, j, x;

                    // We need one trial for one floor and0 trials for 0 floors
                    for (i = 1; i <= n; i++){
                        eggFloor[i] = [];
                        eggFloor[i][1] = 1;
                        eggFloor[i][0] = 0;
                    }

                    // We always need j trials for one egg and j floors.
                    for (j = 1; j <= k; j++)
                        eggFloor[1][j] = j;

                    // Fill rest of the entries in table using optimal substructure
                    // property
                    for (i = 2; i <= n; i++){
                        for (j = 2; j <= k; j++){
                            eggFloor[i][j] = 1000000;   //some max safe_integer
                            for (x = 1; x <= j; x++){
                                res = 1 + Math.max(eggFloor[i-1][x-1], eggFloor[i][j-x]);
                                if (res < eggFloor[i][j])
                                    eggFloor[i][j] = res;
                            }
                        }
                    }

                    // eggFloor[n][k] holds the result
                    return eggFloor[n][k];
                },

                eggdropsdifferent: function (eggs, floors){  // This one was my favorite in Collage :)
                    /*
                        logic: Assume we are finding for 56 floors and 4 eggs, no of bits needed for 56 is 6.
                        1. No eggs will be broken in only one case - when the break floor is > 56.
                           We need not consider this case.
                        2. Exactly one egg will be broken in six cases - (1,0,0,0,0,0) => 25, (0,1,0,0,0,0)
                           => 40, (0,0,1,0,0,0) => 48, (0,0,0,1,0,0) => 52, (0,0,0,0,1,0) => 55 and
                           (0,0,0,0,0,1) => 56. That is in 6 cases.
                        3. Exactly two eggs will be broken in ncr(6, 2) = 15 cases.
                        4. Exactly 3 eggs will be broken in ncr(6, 3) = 20 cases.
                        5. Exactly 4 eggs will be broken in ncr(6, 4) = 15 cases.
                        So the total no of cases is 6+15+20+15 = 56a

                        General formula: 
                         In d drops, 1 egg will be broken in ncr(e, 1) floors, 2 eggs will be broken in ncr(e, 2)
                         floors... e eggs will be broken in ncr(d, e), which will cover all the floors considered. 
                         So, Max no of floors that can be tested with d drops is:
                             F(d, e) = SUMMATION(i=1..e) ncr(d, i)
                         we must find the value of above expression when it equals or exceeds the floors.
                    */
                    var drops = 0, flrs = 0, max = 0;
                    while(1){
                        var max = 0;  //first max floors greater then floors.
                        for(var i=0;i<=eggs;++i){  //no egg breaking, must be excluded, we do this by starting from 1
                          max += this.binomial(drops, i);
                        }
                        if(max>floors) break;
                        ++drops;
                    }
                    return drops;
                },


                lpsrec: function lps(seq, i, j){
                    /*
                        http://wcipeg.com/wiki/Longest_palindromic_subsequence
                        Basic Idea: longest palidromic subsequence.
                        // Everay single character is a palindrom of length 1
                        L(i, i) = 1 for all indexes i in given sequence

                        // IF first and last characters are not same
                        If (X[i] != X[j])  L(i, j) =  max{L(i + 1, j),L(i, j - 1)} 

                        // If there are only 2 characters and both are same
                        Else if (j == i + 1) L(i, j) = 2  

                        // If there are more than two characters, and first and last 
                        // characters are same
                        Else L(i, j) =  L(i + 1, j - 1) + 2
                    */
                    // Base Case 1: If there is only 1 character
                    if (i == j) return 1;

                    // Base Case 2: If there are only 2 characters and both are same
                    if (seq[i] == seq[j] && i + 1 == j) return 2;

                    // If the first and last characters match
                    if (seq[i] == seq[j]) return lps (seq, i+1, j-1) + 2;

                    // If the first and last characters do not match
                    return Math.max( lps(seq, i, j-1), lps(seq, i+1, j) );
                },

                lps: function(str){
                    var n = str.length,
                        L = [];  // Create a table to store results of subproblems L[n][n]
                    for(var i = 0; i < n; i++){
                        L[i] = [];
                        for(var j=0; j< n; j++)
                            if(i == j)
                                L[i][j] = 1; // Strings of length 1 are palindrome of lentgh 1
                            else
                                L[i][j] = 0;
                    }

                    // Build the table. Note that the lower diagonal values of table are
                    // useless and not filled in the process. The values are filled in a
                    // manner similar to Matrix Chain Multiplication DP solution (See
                    // http://www.geeksforgeeks.org/archives/15553). cl is length of
                    // substring
                    for (var cl=2; cl<=n; cl++){
                        for (var i=0; i<n-cl+1; i++){
                            var j = i+cl-1;
                            if (str[i] == str[j] && cl == 2) L[i][j] = 2;
                            else if (str[i] == str[j]) L[i][j] = L[i+1][j-1] + 2;
                            else L[i][j] = Math.max(L[i][j-1], L[i+1][j]);
                        }
                    }
                    return L[0][n-1];
                },

                cutrodrec: function cutrope(price, n){
                    //http://www.radford.edu/~nokie/classes/360/dp-rod-cutting.html
                    if (n <= 0) return 0;
                    var max_val = 0;   //some safe min integer

                    // Recursively cut the rod in different pieces and compare different 
                    // configurations
                    for (var i = 0; i < price.length && i < n ; i++){
                        var t = price[i] + cutrope(price, n-i-1);
                        max_val = Math.max(max_val, t);
                    }
                    return max_val;
                },


                cutrod: function(price, n){
                    var r = [],
                        s = [];

                    for(var i =0; i <= n; i++) r[i] = s[i] = 0;

                    for( var j = 1; j <= n; j++){
                        var q = 0;
                        for(var i = 0; i < price.length && i < j; i++){
                            if ( q < price[i] + r[j-i-1] ){
                                q = price[i] + r[j-i-1];
                                s[j] = i+1;
                            }
                        }
                        r[j] = q;
                    }
                    // r[n] will contain max price we could get.

                    var ret = [];  // get the actual cuts
                    while (n > 0) {
                        ret.push(s[n]);
                        n = n - s[n];
                    }
                    return ret;
                },

                msis: function(arr){
                    /* Notes: same as liss, but use sum as criteria, not length */
                    var msis = [],
                        actualseq = [], 
                        max_val = 0,
                        n = arr.length;

                    /* Initialize msis values for all indexes */
                    for ( var i = 0; i < n; i++ ){
                        msis[i] = arr[i];
                        actualseq[i] = i;
                    }

                    /* Compute maximum sum values in bottom up manner */
                    for ( var i = 1; i < n; i++ )
                        for ( var j = 0; j < i; j++ )
                            if ( arr[i] > arr[j] && msis[i] < msis[j] + arr[i]){
                                msis[i] = msis[j] + arr[i];
                                actualseq[i] = j;
                            }

                    /* Pick maximum of all msis values */
                    var index = 0;
                    for ( i = 0; i < n; i++ ){
                        if ( max_val < msis[i] ){
                            max_val = msis[i];
                            index = i;  // take the index to back track for the acutal values. 
                        }
                    }
                    // reutnr max_val if only sum is needed, below code is to extracct actual elements used.
                    var ret = [];
                    while( max_val != 0 ){
                        max_val -= arr[index];
                        ret.push(arr[index]);
                        index = actualseq[index];
                    }

                    return ret.reverse();
                },

                lbs: function(arr){
                    /*
                        Longest Biotonic Sequence: 
                        Idea:  find increasing seq from left, 
                               find increasing seq from right, 
                               find max length out of it.
                        lbs() returns the length of the Longest Bitonic Subsequence in
                        arr[] of size n. The function mainly creates two temporary arrays
                        lis[] and lds[] and returns the maximum lis[i] + lds[i] - 1.

                        lis[i] ==> Longest Increasing subsequence ending with arr[i]
                        lds[i] ==> Longest decreasing subsequence starting with arr[i]
                    */

                    /* Allocate memory for LIS[], LDS[] and initialize L[I|D]S values as 1 for
                      all indexes */
                    var n = arr.length;
                    var lis = [], lds = [];
                    for ( var i = 0; i < n; i++ )
                        lis[i] = lds[i] = 1;

                    /* Compute LIS values from left to right */
                    for ( var i = 1; i < n; i++ )
                      for ( var j = 0; j < i; j++ )
                         if ( arr[i] > arr[j] && lis[i] < lis[j] + 1)
                            lis[i] = lis[j] + 1;

                    /* Compute LDS values from right to left */
                    for ( var i = n-2; i >= 0; i-- )
                      for ( var j = n-1; j > i; j-- )
                         if ( arr[i] > arr[j] && lds[i] < lds[j] + 1)
                            lds[i] = lds[j] + 1;

                    /* Return the maximum value of lis[i] + lds[i] - 1*/
                    var max = lis[0] + lds[0] - 1;
                    for (var i = 1; i < n; i++)
                        if (lis[i] + lds[i] - 1 > max)
                            max = lis[i] + lds[i] - 1;
                    return max;
                },

                minpalindromecuts: function(str){
                    // Get the length of the string
                    var n = str.length;

                    /* 

                        // i is the starting index and j is the ending index. i must be passed as 0 and j as n-1
                        minPalPartion(str, i, j) = 0 if i == j. // When string is of length 1.
                        minPalPartion(str, i, j) = 0 if str[i..j] is palindrome.

                        // If none of the above conditions is true, then minPalPartion(str, i, j) can be 
                        // calculated recursively using the following formula.
                        minPalPartion(str, i, j) = Min { minPalPartion(str, i, k) + 1 +
                                                         minPalPartion(str, k+1, j) } 
                                                   where k varies from i to j-1
                                                   
                        Create two arrays to build the solution in bottom up manner
                        C[i] = Minimum number of cuts needed for palindrome partitioning
                                 of substring str[0..i]
                        P[i][j] = true if substring str[i..j] is palindrome, else false
                        Note that C[i] is 0 if P[0][i] is true 
                    */
                    var C = [];
                    var P = []; // [][];  // dptable boolean array

                    // Every substring of length 1 is a palindrome
                    for (var i=0; i<n; i++){
                        P[i] = [];
                        P[i][i] = true;
                    }

                    /* L is substring length. Build the solution in bottom up manner by
                       considering all substrings of length starting from 2 to n. */
                    for (var L=2; L<=n; L++) {
                        // For substring of length L, set different possible starting indexes
                        for (var i=0; i<n-L+1; i++) {
                            j = i+L-1; // Set ending index

                            // If L is 2, then we just need to compare two characters. Else
                            // need to check two corner characters and value of P[i+1][j-1]
                            if (L == 2)
                                P[i][j] = (str[i] == str[j]);
                            else
                                P[i][j] = (str[i] == str[j]) && P[i+1][j-1];
                        }
                    }

                    for (var i=0; i<n; i++)
                    {
                        if (P[0][i] == true)
                            C[i] = 0;
                        else
                        {
                            C[i] = 10000000;
                            for(var j=0;j<i;j++)
                            {
                                if(P[j+1][i] == true && 1+C[j]<C[i])
                                    C[i]=1+C[j];
                            }
                        }
                    }

                    // Return the min cut value for complete string. i.e., str[0..n-1]
                    return C[n-1];
                },

                partition: function(arr){
                    /* https://en.wikipedia.org/wiki/Partition_problem */
                    var sum = 0;
                    var n = arr.length;

                    // Caculcate sun of all elements
                    for (var i = 0; i < n; i++) sum += arr[i];
                     
                    if (sum%2 != 0)  return false;

                    var part = []; //[sum/2+1][n+1]; // bool array
                    for( var i =0; i < sum/2+1; i++) part[i] = [];

                    for( var j=0; j <=n; j++)
                        part[0][j] = true; // initialize top row as true

                    // initialize leftmost column, except part[0][0], as 0
                    for ( var i = 1; i <= sum/2; i++)
                        part[i][0] = false;     
                      
                     // Fill the partition table in botton up manner 
                     for (var i = 1; i <= sum/2; i++)  {
                        for (j = 1; j <= n; j++)  {
                            part[i][j] = part[i][j-1];
                            if (i >= arr[j-1])
                                part[i][j] = part[i][j] || part[i - arr[j-1]][j-1];
                        }        
                    }    
                     return part[sum/2][n];
                },

                wordwrap: function(l, M) {  // l is lengths of words
                    /*
                        CLR Book - Algo and solution is given.
                        nice link or more food for thoughts: http://xxyxyz.org/line-breaking/
                    */
                    // l[] represents lengths of different words in input sequence. For example, 
                    // l[] = {3, 2, 2, 5} is for a sentence like "aaa bb cc ddddd".  n is size of 
                    // l[] and M is line width (maximum no. of characters that can fit in a line)
                    // For simplicity, 1 extra space is used in all below arrays 

                    function printSolution (p, n, sol) {
                        var k;
                        if (p[n] == 1)
                            k = 1;
                        else
                            k = printSolution (p, p[n]-1, sol) + 1;
                        //console.log("Line number " + k + " From word no. "+ p[n] + " to " + n +" \n");
                        sol.push([k, p[n], n]);
                        return k;
                    }

                    var n = l.length;
                    var INF = 1000000000; // some safe max integer

                    // extras[i][j] will have number of extra spaces if words from i 
                    // to j are put in a single line
                    var extras = []; //[n+1][n+1];  
                    for(var i = 0; i <= n; i++)
                        extras[i] = [];

                    // lc[i][j] will have cost of a line which has words from 
                    // i to j
                    var lc = []; //[n+1][n+1];
                    for(var i = 0; i <= n; i++)
                        lc[i] = [];

                    // c[i] will have total cost of optimal arrangement of words 
                    // from 1 to i
                    var c = []; //[n+1];

                    // p[] is used to print the solution.  
                    var p = []; //[n+1];

                    // calculate extra spaces in a single line.  The value extra[i][j]
                    // indicates extra spaces if words from word number i to j are
                    // placed in a single line
                    for (var i = 1; i <= n; i++){
                        extras[i][i] = M - l[i-1];
                        for (var j = i+1; j <= n; j++)
                            extras[i][j] = extras[i][j-1] - l[j-1] - 1;
                    }

                    // Calculate line cost corresponding to the above calculated extra
                    // spaces. The value lc[i][j] indicates cost of putting words from
                    // word number i to j in a single line
                    for (var i = 1; i <= n; i++){
                        for (var j = i; j <= n; j++){
                            if (extras[i][j] < 0)
                                lc[i][j] = INF;
                            else if (j == n && extras[i][j] >= 0)
                                lc[i][j] = 0;
                            else
                                lc[i][j] = extras[i][j]*extras[i][j];
                        }
                    }

                    // Calculate minimum cost and find minimum cost arrangement.
                    //  The value c[j] indicates optimized cost to arrange words
                    // from word number 1 to j.
                    c[0] = 0;
                    for (var j = 1; j <= n; j++){
                        c[j] = INF;
                        for (var i = 1; i <= j; i++){
                            if (c[i-1] != INF && lc[i][j] != INF && (c[i-1] + lc[i][j] < c[j]))
                            {
                                c[j] = c[i-1] + lc[i][j];
                                p[j] = i;
                            }
                        }
                    }
                    var retArray = [];
                    printSolution(p, n, retArray);
                    return retArray;
                },

                longestoverlappingpairs: function(pairs_array){
                    // this is a variation of the scheduling algorithm where we choose endtimes 
                    // of the tasks to provide a better scheduling sequence.
                    /*
                        insight into something more:
                        Throw the endpoints of the intervals into an array, marking them as either 
                        start- or end-points. Sort them by breaking ties by placing end-points before 
                        start-points if the intervals are closed, or the other way around if they're 
                        half-open.

                        1S, 2S, 3E, 4E, 5S, 10E, 12S, 13S, 14E, 15E
                        Then iterate through the list, keeping track of how many intervals we're in 
                        (this equates to number of start-points processed minus number of end-points). 
                        Whenever we hit a start-point while we have are already in an interval, this 
                        means we must have overlapping intervals.

                        1S, 2S, 3E, 4E, 5S, 10E, 12S, 13S, 14E, 15E
                            ^                          ^
                           overlap                    overlap
                        We can find which intervals overlap with which by storing data alongside the 
                        end-points, and keeping track of which intervals we're in.

                        This is an O(N logN) solution, with sorting being the main factor.
                    */
                    pairs_array.sort(function(pa, pb){return pa[0]-pb[0]});  //Using first indice to sort O(nlogn)

                    var ans = 0;
                    var LP = [];
                    var n = pairs_array.length;

                    for(var i=0;i<n;i++) LP[i] = 1;

                    for(var i=1; i < n; i++)
                        for(var j=0; j < i ; j++)
                            if(pairs_array[j][1] < pairs_array[i][0]) 
                                LP[i] = Math.max(LP[i], LP[j] + 1);

                    for(var i=0;i<n;i++) 
                        ans = Math.max(ans, LP[i]);

                    return ans;
                },

                minjumps: function(arr){
                    /*
                      There is a O(n) approach in greedy for this:
                      http://stackoverflow.com/questions/23301358/linear-time-algorithm-for-minimum-number-of-jumps-required-to-reach-end
                    */
                    var jump = [];   // array to store min jumps 
                    var result = []; // array to store actual indices

                    jump[0] = 0;
                    var INF = 1000000000; //some max safe int
                    for(var i=1; i < arr.length ; i++) jump[i] = INF;

                    for(var i=1; i < arr.length; i++){
                        for(var j=0; j < i; j++){
                            if( arr[j] + j >= i ){
                                if( jump[i] > jump[j] + 1 ){
                                    result[i] = j;
                                    jump[i] = jump[j] + 1;
                                }
                            }
                        }
                    }
                    i = arr.length-1;
                    var ret = [];  //final array to return the actual jumps.
                    while(i > 0){
                        ret.push(i);
                        i = result[i];
                    }
                    ret.push(i);
                    return ret.reverse();
                },

                subsquarematrixwithallones: function(M){
                    var S = []; //[R][C];
                    var max_of_s, 
                        max_i, 
                        max_j; 

                    var R = M.length;
                    var C = M[0].length;

                    /* Set first column of S[][]*/
                    for(var i = 0; i < R; i++){
                        S[i] = [];
                        S[i][0] = M[i][0];
                    }

                    /* Set first row of S[][]*/    
                    for(var j = 0; j < C; j++) S[0][j] = M[0][j];
                      
                    /* Construct other entries of S[][]*/
                    for(var i = 1; i < R; i++) {
                        for(var j = 1; j < C; j++) {
                            if(M[i][j] == 1) 
                                S[i][j] = Math.min(S[i][j-1], S[i-1][j], S[i-1][j-1]) + 1;
                            else
                                S[i][j] = 0;
                        }    
                    } 

                    /* Find the maximum entry, and indexes of maximum entry 
                     in S[][] */
                    max_of_s = S[0][0]; 
                    max_i = 0; 
                    max_j = 0;
                    for(var i = 0; i < R; i++) {
                        for(var j = 0; j < C; j++) {
                            if(max_of_s < S[i][j]) {
                                max_of_s = S[i][j];
                                max_i = i; 
                                max_j = j;
                            }        
                        }                 
                    }     
                    return [max_i, max_j, max_of_s];
                },

                uglynumber: function(n){
                    // below soluion is O(n) using dp and better than the classic one.
                    var ugly = [],
                        i2 = 0, 
                        i3 = 0, 
                        i5 = 0,
                        next_multiple_of_2 = 2,
                        next_multiple_of_3 = 3,
                        next_multiple_of_5 = 5,
                        next_ugly_no = 1;

                    ugly[0] = 1;

                    for(var i=1; i<n; i++){
                        next_ugly_no = Math.min(
                                        next_multiple_of_2,
                                        next_multiple_of_3,
                                        next_multiple_of_5
                                    );
                        ugly[i] = next_ugly_no;

                        if(next_ugly_no == next_multiple_of_2) {
                            i2 = i2+1;       
                            next_multiple_of_2 = ugly[i2]*2;
                        }
                        if(next_ugly_no == next_multiple_of_3) {
                           i3 = i3+1;
                           next_multiple_of_3 = ugly[i3]*3;
                        }
                        if(next_ugly_no == next_multiple_of_5) {
                           i5 = i5+1;
                           next_multiple_of_5 = ugly[i5]*5;
                        }
                    }
                    return next_ugly_no;
                },

                obstrec: function(keys, freqs){
                    //optCost(int freq[], int i, int j)
                    function optCost(freq, i, j){
                        // Base cases
                        if (j < i) return 0;     // If there are no elements in this subarray

                        if (j == i) return freq[i];   // If there is one element in this subarray
                         
                        // Get sum of freq[i], freq[i+1], ... freq[j]
                        var fsum = freq.slice(i, j+1).reduce(function(a, b){ return a + b;});

                        // Initialize minimum value
                        var min = 1000000;  //some safe max int

                        // One by one consider all elements as root and recursively find cost
                        // of the BST, compare the cost with min and update min if needed
                        for (var r = i; r <= j; ++r) {
                           var cost = optCost(freq, i, r-1) + optCost(freq, r+1, j);
                           if (cost < min)
                              min = cost;
                        }

                        // Return minimum value
                        return min + fsum;
                    }

                    // The main function that calculates minimum cost of a Binary Search Tree.
                    // It mainly uses optCost() to find the optimal cost.
                    // Here array keys[] is assumed to be sorted in increasing order.
                    // If keys[] is not sorted, then add code to sort keys, and rearrange
                    // freq[] accordingly.
                    return optCost(freqs, 0, freqs.length-1);
                },

                obst: function(keys, freq){
                    //@ToDo: return the trees themselves once BST lib is ready.
                    /* Create an auxiliary 2D matrix to store results of subproblems */
                    var n = freq.length;
                    var cost = []; //[n][n];
                    var INF = 1000000;    // some safe max  int
                    for(var i=0;i<freq.length; i++) cost[i] = [];

                    /* cost[i][j] = Optimal cost of binary search tree that can be
                       formed from keys[i] to keys[j].
                       cost[0][n-1] will store the resultant cost */

                    // For a single key, cost is equal to frequency of the key
                    for (var i = 0; i < n; i++)     cost[i][i] = freq[i];

                    // Now we need to consider chains of length 2, 3, ... .
                    // L is chain length.
                    for (var L=2; L<=n; L++) {
                        // i is row number in cost[][]
                        for (var i=0; i<n-L+1; i++) {
                            // Get column number j from row number i and chain length L
                            var j = i+L-1;
                            cost[i][j] = INF;

                            // Try making all keys in interval keys[i..j] as root
                            for (var r=i; r<=j; r++) {
                               // c = cost when keys[r] becomes root of this subtree
                               var c = ((r > i)? cost[i][r-1]:0) + 
                                       ((r < j)? cost[r+1][j]:0) + 
                                       freq.slice(i, j+1).reduce(function(a, b){ return a + b;});
                               if (c < cost[i][j])
                                  cost[i][j] = c;
                            }
                        }
                    }
                    return cost[0][n-1];
                },

                subsetsum: function(arr, sum){  // O(n^2)
                    // The value of subset[i][j] will be true if there is a subset of set[0..j-1]
                    //  with sum equal to i
                    
                    arr.sort(function(a, b){return a-b});

                    var subset = []; //[sum+1][n+1];
                    var n = arr.length;

                    // If sum is 0, then answer is true
                    for (var i = 0; i <= n; i++){
                        subset[i] = [];
                        subset[i][0] = true;
                    }

                    // If sum is not 0 and set is empty, then answer is false
                    for (var i = 0; i <= sum; i++){
                        subset[0][i] = false;
                    }
                        

                    // Fill the subset table in botton up manner
                    for (var i = 1; i <= n; i++) {
                        for (var j = 1; j <= sum; j++) {
                            subset[i][j] = subset[i-1][j];
                            if (j >= arr[i-1])
                                subset[i][j] = subset[i][j] || subset[i-1][j-arr[i-1]];
                        }
                    }

                    var ret = [];
                    //back track the actual items from the set if there was a solution
                    var i, j; 
                    if (subset[n][sum]) {
                        i = n; 
                        j = sum;
                    }else{  // last cell in the table is false.
                        i -= 1;
                        j -= arr[i];
                    }

                    while(i > 0  && j > 0){
                        if (subset[i-1][j]) i -= 1;
                        else{
                            i -= 1;
                            j -= arr[i];
                            ret.push(arr[i]);
                        }
                    }
                    return ret.reverse();
                },

                maxsumsubmatrix: function(matrix){
                    // Implementation of Kadane's algorithm for 1D array. The function returns the
                    // maximum sum and stores starting and ending indexes of the maximum sum subarray
                    // at addresses pointed by start and finish pointers respectively.
                    // there is a O(n^2*logn) algo here: http://www.cosc.canterbury.ac.nz/tad.takaoka/cats02.pdf
                    function kadane(arr) {
                        var n = arr.length;
                        // initialize sum, maxSum and
                        var sum = 0, maxSum = -100000000, i;
                     
                        // Just some initial value to check for all negative values case
                        var finish = -1, start;
                     
                        // local variable
                        var local_start = 0;
                     
                        for (i = 0; i < n; ++i) {
                            sum += arr[i];
                            if (sum < 0) {
                                sum = 0;
                                local_start = i+1;
                            }
                            else if (sum > maxSum) {
                                maxSum = sum;
                                start = local_start;
                                finish = i;
                            }
                        }
                     
                         // There is at-least one non-negative number
                        if (finish != -1) return [maxSum, start, finish];
                     
                        // Special Case: When all numbers in arr[] are negative
                        maxSum = arr[0];
                        start = finish = 0;
                     
                        // Find the maximum element in array
                        for (i = 1; i < n; i++) {
                            if (arr[i] > maxSum) {
                                maxSum = arr[i];
                                start = finish = i;
                            }
                        }

                        var ret = [maxSum, start, finish];
                        //console.log(ret);

                        return ret;
                    }

                    function findMaxSum(M){
                        var maxSum = -100000000, // some safe min int
                            finalLeft, finalRight, finalTop, finalBottom;

                        var ROW = M.length;
                        var COL = M[0].length;
                        var left, right, i;
                        // fill temp upto ROW no of zeros
                        var temp = Array.apply(null, new Array(ROW)).map(Number.prototype.valueOf, 0);
                        var sum, start, finish;

                        // Set the left column
                        for (left = 0; left < COL; ++left) {
                            // Initialize all elements of temp as 0
                            temp = Array.apply(null, new Array(ROW)).map(Number.prototype.valueOf, 0);

                            // Set the right column for the left column set by outer loop
                            for (right = left; right < COL; ++right) {
                                // Calculate sum between current left and right for every row 'i'
                                for (i = 0; i < ROW; ++i)
                                    temp[i] += M[i][right];

                                // Find the maximum sum subarray in temp[]. The kadane() function
                                // also sets values of start and finish.  So 'sum' is sum of
                                // rectangle between (start, left) and (finish, right) which is the
                                //  maximum sum with boundary columns strictly as left and right.
                                var result = kadane(temp);

                                sum = result[0];
                                start = result[1];
                                finish = result[2];

                                // Compare sum with maximum sum so far. If sum is more, then update
                                // maxSum and other output values
                                if (sum > maxSum){
                                    maxSum = sum;
                                    finalLeft = left;
                                    finalRight = right;
                                    finalTop = start;
                                    finalBottom = finish;
                                }
                            }
                        }

                        return [    [finalTop, finalLeft],
                                    [finalBottom, finalRight], 
                                    maxSum
                        ];
                    }

                    return findMaxSum(matrix);
                },

                binstringswithoutconsecutiveones: function(n){
                    /*
                        src: http://courses.csail.mit.edu/6.006/oldquizzes/solutions/q2-f2009-sol.pdf
                        Let a[i] be the number of binary strings of length i which do not contain
                        any two consecutive 1’s and which end in 0. Similarly, let b[i] be the number of such
                        strings which end in 1. We can append either 0 or 1 to a string ending in 0, but we can
                        only append 0 to a string ending in 1. This yields the recurrence relation:
                        a[i] = a[i − 1] + b[i − 1]
                        b[i] = a[i − 1]
                        The base cases of our recurrence are a[1] = b[1] = 1. The total number of strings of
                        length i is just a[i] + b[i].
                    */
                    var a, b, c, d;
                    c = d = 1;
                    for (var i = 1; i < n; i++) {
                        a = c + d;
                        b = c;
                        c = a;
                        d = b;
                    }
                    return a + b;
                },

                binstringswithoutconsecutiveoneslogn: function(n){
                    /*  really like this idea: log(n)
                        src: http://ideone.com/TJdQQZ
                    */
                    var save0 = {},
                        save1 = {};  // maps for memoization

                    function end0(n) {
                        if (n <= 1) return 1;
                        if (save0[n]) return save0[n];
                        var a = n>>1;  //just divide by 2
                        var b = n-a;
                        var ans = save0[n] = end0(a)*end0(b)+end1(a)*end0(b-1);
                        return ans;
                    }
                     
                    function end1(n) {
                        if (n == 0) return 0;
                        if (n == 1) return 1;
                        if (save1[n]) return save1[n];
                        var a = n>>1;
                        var b = n-a;
                        var ans = save1[n] = end0(a)*end1(b)+end1(a)*end1(b-1);
                        return ans;
                    }
                    return (end0(n)+end1(n));
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