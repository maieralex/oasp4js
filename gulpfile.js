'use strict';

var gulp = require('gulp');
var Server = require('karma').Server;

global.config = require('./gulp/configFactory.js')(require('./config.json'));
global.isProd = function () {
    return process.env.NODE_ENV === 'prod';
};
require('require-dir')('./gulp', {recurse: true});

gulp.task('default', ['clean'], function () {
    gulp.start('build:dist');
});

gulp.task('test', function () {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});
