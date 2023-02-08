document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  headerFijo()
  crearGaleria();
  scrollNav();
}
function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  
  
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (event) {
      event.preventDefault()
      const seccionScroll = event.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function headerFijo(){
  const barra = document.querySelector('.header')
  const body = document.querySelector('body');
  const sobreFestival = document.querySelector('.sobre-festival')
  window.addEventListener('scroll',function(){
    if(sobreFestival.getBoundingClientRect().top<0){
      barra.classList.add('fijo') 
      body.classList.add('body-scroll') 
      return
    }
    barra.classList.remove('fijo')
    body.classList.remove('body-scroll') 
    return
  })
}
function crearGaleria() {
  try {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let index = 1; index < 13; index++) {
      const imagen = document.createElement("picture");
      imagen.innerHTML = `<source srcset="build/img/thumb/${index}.avif" type="image/avif">
                <source srcset="build/img/thumb/${index}.webp" type="image/webp">
                <img loading="lazy" src="build/img/thumb/${index}.jpg" alt="">`;
      imagen.onclick = function () {
        mostrarImagen(index);
      };

      galeria.appendChild(imagen);
    }
  } catch (error) {
    console.log(error);
  }
}

function mostrarImagen(index) {
  //CREO UN ELEMENTO IMAGEN QUE AGARRA A LA QUE SE LE HIZO CLICK
  const imagen = document.createElement("picture");
  imagen.innerHTML = `<source srcset="build/img/grande/${index}.avif" type="image/avif">
              <source srcset="build/img/grande/${index}.webp" type="image/webp">
              <img loading="lazy" src="build/img/grande/${index}.jpg" alt="">`;

  //CREO OTRO ELEMENTO OVERLAY
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");

    overlay.remove();
  };

  //BOTON CERRAR
  const cerrarModal = document.createElement("p");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");

    overlay.remove();
  };
  overlay.appendChild(cerrarModal);
  //INSERTO EL OVERLAY EN EL HTML , OSEA EN EL BODY
  const body = document.querySelector("body");
  body.appendChild(overlay);
}
