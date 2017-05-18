const path = require('path')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
//const sourcemaps = require('gulp-sourcemaps')

const tasks = (gulp, config, plugins) => {

  gulp.task('js:dev', () => {
    const b = browserify({
      entries: path.join(config.root, 'js/index.js'),
      debug: true,
      transform: [['babelify', { 'presets': ['es2015'] }]]
    })

    return b.bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      // .pipe(p.uglify())
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(config.vfs.dest(path.join(config.targetPath, 'js')))
  })
}

module.exports = tasks