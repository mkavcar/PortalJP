/*

**************************************************
defaut
**************************************************
-build:dev
-start browserSync with api-fallback
--watch JS -> recompile app.js -> reload bS
--watch HTML -> recompile template.js -> reload bS
--watch CSS\SCSS -> recompile app.css -> reload bS
**************************************************


**************************************************
build:dev
**************************************************
-same as build:prod with minification disabled
**************************************************


**************************************************
build
**************************************************
-clean dist folder
-copy static assets (index.html, images, fonts) to dist folder
-compile/bundle/minify scss into dist folder
-compile/bundle/minify html into dist folder
-compile/bundle/minify vendor js into dist folder
-compile/bundle/minify app js into dist folder
-inject bundles into index.html
**************************************************


**************************************************
run:prod
**************************************************
-same as default, but with minification enabled
**************************************************

*/


var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gulpSequence = require('gulp-sequence'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    del = require('del'),
    angularTemplatecache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    size = require('gulp-size'),
    sass = require('gulp-sass');


// Path settings for Gulp
var base = './src/';
var config = {
    html: base + 'app/**/*.html',
    js: [
        base + 'app/**/*.js',
        '!' + base + 'app/**/*.spec.js',
        ],
    vendor: [
        './node_modules/es6-shim/es6-shim.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        './node_modules/lodash/lodash.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-messages/angular-messages.min.js',
        './node_modules/angular-ui-grid/ui-grid.min.js'
        ],
    css: [
        base + 'content/**/*.css',
        base + 'content/**/*.scss',
        base + 'app/**/*.css',
        base + 'app/**/*.scss'
        ],
    assets: [
        base + 'content/**/',
        '!' + base + 'content/*styles/',
        '!' + base + 'content/*styles/**/',
        '!' + base + 'content/*styles/**/*'
        ],
    templateCache: {
        file: 'html.js',
        options: {
            module: 'rsp.app',
            root: 'app/',
            standAlone: false
        }
    },
    appBundle: 'app.js',
    vendorBundle: 'vendor.js',
    htmlBundle: 'html.js',
    cssBundle: 'app.css',
    dest: './dist/'
};


//init - clean up dist folder
gulp.task('init', function () {
    return del(config.dest);
});


//assets - move static assets to dist folder
gulp.task('assets', function () {
    return gulp.src(config.assets)
        .pipe(gulp.dest(config.dest + '/content'));
});


//index - move index.html to dist folder
gulp.task('index', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest(config.dest));
});


//css
gulp.task('css', function () {
    var s = size();

    return gulp
        .src(config.css)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(s)
        .pipe(gulp.dest(config.dest));
});


//html - create angular template cache
gulp.task('html', function () {
    var s = size();
    
    return gulp
        .src(config.html)
        .pipe(htmlmin({ 
            collapseWhitespace: false, 
            removeComments: true }))
        .pipe(angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(s)
        .pipe(gulp.dest(config.dest));
});


//vendor - bundle vendor.js
gulp.task('vendor', function () {
    var s = size();

    return gulp.src(config.vendor)
        .pipe(concat(config.vendorBundle))
        .pipe(s)
        .pipe(gulp.dest(config.dest));
});


//js - bundle and minify app.js 
gulp.task('js', function () {
    var s = size();

    return gulp.src(config.js)
        .pipe(angularFilesort())
        .pipe(concat(config.appBundle))
        .pipe(uglify())
        .pipe(s)
        .pipe(gulp.dest(config.dest));
});


//js:dev - bundle app.js 
gulp.task('js:dev', function () {
    var s = size();

    return gulp.src(config.js)
        .pipe(angularFilesort())
        .pipe(concat(config.appBundle))
        .pipe(s)
        .pipe(gulp.dest(config.dest));
});


//inject - inject bundled and versioned assets into index.html
gulp.task('inject', function () {
    gulp.src(config.dest + 'index.html')
        .pipe(inject(gulp.src([
            config.dest + config.vendorBundle, 
            config.dest + config.appBundle,
            config.dest + config.htmlBundle,
            config.dest + config.cssBundle
            ], {
                read:false
            }), {
                relative: true, 
                removeTags: true, 
                addSuffix: '?v=' + new Date().getTime()}))
        .pipe(gulp.dest(config.dest));
});


//build - development build
gulp.task('build:dev',
    gulpSequence('init', 'assets', 'index', 'css', 'html', 'vendor', 'js:dev', 'inject'));


//build - production build
gulp.task('build',
    gulpSequence('init', 'assets', 'index', 'css', 'html', 'vendor', 'js', 'inject'));


//default - start browserSync server in development mode and setup watchers for all html/js/css changes
gulp.task('default', ['build:dev'], function () {

    browserSync.init({
        startPath: '/',
        server: {
            baseDir: [config.dest],
            middleware: [historyApiFallback()]
        }
    });

    gulp.watch(config.html, ['html-reload']);
    gulp.watch(config.js, ['js-reload']);
    gulp.watch(config.css, ['css-reload'])
});


//run:prod - start browserSync server in production mode and setup watchers for all html/js/css changes
gulp.task('run:prod', ['build:prod'], function () {

    browserSync.init({
        startPath: '/',
        server: {
            baseDir: [config.dest],
            middleware: [historyApiFallback()]
        }
    });

    gulp.watch(config.html, ['html-reload']);
    gulp.watch(config.js, ['js-reload']);
    gulp.watch(config.css, ['css-reload'])
});


gulp.task('html-reload', ['html'], function (done) {
   browserSync.reload();
   done();
});

gulp.task('js-reload', ['js'], function (done) {
   browserSync.reload();
   done();
});

gulp.task('css-reload', ['css'], function (done) {
   browserSync.reload();
   done();
});