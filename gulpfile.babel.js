/**
 * gulpfile.babel.js for ABS-Auto CSS Framework project
 * Author: Dmitry Ivanchenko
 */
"use strict";

import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import sass from "gulp-sass";
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import yargs from "yargs";
import del from "del";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("clean", () => {
    return del(["./dist/*"]);
});
gulp.task("styles", () => {
    return gulp.src("./src/scss/*")
        .pipe(sass())
        .pipe(groupmedia())
        .pipe(gulpif(production, autoprefixer({
            cascade: false,
            grid: true
        })))
        .pipe(gulpif(production, mincss({
            compatibility: "ie8", level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(gulp.dest("./dist/css/"))
});

export const development = gulp.series("clean", gulp.parallel(["styles"]));
export const prod = gulp.series("clean",  gulp.parallel(["styles"]));

export default development;

