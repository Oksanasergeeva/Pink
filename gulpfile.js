"use strict";

  var gulp = require("gulp");
  var sass = require("gulp-sass");
  var plumber = require("gulp-plumber");
  var postcss = require("gulp-postcss");
  var autoprefixer = require("autoprefixer");
  var minify = require("gulp-csso");
  var uglify = require("gulp-uglify");
  var rename = require("gulp-rename");
  var imagemin = require("gulp-imagemin");
  var webp = require("gulp-webp");
  var posthtml = require("gulp-posthtml");
  var include = require("posthtml-include");
  var server = require("browser-sync").create();
  var run = require("run-sequence");
  var del = require("del");
  var pump = require("pump");

  gulp.task("style", function () {
    gulp.src("source/sass/style.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(gulp.dest("build/css"))
      .pipe(minify())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream());
  });

  gulp.task("images", function () {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
   ]))
   .pipe(gulp.dest("build/img"))
  });

  gulp.task("js", function (cb) {
    pump([
          gulp.src('source/js/*.js'),
          uglify(),
          gulp.dest('build/js')
      ],
      cb
    );
  });

  gulp.task("webp", function () {
    return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
  });

  gulp.task("html", function () {
    return gulp.src("source/*.html")
    .pipe(posthtml([
    include()
  ]))
    .pipe(server.stream())
    .pipe(gulp.dest("build"))
  });

  gulp.task("clean", function () {
    return del("build");
  });

  gulp.task("copy", function () {
    return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      ], {
        base: "source"
      })
    .pipe(gulp.dest("build"))
  });

  gulp.task("build", function (done) {
    run(
      "clean",
      "style",
      "images",
      "webp",
      "html",
      "js",
      "copy",
      done
    )
    });

  gulp.task("serve", function() {
    server.init({
    server: "build/"
    });

    gulp.watch("source/*.html", ["html"]);
    gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("source/js/**/*.js", ["script"]);
  });
