const { src, dest, watch, parallel, tree } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
//JAVASCRIPT
const terser = require("gulp-terser-js");

//IMAGENES
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function tarea(done) {
  try {
    console.log("holaa");
  } catch (error) {}
  done();
}

function css(done) {
  try {
    src("src/scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write("."))
      .pipe(dest("build/css"));
  } catch (error) {
    console.log(error);
  }
  done();
}
function dev(done) {
  try {
    watch("src/scss/**/*.scss", css); //Vigila a ese archivo y si hay un cambio llama a esa funcion
    watch("src/js/**/*.js", javascript);
    watch("index.html");
    console.log("esta watcheando");
  } catch (error) {}
  done();
}
//IMAGENES

function convertirWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
  //simplemente recorre toda la carpeta buscando esos archivos con esas extensiones y las converite con la funcion webp
}
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  done();
}

function convertirAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  done();
  //simplemente recorre toda la carpeta buscando esos archivos con esas extensiones y las converite con la funcion webp
}

//JAVASCRIPT

function javascript(done) {
  src("src/js/**/*.js").pipe(dest("build/js"))
  .pipe(terser());
  done();
}
exports.css = css;
exports.imagenes = imagenes;
exports.convertirWebp = convertirWebp;
exports.dev = parallel(javascript, dev);
/* imagenes,convertirWebp,convertirAvif */
