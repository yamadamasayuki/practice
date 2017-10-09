var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var csscomb = require('gulp-csscomb');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var babel = require("gulp-babel");



gulp.task('sass', function(){
	gulp.src('./src/scss/**/*.scss')
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(sass({
			style : 'expanded'
		}))
		.pipe(csscomb())
		.pipe(postcss([
			require('autoprefixer')({
				browsers: ['last 4 versions','ff ESR','ie 9']
			}),
			require('css-mqpacker')
		]))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./htdocs/common/css/'))
});

gulp.task('js', function(){
	// gulp.src(['./src/js/**/*.js', '!src/js/top.js', '!src/js/plugins/*.js'])
	gulp.src(['./src/js/**/*.js', '!src/js/plugins/*.js'])
		.pipe(plumber())
		.pipe(babel( {presets:['es2015']} ))
		// .pipe(concat('common.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./htdocs/common/js/'))
	// gulp.src('./src/js/top.js')
	// 	.pipe(plumber())
	// 	.pipe(babel( {presets:['es2015']} ))
	// 	// .pipe(uglify())
	// 	.pipe(gulp.dest('./htdocs/common/js/'))
});



gulp.task('default', ['sass', 'js']);

gulp.task('w', function(){
	gulp.watch('./src/scss/**/*.scss', ['sass'])
	gulp.watch('./src/js/**/*.js', ['js'])
});

gulp.task('p', function(){
	gulp.src('./src/js/plugins/*.js')
		.pipe(concat('plugins.js'))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('./htdocs/common/js/'));
});
