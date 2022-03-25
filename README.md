<h2 style="color:green">Функціонал збірки</h2>

#### HTML

- Шаблонізатор HTML (рgulp-file-include)
- Автоматична розмытка для зображень в HTML (gulp-webp-html-nosvg)
- Мініфікація HTML (gulp-htmlmin)

#### CSS

- Препроцесор SCSS (gulp-sass)
- Підтримка стилів попередніх версій браузерів (gulp-autoprefixer)
- Мініфікація CSS (gulp-clean-css)
- Групування медіаправил (gulp-group-css-media-queries)

#### FONTS

- Автоматична конвертація шрифтів (gulp-fonter, gulp-ttf2woff2)

#### IMAGES

- Мініфікація зображень (gulp-imagemin)
- Автоматичне формування SVG sprite (gulp-svg-sprite)
- Автоматичне створення зображень у webp форматі (webp-converter, gulp-webp)

#### JAVASCRIPT

- Обробка, мініфікація JS (webpack-stream)

#### LIVESERVER

- Browser sync (browser-sync)

<h2 style="color:green">Команди</h2>

- `npm run dev` - запуск режиму розробки
- `npm run build` - збірка продакшин версії
- `npm run deploy` - деплой на GitHub у "gh-pages"
- `npm run reset` - ручна очистка каталогу "./dist"

<div style="margin-left:20px">

---

#### dev

<b>Структура каталогів</b>

src<br />
-- html<br />
-- index.html<br />
-- assets<br />
-------- fonts<br />
-------- img<br />
------------svg<br />
-------- js<br />
------------ modules<br />
------------ script.js<br />
-------- scss<br />
------------ style.scss<br />

<b>Що відбувається</b>

- працює html шаблонізатор File include
- працює конвертуються шрифтів у .otf, .ttf в .woff і .woff2
- працює scss препроцесор
- працює webpack
- підключення зображень через маску `@img/cover.png`
- формується svg спрайт, підключення зображень через маску `@svg/icons.svg#icon-id`
- запуск browserSync

---

#### build

<b>Структура каталогів</b>

dist<br />
-- index.html<br />
-- assets<br />
-------- fonts<br />
-------- img<br />
------------ svg<br />
-------- js<br />
------------ script.min.js<br />
-------- css<br />
------------ style.min.css<br />

<b>Що відбувається</b>

- HTML зборка html, мініфікація
- CSS групування медіаправил, автопрефіксер для старіших версій браузерів, мініфікація
- IMAGES оптимізація зображень, автоматичне створення webp зображень, створення svg спрайту
- JAVASCRIPT webpack, мініфікація

---

#### deploy

!!! <span style="color:red">перед запуском виконати команду</span> `npm run build`

<b>Що відбувається</b>

- публікує вміст каталогу `dist` на GitHub, гілка `gh-pages`

---

#### reset

Примусова очистка каталогу `./dist`

</div>
