"use strict";

var gulp = require("gulp");

module.exports = function(config) {
    gulp.task("fonts", ["clean-fonts", "custom-fonts"], function() {
        config.log("Copying fonts");

        var fontDir = "./bower_components/bootstrap-sass/assets/fonts/**/*.*";

        return gulp.src(fontDir).pipe(gulp.dest(config.buildDir + "fonts"));
    });

    gulp.task("custom-fonts", ["clean-fonts"], function() {
        config.log("Copying Custom fonts");

        return gulp
            .src(config.sourceDir + "fonts/**/*.*")
            .pipe(gulp.dest(config.buildDir + "fonts"));
    });

    gulp.task("images", ["clean-images"], function() {
        config.log("Compressing and copying images");

        return gulp
            .src(config.sourceDir + "images/**/*.*")
            .pipe(config.$.imagemin({ optimizationLevel: 4 }))
            .pipe(gulp.dest(config.buildDir + "images"));
    });
    gulp.task("data", ["clean-data"], function() {
        config.log("Compressing and copying data");

        return gulp
            .src(config.sourceDir + "data/**/*.*")
            .pipe(gulp.dest(config.buildDir + "data"));
    });

    //gulp.task('pdfjs', ['clean-pdfjs'], function () {
    //    config.log('Copying pdfjs');
    //    var pdfjsDir = './pdfjs/**/*.*';
    //    return gulp
    //        .src(pdfjsDir)
    //        .pipe(gulp.dest(config.buildDir + 'pdfjs'));
    //});
    gulp.task("webconfig", ["clean-webconfig"], function() {
        config.log("Copying webconfig");

        return gulp
            .src(config.sourceDir + "**/*.config")
            .pipe(gulp.dest(config.buildDir));
    });
};
