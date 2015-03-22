/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';


/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --nosync   : Don't launch the browser with browser-sync when serving code.
 * --debug    : Launch debugger with node-inspector.
 * --debug-brk: Launch debugger and break on 1st line with node-inspector.
 * --startServers: Will start servers for midway tests on the test task.
 */

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    src = './src/',
    env = {

        // --- Configurables ---
        sourceDir: src,
        testDir: './test/',
        buildDir: './build/',
        tempDir: './.tmp/',
        proxyPort: 7203,
        port: 3000,
        browserReloadDelay: 1000,
        js: [
            // module files in desired order
            src + 'app.module.js',
            src + 'core/core.module.js',
            src + 'framework/**/*.module.js',
            src + '**/*.module.js',

            // remaining files in desired order
            src + 'core/**/*.js',
            src + 'framework/**/*.js',
            src + '**/*.js'
        ],
        html: src + '**/*.html',
        $: $,
        args: require('yargs').argv,
        gulp: gulp,

        // --- Utilities ---
        log: function log(msg) {
            if (typeof(msg) === 'object') {
                for (var item in msg) {
                    if (msg.hasOwnProperty(item)) {
                        $.util.log($.util.colors.blue(msg[ item ]));
                    }
                }
            } else {
                $.util.log($.util.colors.blue(msg));
            }
        },
        notify: function notify(options) {
            var notifier = require('node-notifier');
            notifier.notify(options);
        }

    };

[
    './gulp-tasks/help',
    './gulp-tasks/serve',
    './gulp-tasks/vet',
    './gulp-tasks/styles',
    './gulp-tasks/clean',
    './gulp-tasks/plato',
    './gulp-tasks/assets',
    './gulp-tasks/template-cache',
    './gulp-tasks/inject',
    './gulp-tasks/optimize',
    './gulp-tasks/test',
    './gulp-tasks/bump'
].forEach(function (file) {
        require(file)(env);
    });


gulp.task('default', [ 'help' ]);

module.exports = gulp;
