var gulp = require('gulp');
var tsc = require('gulp-typescript');

gulp.task('default', function() {     
        return gulp.src('public/javascripts/**/*.ts')
       .pipe(tsc())
       .pipe(gulp.dest('public/javascripts/'));
});