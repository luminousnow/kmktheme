import gulp from "gulp";
import { path } from "./gulp/config/config-path.js";
import { plugins } from "./gulp/config/config-plugins.js";

// Глобальна змінна
global.app = {
  isBuild: process.argv.includes("--prod"),
  isDev: !process.argv.includes("--prod"),
  gulp,
  path,
  plugins,
};

// Таски
import { reset } from "./gulp/tasks/task-reset.js"; // Очистка каталога .dist
import { server } from "./gulp/tasks/task-server.js"; // Запуск live Server
import { html } from "./gulp/tasks/task-html.js"; // Обробка html
import { scss } from "./gulp/tasks/task-scss.js"; // Обробка scss
import { javaScript } from "./gulp/tasks/task-javascript.js"; // Обробка js
import { image } from "./gulp/tasks/task-image.js"; // Обробка img
import { svgSprite } from "./gulp/tasks/task-svg.js"; // Обробка svgSprite
import {
  otfToTtf,
  ttfToWoff,
  ttfToWoff2,
  fontsStyle,
} from "./gulp/tasks/task-font.js"; // Конвертація шрифтів

// Спостерігач
function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.img, image);
  gulp.watch(path.watch.js, javaScript);
  gulp.watch(path.watch.svg, svgSprite);
}

// Сценарії Gulp конвертація шрифтів
const mainTasks = gulp.series(
  gulp.series(otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle),
  gulp.parallel(html, scss, javaScript, image, svgSprite)
);
const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));
const build = gulp.series(reset, mainTasks);

// Експорт для NPM
export { dev, build, reset };
