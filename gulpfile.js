var prod = true;

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  reload = require('browser-sync').reload;

var path = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/',
    fonts: 'dist/fonts/',
    ext: 'dist/external/'
  },
  src: {
    html: [ 'src/**/*.pug' ],
    js: 'src/js/*.js',
    style: 'src/sass/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    ext: 'src/external/**/*.*'
  },
  watch: {
    html: 'src/**/*.pug',
    js: 'src/js/**/*.js',
    style: 'src/sass/**/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './dist'
};

var serverConfig = {
  server: {
    baseDir: './dist'
  },
  tunnel: false,
  host: 'localhost',
  port: 63341,
  logPrefix: 'browser-sync',
  open: false
};

// SASS
gulp.task('sass', function() {
  var outputStyle = prod ? 'compressed' : 'expanded';
  if (prod) {
    sourcemaps = {};
    sourcemaps.init = gutil.noop;
    sourcemaps.write = gutil.noop;
  }
  gulp
    .src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        soursemap: !prod,
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer({ browsers: [ 'last 15 versions' ] }))
    //.pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({ stream: true }));
});

// PUG
gulp.task('pug', function() {
  gulp
    .src(path.src.html)
    .pipe(
      pug({
        pretty: prod
      })
    )
    .pipe(gulp.dest(path.dist.html))
    .pipe(reload({ stream: true }));
});

// SCRIPTS
gulp.task('scripts', function() {
  if (!prod) {
    uglify = gutil.noop;
  }
  gulp
    .src(path.src.js)
    .pipe(
      babel({
        presets: [ 'es2015' ]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({ stream: true }));
});

// IMAGES
gulp.task('images', function() {
  gulp.src(path.src.img).pipe(gulp.dest(path.dist.img));
});

// FONTS
gulp.task('fonts', function() {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.dist.fonts));
});

// EXTERNAL (PLUGINS)
gulp.task('plugins', function() {
  gulp.src(path.src.ext).pipe(gulp.dest(path.dist.ext));
});

// SERVER
gulp.task('browser-sync', function() {
  browserSync.init(serverConfig);
});

// WATCH
gulp.task('watch', function() {
  gulp.watch(path.watch.html, [ 'pug' ]);
  gulp.watch(path.watch.style, [ 'sass' ]);
  gulp.watch(path.watch.js, [ 'scripts' ]);
  gulp.watch(path.watch.img, [ 'images' ]);
});

// DEFAULT
gulp.task('default', [ 'sass', 'pug', 'scripts', 'images', 'fonts', 'plugins', 'browser-sync', 'watch' ]);
