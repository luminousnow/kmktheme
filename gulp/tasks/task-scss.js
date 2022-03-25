import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import webpCss from "gulp-webpcss";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer"; // Автоматичні css префікси для попереніх версій браузерів
import groupMediaQueries from "gulp-group-css-media-queries"; // Групування медіаправил

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(sass({ outputStyle: "expanded" }))

      // Заміна шляхів по масці
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(app.plugins.replace(/@svg\//g, "../img/svg/"))

      // Початок секції плагіни котрі вступають в роботу при isBuild
      .pipe(app.plugins.if(app.isBuild, groupMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpCss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
          })
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            owerrideBrowserlist: ["last 3 versions"],
            cascade: true,
          })
        )
      )
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      // Закінчення секції плагіни котрі вступають в роботу при isBuild

      .pipe(rename({ extname: ".min.css" }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};
