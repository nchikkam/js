var arr,
    passed = 0,
    total = 0,
    start = +new Date();

console.log( '\n STARTING TESTS...\n' );

[
	'add',
	'sub',
	'mul',
	'div'
].forEach( function (method) {
    arr = require('./' + method);
    passed += arr[0];
    total += arr[1];
});

console.log( '\n IN TOTAL: ' + passed + ' of ' + total + ' tests passed in ' +
    ( (+new Date() - start) / 1000 ) + ' secs.\n' );