/* Require
*******************************************/
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload, 
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    jade        = require('gulp-jade'),
    rename      = require('gulp-rename'),
    del         = require('del');



/* Script task
*******************************************/
gulp.task('scripts', function(){
  return gulp.src(['js/*.js', '!js/*.min.js'])
  .pipe(rename({suffix:'.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('js/'));
})

/* Sass task
*******************************************/
gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
  .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('css/'))
  .pipe(reload({stream:true}));
})

/* jade task
*******************************************/
gulp.task('jade', function(){
  return gulp.src('jadefiles/*.jade')
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest(''));
})


/* html task
*******************************************/
gulp.task('html', function(){
  return gulp.src('*.html')
  .pipe(reload({stream:true}));
})


/* browserSync task
*******************************************/
gulp.task('browserSync', function(){
  browserSync({
    server:{
      baseDir: ''
    }
  });
})

/* Build task
*******************************************/
gulp.task('bulid:copy', function(){
  return gulp.src('/*')
  .pipe(gulp.dest('bulid/'));
})


/* Watch task
*******************************************/
gulp.task('watch', function(){
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('jadefiles/*.jade', ['jade']);
  gulp.watch('*.html', ['html']);
});


/* Default task
*******************************************/
gulp.task('default', ['browserSync', 'watch']);