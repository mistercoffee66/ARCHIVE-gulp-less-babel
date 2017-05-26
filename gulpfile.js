const path = require('path')
const gulp = require('gulp')
const loadTasks = require('load-gulp-tasks')
const GulpMem = require('gulp-mem')
const sequence = require('run-sequence')

const root = process.cwd()
const dest = path.join(root, 'build')
const gulpMem = new GulpMem()
const options = {
  dest: dest,
  root: root,
  gulpMem: gulpMem
}

gulpMem.serveBasePath = dest

if (process.env.NODE_ENV !== 'production') {
  gulp.dest = gulpMem.dest
}

loadTasks(gulp, options)

gulp.task('default', (done) => {
  sequence(['html:dev', 'js:dev', 'styles:dev'], 'serve:dev', 'watch')
  done()
})
