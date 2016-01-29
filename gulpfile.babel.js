import gulp from "gulp";
import sass from "gulp-sass";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import uglify from "gulp-uglify";
import gzip from "gulp-gzip";
import nodemon from "gulp-nodemon";

gulp.task("js", () => {
  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    /*.pipe(gzip({
      gzipOptions: {
        level: 9
      }
    }))*/
    .pipe(gulp.dest("dist"));

});


gulp.task("sass", () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task("build", ["js", "sass"]);

gulp.task("default", ["build"], () => {
  gulp.watch(['src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/**/*.js'], ['js']);
});

gulp.task('nodemon', function () {
  nodemon({
    exec: 'gulp default'
  , ext: 'js scss html'
  , env: { 'NODE_ENV': 'development' }
  , watch: ['src/**.*', 'gulpfile.babel.js']
  }).on('restart', []);
});
