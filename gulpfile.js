/**
 * Created by rohan on 15-03-23.
 */
// gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    compass          = require('gulp-compass'),
    autoprefixer     = require('gulp-autoprefixer'),
    minifycss        = require('gulp-minify-css'),
    uglify           = require('gulp-uglify'),
    rename           = require('gulp-rename'),
    notify           = require('gulp-notify'),
    livereload       = require('gulp-livereload'),
    plumber          = require('gulp-plumber'),
    path             = require('path'),
    shell = require('gulp-shell'),

  NodeWebkitBuilder = require('node-webkit-builder')



gulp.task('server', function () {

    //return gutil.log('Gulp is running!')
    connect.server({
        root: 'public',
        port: 7000
    });
});

//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

//error notification settings for plumber
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};


gulp.task('css', function() {
    return gulp.src(['public/app/assets/sass/*.scss'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            css: 'public/stylesheets',
            sass: 'public/app/assets/sass',
            image: 'public/app/assets/images'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/app/assets/sass/*.scss'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(notify({ message: 'Styles task complete' }));
});

//watch
gulp.task('watch', function() {
    livereload.listen(35729);

    //watch .scss files
    gulp.watch(['public/app/components/**/*.scss','public/app/assets/sass/*.scss'], ['css']);
   // gulp.watch('public/app/assets/sass/*.scss', ['css']);

    //reload when a template file, the minified css, or the minified js file changes
    gulp.watch(['public/app/components/**/*.js','public/app/components/**/*.html','public/stylesheets/app.min.css'], function(event) {
        gulp.src(event.path)
            .pipe(plumber())
            .pipe(livereload())
        //    .pipe(notify({
        //        title: notifyInfo.title,
        //        icon: notifyInfo.icon,
        //        message: event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was ' + event.type + ' and reloaded'
        //        })
        //);
    });
});

gulp.task('default', ['css','server','watch']);

// Run project
gulp.task('app', shell.task([
   'node node_modules/node-webkit-builder/bin/nwbuild -r ./',
   // 'nw --remote-debugging-port=9222'
    //'nw --enable-transparent-visuals --disable-gpu'
]));

gulp.task('build', function(cb) {

    // Read package.json
    var package = require('./package.json')

    // Find out which modules to include
    var modules = []
    if (!!package.dependencies) {
        modules = Object.keys(package.dependencies)
            .filter(function(m) {
                return m != 'nodewebkit'
            })
            .map(function(m) {
                return './node_modules/' + m + '/**/*'
            });
    }

    // Which platforms should we build
    var platforms = []
    if (process.argv.indexOf('--win') > -1) platforms.push('win')
    if (process.argv.indexOf('--mac') > -1) platforms.push('osx')
    if (process.argv.indexOf('--linux32') > -1) platforms.push('linux32')
    if (process.argv.indexOf('--linux64') > -1) platforms.push('linux64')

    // Build for All platforms
    if (process.argv.indexOf('--all') > -1) platforms = ['win', 'osx', 'linux32', 'linux64']

    // If no platform where specified, determine current platform
    if (!platforms.length) {
        if (process.platform === 'darwin') platforms.push('osx')
        else if (process.platform === 'win32') platforms.push('win')
        else if (process.arch === 'ia32') platforms.push('linux32')
        else if (process.arch === 'x64') platforms.push('linux64')
    }

    // Initialize NodeWebkitBuilder
    var nw = new NodeWebkitBuilder({
        files: ['./package.json', './public/**'].concat(modules),
        cacheDir: './build/cache',
        platforms: platforms,
        macIcns: './public/app/assets/icons/play-icon.icns',
        winIco: './public/app/assets/icons/play-icon.ico',
        checkVersions: false
    })

    nw.on('log', function(msg) {
        // Ignore 'Zipping... messages
        if (msg.indexOf('Zipping') !== 0) console.log(msg);
    });

    // Build!
    nw.build(function(err) {

        if (!!err) {
            return console.error(err);
        }

        // Handle ffmpeg for Windows
        if (platforms.indexOf('win') > -1) {
            gulp.src('./deps/ffmpegsumo/win/*')
                .pipe(gulp.dest(
                    './build/' + package.name + '/win'
                ));
        }

        // Handle ffmpeg for Mac
        if (platforms.indexOf('osx') > -1) {
            gulp.src('./deps/ffmpegsumo/osx/*')
                .pipe(gulp.dest(
                    './build/' + package.name + '/osx/node-webkit.app/Contents/Frameworks/node-webkit Framework.framework/Libraries'
                ));
        }

        // Handle ffmpeg for Linux32
        if (platforms.indexOf('linux32') > -1) {
            gulp.src('./deps/ffmpegsumo/linux32/*')
                .pipe(gulp.dest(
                    './build/' + package.name + '/linux32'
                ));
        }

        // Handle ffmpeg for Linux64
        if (platforms.indexOf('linux64') > -1) {
            gulp.src('./deps/ffmpegsumo/linux64/*')
                .pipe(gulp.dest(
                    './build/' + package.name + '/linux64'
                ));
        }

        cb(err);
    })
});

