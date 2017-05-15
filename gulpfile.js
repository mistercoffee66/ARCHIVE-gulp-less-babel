const gulp = require('gulp')
const p = require('gulp-load-plugins')()
const sequence = require('run-sequence')
const path = require('path')
const GulpMem = require('gulp-mem')
const browserSync = require('browser-sync')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

// process.env.GULPMEM = new GulpMem()
// process.env.GULPMEM.serveBasePath = path.join(__dirname, 'build')
// process.env.DEST = process.env.GULPMEM.dest
const gulpMem = new GulpMem()
gulpMem.serveBasePath = './build'

gulp.task('setProd', (done) => {
  process.env.DEST = path.join(__dirname, 'build')
  done()
})

gulp.task('js-dev', () => {
  const b = browserify({
    entries: path.join(__dirname, 'js/index.js'),
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  })

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(p.sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    // .pipe(p.uglify())
    // .on('error', gutil.log)
    .pipe(p.sourcemaps.write('./'))
    .pipe(gulpMem.dest(path.join(gulpMem.serveBasePath, 'js')))
})

gulp.task('html-dev', () => {
  return gulp.src('index.html')
    .pipe(gulpMem.dest(gulpMem.serveBasePath))
})

gulp.task('serve-dev', (done) => {
  browserSync.init({
    server: gulpMem.serveBasePath,
    middleware: gulpMem.middleware
  })
  done()
})

gulp.task('default', (done) => {
  sequence('html-dev', 'js-dev', 'serve-dev')
  done()
})
