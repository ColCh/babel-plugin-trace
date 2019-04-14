const plugin = require('../');
const pluginTester = require('babel-plugin-tester');
const path = require('path');

pluginTester({
    plugin,
    snapshot: true,
    title: 'snapshot tests',
    fixtures: path.join(__dirname, '../__fixtures__/')
});