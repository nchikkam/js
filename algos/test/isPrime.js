var count = (function isPrime(algos) {
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

    function TC(a, expected) {
        assert(String(expected), String(algos.isPrime(a)));
    }

    TC(2, true);
    TC(3, true);
    TC(5, true);
    TC(7, true);
    TC(11, true);
    TC(13, true);
    TC(17, true);
    TC(19, true);
    TC(23, true);
    TC(29, true);
    TC(31, true);
    TC(37, true);
    TC(41, true);
    TC(43, true);
    TC(47, true);
    TC(53, true);
    TC(59, true);
    TC(61, true);
    TC(67, true);
    TC(71, true);
    TC(73, true);
    TC(79, true);
    TC(83, true);
    TC(89, true);
    TC(97, true);
    TC(101, true);
    TC(103, true);
    TC(107, true);
    TC(109, true);
    TC(113, true);
    TC(127, true);
    TC(131, true);
    TC(137, true);
    TC(139, true);
    TC(149, true);
    TC(151, true);
    TC(157, true);
    TC(163, true);
    TC(167, true);
    TC(173, true);
    TC(179, true);
    TC(181, true);
    TC(191, true);
    TC(193, true);
    TC(197, true);
    TC(199, true);
    TC(211, true);
    TC(223, true);
    TC(227, true);
    TC(229, true);
    TC(233, true);
    TC(239, true);
    TC(241, true);
    TC(251, true);
    TC(257, true);
    TC(263, true);
    TC(269, true);
    TC(271, true);
    TC(277, true);
    TC(281, true);
    TC(283, true);
    TC(293, true);
    TC(307, true);
    TC(311, true);
    TC(313, true);
    TC(317, true);
    TC(331, true);
    TC(337, true);
    TC(347, true);
    TC(349, true);
    TC(353, true);
    TC(359, true);
    TC(367, true);
    TC(373, true);
    TC(379, true);
    TC(383, true);
    TC(389, true);
    TC(397, true);
    TC(401, true);
    TC(409, true);
    TC(419, true);
    TC(421, true);
    TC(431, true);
    TC(433, true);
    TC(439, true);
    TC(443, true);
    TC(449, true);
    TC(457, true);
    TC(461, true);
    TC(463, true);
    TC(467, true);
    TC(479, true);
    TC(487, true);
    TC(491, true);
    TC(499, true);
    TC(503, true);
    TC(509, true);
    TC(521, true);
    TC(523, true);
    TC(541, true);
    TC(547, true);
    TC(557, true);
    TC(563, true);
    TC(569, true);
    TC(571, true);
    TC(577, true);
    TC(587, true);
    TC(593, true);
    TC(599, true);
    TC(601, true);
    TC(607, true);
    TC(613, true);
    TC(617, true);
    TC(619, true);
    TC(631, true);
    TC(641, true);
    TC(643, true);
    TC(647, true);
    TC(653, true);
    TC(659, true);
    TC(661, true);
    TC(673, true);
    TC(677, true);
    TC(683, true);
    TC(691, true);
    TC(701, true);
    TC(709, true);
    TC(719, true);
    TC(727, true);
    TC(733, true);
    TC(739, true);
    TC(743, true);
    TC(751, true);
    TC(757, true);
    TC(761, true);
    TC(769, true);
    TC(773, true);
    TC(787, true);
    TC(797, true);
    TC(809, true);
    TC(811, true);
    TC(821, true);
    TC(823, true);
    TC(827, true);
    TC(829, true);
    TC(839, true);
    TC(853, true);
    TC(857, true);
    TC(859, true);
    TC(863, true);
    TC(877, true);
    TC(881, true);
    TC(883, true);
    TC(887, true);
    TC(907, true);
    TC(911, true);
    TC(919, true);
    TC(929, true);
    TC(937, true);
    TC(941, true);
    TC(947, true);
    TC(953, true);
    TC(967, true);
    TC(971, true);
    TC(977, true);
    TC(983, true);
    TC(991, true);
    TC(997, true);
    TC(333667, true);

    TC(237, false);
    TC(9, false);
    
    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];
})(this.algos);
if (typeof module !== 'undefined' && module.exports) module.exports = count;
