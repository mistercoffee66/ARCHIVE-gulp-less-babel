const path = require('path')
const browserSync = require('browser-sync')
const sequence = require('run-sequence')

const tasks = (gulp, options, plugins) => {

  const bs = browserSync.init({
    server: options.dest,
    middleware: options.gulpMem.middleware
  })

  const watch = plugins.watch

  gulp.task('serve:dev', () => {
    return bs
  })

  gulp.task('reload:styles', () => {
    return bs.reload(path.join(options.dest, 'css/main.css'))
  })

  gulp.task('reload:js', () => {
    return bs.reload(path.join(options.dest, 'js/main.js'))
  })

  gulp.task('watch', (done) => {
    watch('js/**/*.js', () => {
      sequence('js:dev', 'reload:js')
    })
    watch('styles/**/*.less', () => {
      sequence('styles:dev', 'reload:styles')
    })
    done()
  })
}

module.exports = tasks