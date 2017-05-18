const path = require('path')
const browserSync = require('browser-sync')

const tasks = (gulp, config, plugins) => {

  const bs = browserSync.init({
    server: config.vfs.serveBasePath,
    middleware: config.vfs.middleware
  })

  gulp.task('serve:dev', () => {
    return bs
  })

  gulp.task('watch', (done) => {
    gulp.watch('js/**/*.js', ['js:dev']);
    done()
  })
}

module.exports = tasks