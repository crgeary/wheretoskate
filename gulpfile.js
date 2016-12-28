var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var htmlhint = require('gulp-htmlhint');

// --

var errorHandler = function (err) {
    console.log(err.message);
    this.emit('end');
}

gulp.task('styles', () => {
    return gulp.src('src/sass/app.scss')
        .pipe(plumber({ errorHandler }))
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'IE 11'] }))
        .pipe(cleancss())
        .pipe(gulp.dest('public/css'))
        .pipe(livereload())
        .pipe(notify({
            'title': 'wheretoskate!',
            'message': 'SCSS == Done!'
        }));
});

gulp.task('lint', () => {
    return gulp.src(['./src/index.html'])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter());
});

gulp.task('html', () => gulp.src(['./src/index.html']).pipe(livereload()));

// --

gulp.task('watch', ['styles'], () => {
    livereload.listen();
    gulp.watch(['./src/sass/**/*.scss'], ['styles']);
    gulp.watch('./src/index.html', ['html']);
});

gulp.task('default', ['styles']);
gulp.task('build', ['styles']);
