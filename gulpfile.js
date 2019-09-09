"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var webp = require("gulp-webp");
var del = require("del");

var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))

    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
      "source/normalize.css"
  ], {
    base:"source" // указываем начальную точку пути для правильного создания подпапок
  })
  .pipe(gulp.dest("build/css"));
})


//оптимизация изображений
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo(),
]))
    .pipe(gulp.dest("build/img"));
});

//создает изображения в формате Вебпи
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 92}))
    .pipe(gulp.dest("build/img/webp"));
});

gulp.task("copynormalize", function () {
  return gulp.src([
    "source/normalize.css"
  ], {
    base:"source" // указываем начальную точку пути для правильного создания подпапок
  })
  .pipe(gulp.dest("build/css"));
})

gulp.task("copyfiles", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**",
    "source/*.ico",
    "source/*.html"
  ], {
    base:"source" // указываем начальную точку пути для правильного создания подпапок
  })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function () {
  return del("build");
});

gulp.task("f5", function (done) {
  server.reload(),
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "f5"));
  gulp.watch("source/*.html", gulp.series("copyfiles", "f5"));
});

gulp.task("build", gulp.series("clean", "css", "copyfiles", "copynormalize",  "images", "webp"));
gulp.task("start", gulp.series("build", "server"));


// "use strict";
//
// var gulp = require("gulp");
// var plumber = require("gulp-plumber");
// var sourcemap = require("gulp-sourcemaps");
// var sass = require("gulp-sass");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var server = require("browser-sync").create();
//
// gulp.task("css", function () {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("source/css"))
//     .pipe(server.stream());
// });
//
// gulp.task("server", function () {
//   server.init({
//     server: "source/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//
//   gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
//   gulp.watch("source/*.html").on("change", server.reload);
// });
//
// gulp.task("start", gulp.series("css", "server"));
