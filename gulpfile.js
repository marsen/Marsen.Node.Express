var gulp = require('gulp');
var tsc = require('gulp-typescript');

gulp.task('default', function() {             
        return gulp.src('public/javascripts/**/*.ts')
       .pipe(tsc())
       .pipe(gulp.dest('public/javascripts/'));
}); 

gulp.task('app', function() {     
        return gulp.src(['typescript/app.ts','typescript/**/*.ts'])
       .pipe(tsc())
       .pipe(gulp.dest('./'));
}); 