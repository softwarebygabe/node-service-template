const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const merge = require('merge2');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const typescript = require('typescript');
const tsOptions = require('./tsconfig.json').compilerOptions;
tsOptions.typescript = typescript;

const TS_OUT_PATH = 'dist';
const ALL_TS = ['web.ts', 'src/*.ts', 'src/**/*.ts'];
const TEST_TS = ['test/*.ts', 'test/**/*.ts'];

const appProject = ts.createProject('tsconfig.json', tsOptions);
const testProject = ts.createProject('tsconfig.json', tsOptions);
let failed = false;
gulp.task('compile', () => {
  const tsResult = gulp
    .src(ALL_TS)
    .pipe(sourcemaps.init())
    .pipe(appProject())
    .on('error', function () {
      failed = true;
     })
    .on('finish', function () {
      failed && process.exit(1);
    });
  const testResult = gulp
    .src(TEST_TS)
    .pipe(sourcemaps.init())
    .pipe(testProject())
    .on('error', function () {
      failed = true;
    })
    .on('finish', function () {
      failed && process.exit(1);
    });
  return merge([
    tsResult.dts.pipe(gulp.dest(path.join(TS_OUT_PATH, 'definitions'))),
    tsResult.js
      .pipe(sourcemaps.write({ sourceRoot: path.resolve(__dirname, "src") }))
      .pipe(gulp.dest(path.join(TS_OUT_PATH, 'src'))),
    testResult.js
      .pipe(sourcemaps.write({ sourceRoot: path.resolve(__dirname, "test") }))
      .pipe(gulp.dest(path.join(TS_OUT_PATH, 'test')))
  ]);
});

gulp.task('run', ['compile'], () => {
  nodemon({
    script: 'dist/src/index.js'
  })
});

gulp.task('clean', () => {
  gulp.src(['coverage', TS_OUT_PATH], { read: false }).pipe(clean());
});

gulp.task('watch', ['compile'], () => {
  gulp.watch(['gulpfile.js'].concat(ALL_TS, TEST_TS), ['compile']);
});

gulp.task('default', ['watch', 'run']);
