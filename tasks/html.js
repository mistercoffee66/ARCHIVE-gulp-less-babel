
const tasks = (gulp, config, plugins) => {

  gulp.task('html:dev', () => {
    return gulp.src('index.html')
      .pipe(config.vfs.dest(config.vfs.serveBasePath))
  })
}

module.exports = tasks