/*
    第三方插件  gulp-scss gulp-minify-css gulp-rename
*/
/*
    把.scss文件 =>  css文件 => 压缩 => min.css
*/
const gulp = require("gulp");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
const watch = require("gulp-watch");

/*
    index.scss  => index.css => index.min.css(重命名)
*/
gulp.task("scss", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())/* 通过scss编译 */
    .pipe(gulp.dest("dist/css"))/* dest()存放路径 */
    .pipe(minifyCSS())/* 压缩 */
    .pipe(rename("index.min.css"))/* 重命名为 */
    .pipe(gulp.dest("dist/css"))/* 两个版本 */
    .pipe(connect.reload());/* 每个任务都实时刷新 */
})

/* 批量处理.scss文件 */
gulp.task("scssAll", function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

/* 批量处理.js */
gulp.task("scripts", function(){
    //除gulpfile.js之外
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

/* 批量处理.html */
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

/* 批量处理数据 */
gulp.task("data", function(){
    //除package.json之外
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

/* 批量处理图片 */
gulp.task("images", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

/* 一次性执行多个任务 */
gulp.task("build", gulp.series("scss", "scripts", "copy-html", "data", "scssAll", "images", function(done){
    console.log("项目建立成功");
    done();
}))

/* 建立监听 */
gulp.task("watch", function(done){
    gulp.watch('stylesheet/index.scss', gulp.series("scss"));
    gulp.watch(['*.js', '!gulpfile.js'], gulp.series('scripts'));
    gulp.watch('*.html', gulp.series('copy-html'));
    gulp.watch(['*.json', '!package.json'], gulp.series('data'));
    gulp.watch(['stylesheet/*.scss'], gulp.series('scssAll'));
    gulp.watch('images/**/*', gulp.series('images'));
    done();
})

const connect = require("gulp-connect");
//启动临时服务器
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8887,
        livereload: true
    })
})

gulp.task("default", gulp.series(gulp.parallel('server', 'watch')));
