const gulp = require('gulp');
const imgur = require('./index.js');
var rename = require("gulp-rename");
gulp.task('test', () => {
    gulp.src('./data.in')
        .pipe(imgur())
        .pipe(rename('data.out'))
        .pipe(gulp.dest('./'))
})