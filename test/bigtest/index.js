import 'core-js/stable';
import 'regenerator-runtime/runtime';

// require all test files matching 'lib/**/tests/*-test'
const requireTest = require.context('../../lib/', true, /(.*?)\/tests\/(.*?)-test/);

requireTest.keys().forEach(requireTest);
