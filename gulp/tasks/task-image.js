import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const image = () => {
  return (
    app.gulp
      .src(app.path.src.img)

      // Початок секції плагіни котрі вступають в роботу при isBuild
      .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.img)))
      .pipe(app.plugins.if(app.isBuild, webp()))
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.img)))
      .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.img)))
      .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.img)))
      .pipe(
        app.plugins.if(
          app.isBuild,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          })
        )
      )
      // Закінчення секції плагіни котрі вступають в роботу при isBuild

      .pipe(app.gulp.dest(app.path.build.img))
      .pipe(app.plugins.browserSync.stream())
  );
};
