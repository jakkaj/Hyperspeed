var gulp = require('gulp');
var typescript = require('gulp-tsc');
var ava = require('gulp-ava');
var del = require('del');
var dest_test = "output_test";
var fs = require('fs');

var run = require('gulp-run');
var crlf = require('crlf');

gulp.task('preparePublish', ['version'], function(){  
  return gulp.start('crlf');
});

gulp.task('crlf', function(){
  return new Promise((good)=>{
    crlf.set('./lib/hs.js', 'LF', function(err, endingType) {
      console.log(endingType); 
    });
  });
});

gulp.task('version', function(){
  return run('npm version patch').exec();
});  
  
  
gulp.task('test',["compile:tests"], function() {
    return gulp.src(dest_test + '/runTests/*.js')
    .pipe(ava({verbose: true}));
});

gulp.task('compile:tests',["clean:test"], function(){
    var tsconfig = JSON.parse(fs.readFileSync('test/tsconfig.json', 'utf8'));

    tsconfig.compilerOptions.outDir = dest_test;

    return gulp.src(['test/**/*.ts'])
        .pipe(typescript(tsconfig.compilerOptions))
        .pipe(gulp.dest(dest_test));
});


gulp.task('clean:test', function () {
  return del([
    dest_test + '/**/*'
  ]);
});