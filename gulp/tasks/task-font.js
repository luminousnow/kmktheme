import fs from "fs"; // Робота з файловою системою
import fonter from "gulp-fonter"; // Конвертер шрифту .otf в .ttf
import ttf2woff2 from "gulp-ttf2woff2"; // Конвертер шрифту .ttf в .woff та .woff2

// .otf --> .ttf
export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.sourceFolder}/assets/fonts/*.otf`)
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(app.path.src.fonts));
};

// .ttf --> .woff
export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.src.fonts}*.ttf`)
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(app.path.build.fonts));
};

// .ttf --> .woff2
export const ttfToWoff2 = () => {
  return app.gulp
    .src(`${app.path.src.fonts}*.ttf`)
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
};

// Створюємо файл стилів шрифтів fonts.scss
export const fontsStyle = () => {
  // Файл стилів шрифтів розробки
  let fontsFile = `${app.path.sourceFolder}/assets/scss/fonts.scss`;

  // Перевірка наявності файлів шрифтів
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Перевіряєм чи існує файл стилів шрифту
      if (!fs.existsSync(fontsFile)) {
        // Якщо файл відсутній, створюється автоматично
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }

            fs.appendFile(
              fontsFile,
              `@font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"),
                    url("../fonts/${fontFileName}.woff") format("woff");
                font-weight: ${fontWeight};
                font-style: normal;
              }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Якщо файл є, потрібно видалити вручну
        console.log(
          "Файл scss/fonts.scss існує. Для обовлення файлу його потрібно видалити!"
        );
      }
    }
  });

  return app.gulp.src(app.path.sourceFolder);

  function cb() {}
};
