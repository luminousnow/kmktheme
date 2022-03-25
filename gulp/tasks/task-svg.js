import svgsprite from "gulp-svg-sprite";
import cheerio from "gulp-cheerio"; // очищення SVG від стилів, тегів

export const svgSprite = () => {
  return (
    app.gulp
      .src(app.path.src.svg, {})

      // прибираємо зайві стилі, щоб вони не перебивали css
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(app.plugins.replace("&gt;", ">")) // фіксим баг роботи cheerio

      // створюємо спрайт
      .pipe(
        svgsprite({
          mode: {
            stack: {
              sprite: `../icons.svg`,
              example: false, // додати файл з виглядом іконок
            },
          },
        })
      )
      // вигружаємо тимчасово в src
      .pipe(app.gulp.dest(`${app.path.sourceFolder}/assets/img/svg/`))
      // забераэмо з src
      .pipe(
        app.gulp.src(`${app.path.sourceFolder}/assets/img/svg/icons.svg`, {
          allowEmpty: true,
        })
      )
      // кладемо в dist
      .pipe(app.gulp.dest(app.path.build.svg))
  );
};
