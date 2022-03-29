import fileInclude from "gulp-file-include"; // Зборщик html
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // Додає розмітку webp до зображень
import versionNumber from "gulp-version-number"; // Додає версію до css та js
import htmlMin from "gulp-htmlmin"; // Мінімізація коду

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(fileInclude())
      .pipe(app.plugins.replace(/@img\//g, "assets/img/"))
      .pipe(app.plugins.replace(/@svg\//g, "assets/img/svg/"))

      // Початок секції плагіни котрі вступають в роботу при isBuild
      .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
      // .pipe(
      //   app.plugins.if(
      //     app.isBuild,
      //     htmlMin({
      //       collapseWhitespace: true,
      //     })
      //   )
      // )
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )
      // Закінчення секції плагіни котрі вступають в роботу при isBuild

      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browserSync.stream())
  );
};
