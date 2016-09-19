var gulp = require('gulp'),
   livereload = require('gulp-livereload'),
   gutil = require('gulp-util'),
   connect = require('gulp-connect'),
   inject = require('gulp-inject'),
   browserSync = require('browser-sync').create(),
   open = require('gulp-open');

var jsSources = ['app/js/**/*.js'],
   cssSources = ['app/css/**/*.css'],
   htmlSources = ['app/**/*.html'];

gulp.task('watch', ['browserSync'], function() {
   gulp.watch(jsSources, ['js']);
   gulp.watch(cssSources, ['css']);
   gulp.watch(htmlSources, ['html']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      routes: {
        "./node_modules/":"node_modules"}
    },
  })
})

var paths = ['node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js', 'node_modules/angular-toastr/dist/angular-toastr.js','node_modules/angular-toastr/dist/angular-toastr.tpls.js', 'node_modules/angular-toastr/dist/angular-toastr.css', 'node_modules/bulma/css/bulma.css','./app/js/app.module.js', './app/**/*.js', './app/**/*.css'];

gulp.task('inject', function() {
   var sources = gulp.src(paths, { read: false });
   return gulp.src('./app/index.html')
       
       .pipe(inject(sources, { relative: true }))
       .pipe(gulp.dest('./app'));
});

gulp.task('js', function() {
   gulp.src(jsSources)
       .pipe(connect.reload())
});

gulp.task('html', function() {
   gulp.src(htmlSources)
       .pipe(connect.reload())
});

gulp.task('css', function() {
   gulp.src(cssSources)
       .pipe(connect.reload())
});

gulp.task('libTransfer', ['clean'], function () {
   return gulp.src(libs)
   .pipe(gulp.dest('./app/lib'));
});

gulp.task('clean', function(){
   return gulp.src('./app/lib/*.*', {read: false})
   .pipe(clean());
});

gulp.task('serve', ['watch', 'libTransfer', 'inject', 'browserSync']);