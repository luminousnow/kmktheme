import * as nodePath from "path"; // імпорт модуля з node_modules

const rootFolder = nodePath.basename(nodePath.resolve()); // отримуємо назву каталогу проекта
const buildFolder = "./dist"; // каталог зібраного проекту
const sourceFolder = "./src"; // каталог з файлами розробки проекту

export const path = {
  // Шляхи для dist
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/assets/css/`,
    js: `${buildFolder}/assets/js/`,
    img: `${buildFolder}/assets/img/`,
    svg: `${buildFolder}/assets/img/svg/`,
    fonts: `${buildFolder}/assets/fonts/`,
  },

  // Шляхи для src
  src: {
    html: `${sourceFolder}/*.html`,
    scss: `${sourceFolder}/assets/scss/style.scss`,
    js: `${sourceFolder}/assets/js/script.js`,
    img: `${sourceFolder}/assets/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
    svg: [
      `${sourceFolder}/assets/img/svg/*.svg`,
      `!${sourceFolder}/assets/img/svg/icons.svg`,
    ],
    fonts: `${sourceFolder}/assets/fonts/`,
  },

  // Шляхи файлів за якими ведеться спостереження
  watch: {
    html: `${sourceFolder}/**/*.html`,
    scss: `${sourceFolder}/assets/scss/**/*.scss`,
    js: `${sourceFolder}/assets/js/**/*.js`,
    img: `${sourceFolder}/assets/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
    svg: [
      `${sourceFolder}/assets/img/svg/*.svg`,
      `!${sourceFolder}/assets/img/svg/icons.svg`,
    ],
  },

  clean: buildFolder,
  rootFolder,
  buildFolder,
  sourceFolder,
  ftp: ``, // назва каталогу на віддаленому сервері
};
