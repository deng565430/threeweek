const gulp = require('gulp');
const babel = require('gulp-babel');

// 先执行praise 然后监听文件变化
gulp.task('default', ['praise'], () => {
  gulp.watch(['src/**/*.es', '!src/public/**/*.es'], ['praise'])
});
gulp.task('praise', function () {
  // 监控文件
  gulp.src(['src/**/*.es', '!src/public/**/*.es'])
      .pipe(babel({
        // 编译方法 babel
        presets: ['env']
      }))
      // 输出文件
      .pipe(gulp.dest('build'))
});