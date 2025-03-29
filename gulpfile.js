const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

// Compile SCSS to CSS
gulp.task("scss", function () {
    return gulp.src("src/scss/**/*.scss") // Change to your SCSS folder
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS()) // Minify CSS
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Minify JavaScript
gulp.task("js", function () {
    return gulp.src("src/js/**/*.js") // Change to your JS folder
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Optimize Images
gulp.task("images", function () {
    return gulp.src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

// Live reload with BrowserSync
gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/scss/**/*.scss", gulp.series("scss"));
    gulp.watch("src/js/**/*.js", gulp.series("js"));
    gulp.watch("*.html").on("change", browserSync.reload);
});

// Default Task
gulp.task("default", gulp.parallel("scss", "js", "images", "serve"));
