const gulp        = require('gulp'); /* подключение пакета */
const browserSync = require('browser-sync'); /* аналог live-сервера */
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

/* создание задачи. В ковычках - название задачи. Функция - базовая настройка */
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "src" /* запуск из папки src */
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") /* то, что возвращает задача после выполнения */
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* сжатый стиль кода */
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css")) /* положить скомпилированные файлы в папку */
        .pipe(browserSync.stream()); /* после сохранения файлов запуск bS */
});

/* отслеживание изменений в коде */
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles')) /* отслеживание */
    gulp.watch("src/*.html").on("change",browserSync.reload);
})

/* запуск задач */
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));