const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
var uglifyy = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const fileInclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const image = require('gulp-image');
const concat = require('gulp-concat');

let isProd = false; // dev by default

const clean = () => {
	return del(['dist/*'])
}

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream());
};

const scripts = () => {
	src('./src/js/vendor/**.js')
		.pipe(concat('vendor.js'))
        .pipe(uglifyy())
        .pipe(rename("vendor.min.js"))
		.pipe(gulpif(isProd, uglify().on("error", notify.onError())))
		.pipe(dest('./dist/js/'))
  return src(
    ['./src/js/**.js'])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(uglifyy())
    .pipe(rename("scripts.min.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./dist'))
}

const images = () => {
  return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
		'./src/img/*.svg',
		'./src/img/**/*.jpg',
		'./src/img/**/*.png',
		'./src/img/**/*.jpeg'
		])
    .pipe(gulpif(isProd, image()))
    .pipe(dest('./dist/img'))
};

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/partials/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/resources/**', resources);
  watch('./src/img/*.{jpg,jpeg,png,svg}', images);
  watch('./src/img/**/*.{jpg,jpeg,png}', images);
}


exports.default = series(clean, htmlInclude, scripts, styles, resources, images, watchFiles);

