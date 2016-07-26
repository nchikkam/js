readme.txt
-----------------------------------------------------------------------------------------
Javascript version of the read-through cache implementation: 
For the sake of supporting TDD design approach, a suite of tests have been added to test
each method of the cache class.

The main object is defined in the cache.js and tests are kept in test folder. The cache
object composes of Entry and Doubly Linked List classes. Below is the typical run of the
tests to support the proof for the initial go green release:

NOTES: To run these tests, the system must have node.js installed. 

C:\nary\js\js\cache>npm test

> cache@1.0.0 test C:\nary\js\js\cache
> node ./test/all-tests.js


 STARTING TESTS...


 2 of 2 tests passed in 0 ms


 2 of 2 tests passed in 0 ms


 2 of 2 tests passed in 0 ms


 2 of 2 tests passed in 0 ms


 2 of 2 tests passed in 0 ms


 2 of 2 tests passed in 0 ms


 2 of 2 tests passed in 0 ms

<MISS>  --> UserID not found in Cache, Reading from Memory
<MISS>  --> UserID not found in Cache, Reading from Memory
<MISS>  --> UserID not found in Cache, Reading from Memory
<MISS>  --> UserID not found in Cache, Reading from Memory
<MISS>  --> UserID not found in Cache, Reading from Memory
<HIT>  --> requested UserID found in Cache.
<HIT>  --> requested UserID found in Cache.
<HIT>  --> requested UserID found in Cache.
<HIT>  --> requested UserID found in Cache.
<HIT>  --> requested UserID found in Cache.
<MISS>  --> UserID not found in Cache, Reading from Memory
Invalid UserID or user doens't Exist.
<MISS>  --> UserID not found in Cache, Reading from Memory
Invalid UserID or user doens't Exist.
<MISS>  --> UserID not found in Cache, Reading from Memory
Invalid UserID or user doens't Exist.
<MISS>  --> UserID not found in Cache, Reading from Memory
Invalid UserID or user doens't Exist.
<MISS>  --> UserID not found in Cache, Reading from Memory
Invalid UserID or user doens't Exist.
undefined
5
4

 6 of 6 tests passed in 10 ms

<HIT>  --> requested UserID found in Cache.

 1 of 1 tests passed in 0 ms


 2 of 2 tests passed in 0 ms


 IN TOTAL: 23 of 23 tests passed in 0.07 secs.