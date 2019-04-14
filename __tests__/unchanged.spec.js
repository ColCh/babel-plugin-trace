const plugin = require('../');
const pluginTester = require('babel-plugin-tester');

pluginTester({
    plugin,
    tests: {
        'does not change code': { code: '"hello world";' },
    }
});