const path = require('path')
const gulp = require('gulp')
const loadTasks = require('load-gulp-tasks')
const GulpMem = require('gulp-mem')
const sequence = require('run-sequence')

const root = process.cwd()
const virtualFileSystem = new GulpMem()
const targetPath = path.join(root, 'build')

const config = {
  vfs: virtualFileSystem,
  targetPath: targetPath,
  root: root,
  plugins: {}
}

virtualFileSystem.serveBasePath = targetPath

loadTasks(gulp, config)

gulp.task('default', (done) => {
  sequence('html:dev', 'js:dev', 'serve:dev', 'watch')
  done()
})
