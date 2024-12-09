import gulp from "gulp";
import * as dartSass from "sass"; // Updated import for sass
import gulpSass from "gulp-sass";
import gcmq from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import newer from "gulp-newer";
import pug from "gulp-pug";
import browserSync from "browser-sync";
import { deleteAsync } from "del"; // Updated import

const sass = gulpSass(dartSass); // Ensure this line is correct
const sync = browserSync.create();

const path = {
  build: {
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/",
    fonts: "build/fonts/",
  },
  src: {
    html: "src/*.html",
    js: "src/js/main.js",
    style: "src/style/main.scss",
    img: "src/img/**/*.{jpg,jpeg,png,svg,gif,webp}",
    fonts: "src/fonts/**/*.*",
    pug: "src/*.pug",
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/style/**/*.scss",
    img: "src/img/**/*.{jpg,jpeg,png,svg,gif,webp}",
    fonts: "src/fonts/**/*.*",
    pug: "src/*.*",
  },
  clean: "./build",
};

// BrowserSync task
function browserSyncTask() {
  sync.init({
    server: {
      baseDir: "C://Users/qwe7v/OneDrive/Рабочий стол/bojarinzewa/build/",
    },
  });
}

// Compile Pug to HTML
function pugTask() {
  return gulp
    .src(path.src.pug)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(path.build.html))  // Output HTML to the build folder
    .pipe(sync.stream());
}

// Copy HTML files
function htmlTask() {
  return gulp
    .src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .on('end', () => console.log('HTML files copied to build'))
    .pipe(sync.stream());
}

// Build JS
function jsTask() {
  return gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(sync.stream());
}

// Compile and process SASS
function styleTask() {
  return gulp
    .src(path.src.style)
    .pipe(sass().on("error", sass.logError)) // Ensure this line uses the updated sass variable
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gcmq())
    .pipe(gulp.dest(path.build.css))
    .pipe(sync.stream());
}

function imageTask() {
  return gulp
    .src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(gulp.dest(path.build.img))
    .pipe(sync.stream());
}

// Copy fonts
function fontsTask() {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(sync.stream());
}

// Clean build directory
function cleanTask() {
  return deleteAsync(path.clean);
}

// Watch for file changes
function watchFiles() {
  gulp.watch(path.watch.pug, pugTask);
  gulp.watch(path.watch.html, htmlTask);
  gulp.watch(path.watch.style, styleTask);
  gulp.watch(path.watch.js, jsTask);
  gulp.watch(path.watch.img, imageTask);
  gulp.watch(path.watch.fonts, fontsTask);
}

// General tasks
const build = gulp.series(
  cleanTask,
  gulp.parallel(htmlTask, jsTask, styleTask, fontsTask, imageTask)
);
const watch = gulp.parallel(watchFiles, browserSyncTask);

// Export tasks
export { cleanTask as clean };
export { build };
export { watch };
export default gulp.series(build, watch);
