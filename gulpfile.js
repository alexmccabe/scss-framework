const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const postcssNormalize = require('postcss-normalize');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV || 'dev';

const paths = {
  styles: {
    src: 'src/**/*.scss',
    dest: 'dist'
  }
};

const buildCss = done => {
  return gulp
    .src(paths.styles.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss([postcssNormalize(), autoprefixer()]))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(plugins.cssmin())
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
};

gulp.task('default', buildCss);
