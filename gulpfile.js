const gulp = require('gulp');
const babel = require('gulp-babel');

// 先执行praise 然后监听文件变化
gulp.task('default', ['praise'], () => {
  gulp.watch(['src/**/*.js', '!src/public/**/*.js'], ['praise'])
});
gulp.task('praise', function () {
  // 监控文件
  gulp.src(['src/**/*.js', '!src/public/**/*.js'])
      .pipe(babel({
        // 编译方法 babel
        presets: ['env']
      }))
      // 输出文件
      .pipe(gulp.dest('build'))
});