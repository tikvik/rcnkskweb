var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var data = require('gulp-data');
var fs = require('fs');
var path = require('path');
const debug = require('gulp-debug');
// var merge = require('gulp-controlled-merge-json');

// Reads every image in projects folder in images
const folderPath = './app/images/projects/'
const imgPath = '/images/projects/'
var thumbs = new Array();
var i = 0;
var j = 0;
var x = 0;
thumbs[0] = new Array();
thumbs[0][0] = new Array();
thumbs[0][1] = new Array();
// thumbs[0][2] = "";
// Třetí položka pole pro cestu k obrázkům

fs.readdirSync(folderPath).forEach(fileName => {
	if (fileName != ".DS_Store") {
		// thumbs[][]
		// thumbs[i][2] = imgPath+fileName+"/"
		fs.readdirSync(folderPath+fileName+"/").forEach(images => {
			if (images != ".DS_Store") {
				if (images != "plans") {
					if (images != "PDF") {
						thumbs[i][0][j] = imgPath+fileName+"/"+images
						j=j+1
			}}}
		})

		fs.readdirSync(folderPath+fileName+"/plans/").forEach(planimages => {
			if (planimages != ".DS_Store") {
				thumbs[i][1][x] = imgPath+fileName+"/plans/"+planimages
				x=x+1
			}
		})

		j=0
		x=0
		i=i+1
		thumbs[i] = new Array();
		thumbs[i][0] = new Array();
		thumbs[i][1] = new Array();
		}
})
// for (var i = 0; i < thumbs.length; i++) { 
//     for (var j = 0; j < thumbs[i][1].length; j++)    { 
//         console.log(thumbs[3][2]); 
//     } 
//     console.log("<br>"); 
// }  

function debuger() {
	return gulp
	.src('gulpfile.js')
	        .pipe(debug({title: 'unicorn:'}))
	        .pipe(gulp.dest('dist'))
}

function build() {
	return gulp
		.src('app/templates/*.pug')
		.pipe(
			data(function(file) {
				return JSON.parse(fs.readFileSync('app/data/data.json'));
			})
		)
		.pipe(pug({
			pretty: true,
			data: {
				"gimg" : thumbs
			}
		}))
		// .pipe(pug({
		// 	pretty: true,
		// 	data: {
		// 		test : 'Jo vyšlo'
		// 	}
		// }))
		.pipe(gulp.dest('dist/'));
}




function style() {
	return gulp
		.src('app/sass/**/*.sass') // Gets all files ending with .scss in app/scss
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
}

function slickStyle() {
	return gulp
		.src('app/sass/slick/*.scss') // Gets all files ending with .scss in app/scss
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/slick'))
		.pipe(browserSync.stream());
}

function assets() {
	return gulp.src('app/**/*.{ttf,jpg,svg}').pipe(gulp.dest('./dist'));
}





function watch() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch('app/sass/**/*.sass', style);
	gulp.watch('app/sass/slick/**/*.scss', slickStyle);
	gulp.watch('app/templates/**/*.pug', build);
	gulp.watch('app/**/*.pug', build);
	gulp.watch('app/**/*.{ttf,jpg,svg}', assets);
	gulp.watch('dist/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('app/data/**/*.json').on('change', build);
	gulp.watch('gulpfile.js').on('change', build);


	// gulp.watch('app/sass/**/*.sass', push);
}

// function vue() {
// 	return gulp.src('app/js/components/*.vue')
// 			.pipe(vueComponent({ /* options */ }))
// 			.pipe(gulp.dest('./dist/js/'));
// }

exports.build = build;
exports.style = style;
exports.slickStyle = slickStyle;
exports.assets = assets;
exports.watch = watch;
exports.debuger = debuger;









