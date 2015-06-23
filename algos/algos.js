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