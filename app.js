"use strict";

//recomendaciones:
//hay dos opciones:
/*
    Tener un objeto de tareas en el cual esten registradas en formato objeto todas las tareas que vamos a tener, es decir, esto va a ser nuestro estado: 
*/
// let tareas = {
//     porHacer: [
//         "HTML", "CSS"
//     ],
//     completadas: [
//         { nombre: "HTML" },
//         { nombre: "JS" }
//     ]
// }

// //La otra opcion:
// let tareas2 = [
//     { nombre: "HTML", estado: "TO_DO" },
//     { nombre: "HTML", estado: "DONE" },

// ]

//PSEUDOCÓDIGO: ver el video y centrarnis en funcionalidad por funcionalidad:
/*
    -1: AÑADIR TAREAS A POR HACER -> botonAñadirTarea && ENTER tiene que => {
        - recoger el valor del input (seleccionar el input, coger su valor, vaciar el input,comprobar si el valor es vacío) HECHO 
        -guardar el valor en el array de tareas.porHacer (esto se hacía con el push) HECHO
        -pintar la tarea en la zona de tareas por hacer HECHO
        -guardar los valores en Local Storage (para que al recargar el navegador se mantengan)
        -boton tareacompletada se pone verde cuando hago hover

    -2: PASAR DE TAREAS POR HACER A TAREAS COMPLETADAS -> botonTareaCompletada =>{
        -eliminar la tarea de la sección tareas por hacer (con sus respectivos botones =caja)HECHO (remove())
        -añadir la tarea a la sección de tareas completadas tachada (con sus respectivos botones =caja)HECHO (pintar(tarea, localizacion))
        -tachar el texto HECHO (css + if)
        -boton se queda en verde (tiene asociado otro evento de descompletar) HECHO (css + if)
        -Eliminar tarea del array tareas.porHacer Para eliminar un elemento de un array dada por valor, necesita obtener el índice de ese valor usando la función indexOf() y luego usar la función splice() para eliminar el valor del array usando su índice. 
        -Añadirlo en tareas.completadas

        -Actualizar Local Storage (para que al recargar el navegador se mantengan)
    }
    -2: PASAR DE TAREAS COMPLETADAS A TAREAS POR HACER -> botonDescompletar =>{
        -eliminar la tarea de la sección tareas completadas(con sus respectivos botones =caja)HECHO (remove())
        -añadir la tarea a la sección de tareas por hacer (con sus respectivos botones =caja) HECHO (pintar(tarea, localizacion))
        -boton se queda en negro (tiene asociado otro evento de descompletar) HECHO(se queda como esta por defecto porque no añado nada de css con javascript o jquery)
        -Eliminar tarea del array tareas.porHacer
        -Añadirlo en tareas.completadas

        -Actualizar Local Storage (para que al recargar el navegador se mantengan)
    }

    -3: ELIMINAR TAREA -> botonEliminar =>{
        -Eliminar la tarea del array que corresponda 
        -Borrar la tarea de donde esté HECHO (remove())
        -Actualizar Local Storage
    }

*/

function pintaTareaEnElDOM(tarea, lugar) {
                          /////////   FECHA     /////////
  let date = new Date()                        
  let dia = date.getDate();
  let mes = date.getMonth();
  let anio = date.getFullYear();
  let fecha = dia + '/' + mes + '/' + anio;
                          /////////   FECHA     /////////
  //Como quiero crear eventos sobre el contenido dinámico lo pinto de esta manera:
  //Creo la caja contenedora de cada tarea
  let nodoBoxTarea = document.createElement("div");
  //le acabamos de decir que nos cree un div vacío
  console.log(nodoBoxTarea);
  //ahora el nodoBoxTarea yo lo puedo usar exactamente igual que si yo tuviera un elemento seleccionado del html
  nodoBoxTarea.classList.add("list__boxtarea"); //añado la clase

  let nodoP = document.createElement("p"); //creo el p donde irá la tarea que vaya añadiendo el usuario
  nodoP.classList.add("list__p");
  nodoP.innerHTML = tarea; //la pinto
  console.log(nodoP);

  //CAJA SVGs:
  let nodoBoxSvg = document.createElement('div');
  nodoBoxSvg.classList.add('list__boxsvg');

  //SVG CHECK:
  let nodoSvgCheck = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  ); //creamos el svg Check
  nodoSvgCheck.classList.add("list__check");
  nodoSvgCheck.setAttribute("viewBox", "0 0 16 16");

  let nodoPathCheck = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  ); //creamos el path Check
  nodoPathCheck.setAttribute(
    "d",
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
  );

  //SVG DELETE:
  let nodoSvgDelete = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  ); //creamos el svg delete
  nodoSvgDelete.classList.add("list__delete");
  nodoSvgDelete.setAttribute("viewBox", "0 0 16 16");

  let nodoPathDelete = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  ); //creamos el path delete
  nodoPathDelete.setAttribute(
    "d",
    "M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
  );

  //FECHA
  let nodoFecha = document.createElement('div');
  nodoFecha.classList.add("list__fecha");
  nodoFecha.innerHTML = fecha;//pinto la fecha

  //ESTRUCTURA:
  //no quiero la estructuras p y list__boxtarea por separado sino que quiero el p dentro de list__boxtarea para esto:
  nodoBoxTarea.appendChild(nodoP); //encajamos el p dentro de list__boxtarea
  nodoBoxTarea.appendChild(nodoBoxSvg); //encajamos la fecha dentro de list_boxtarea
  nodoBoxSvg.appendChild(nodoSvgCheck); //encajamos el svg dentro de list_boxtarea
  nodoBoxSvg.appendChild(nodoSvgDelete); //encajamos el svg dentro de list_boxtarea
  nodoBoxTarea.appendChild(nodoFecha); //encajamos la fecha dentro de list_boxtarea
  nodoSvgDelete.appendChild(nodoPathDelete); //encajamos el path dentro del svg
  nodoSvgCheck.appendChild(nodoPathCheck); //encajamos el path dentro del svg

  let nodoBoxTareas = document.querySelector(lugar); //selecciono la caja de tareas ya creada en html donde quiero que vaya cada tarea
  nodoBoxTareas.appendChild(nodoBoxTarea); //lo pinto en esa caja

  console.log("Mi array es: ", tareas); //para ver el objeto en la consola cada vez que pinto

  /////////CUANDO HAGO CLICK EN EL CHECK/////////
  //¿COMO DISTINGO EL CHECK de tareas por hacer del de tareas completas? con un if. Y sabiendo quién es el padre, si mi padre es tareaXhacer lo quiero en tareaComplet, mientras que si mi padre es tareaComplet lo quiero en tareaXhacer

  $(nodoSvgCheck).on({
    //Tengo que meter el evento de click del check dentro de la función de pintar en el dom porque yo lo que necesito es que me lo añada cada vez que se crea, si lo pongo fuera el código del evento de click en el check se ejecuta antes de que pintemos en el DOM y sólo se añadiría a los check que ya estén pintados, y no va haber nada pintado antes por lo que no se añadiría a nada. De esta forma cada vez que pinto un check se añade un evento del click al mismo. Además para hacerlo con jquery selecciono el elemento con $() y se tranforma de un elemento nativo de js a un elemento jquery.
    click: function () {
      //Evento creado por jQuery
      console.log("Clic en el check");
      //quiero que borre la tarea de donde esta y la añada en el otro

      // Saber quien es mi padre = .parentNode devuelve el padre del nodo especificado en el árbol.
      console.log("Padre: ", nodoBoxTarea.parentNode);
      if (nodoBoxTarea.parentNode.id === "tareaXHacer") {
        //cuando esta en tareaXhacer (si el padre de BoxTarea tiene el id tareaXhacer )

        pintaTareaEnElDOM(tarea, "#tareaComplet");

        nodoBoxTarea.remove();
        //quiero que BORRE la tarea del ARRAY tarea x hacer en el objeto tareas
        let myIndex = tareas.porHacer.indexOf(tarea); //averiguo la posición en la que está del array
        tareas.porHacer.splice(myIndex, 1); //elimina 1 elemento desde la posición (índice) en la que está la tarea, es decir, eliminará la tarea. Ejemplo: var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']; var removed = myFish.splice(3, 1);// removed is ["mandarin"]// myFish is ["angel", "clown", "drum", "sturgeon"]

        //quiero que añada la tarea a tarea complet
        tareas.completadas.push(tarea);
        guardarLocalStorage();
      } else {
        //cuando esta en tareaComplet (si el padre de BoxTarea tiene otro id) en este caso me sirve solo con if else porque tengo únicamente dos condiciones

        pintaTareaEnElDOM(tarea, "#tareaXHacer");

        nodoBoxTarea.remove();

        //quiero que borre la tarea de tarea complet en el objeto
        let myIndex = tareas.completadas.indexOf(tarea); //averiguo la posición en la que está del array
        tareas.completadas.splice(myIndex, 1);
        //quiero que añada la tarea a tarea x hacer en el objeto
        tareas.porHacer.push(tarea);
        guardarLocalStorage();
      }
    },
  });

  if (lugar === "#tareaComplet") {
    //cambio las propiedades que necesito cuando está en tareas completadas
    nodoP.style.textDecoration = "line-through";
    nodoP.style.fontFamily = "gelpenuprightlightlight";
    nodoP.style.color = "grey";
    nodoBoxTarea.style.border = "1px solid grey";
    nodoSvgCheck.style.color = "green";
    nodoSvgDelete.classList.add("complet");
    nodoFecha.style.color = "grey";
  }

  /////////CUANDO HAGO CLICK EN EL CHECK/////////

  /////////CUANDO HAGO CLICK EN DELETE/////////
  $(nodoSvgDelete).on({
    //Tengo que meter el evento de click del check dentro de la función de pintar en el dom porque yo lo que necesito es que me lo añada cada vez que se crea, si lo pongo fuera el código del evento de click en el check se ejecuta antes de que pintemos en el DOM y sólo se añadiría a los check que ya estén pintados, y no va haber nada pintado antes por lo que no se añadiría a nada. De esta forma cada vez que pinto un check se añade un evento del click al mismo. Además para hacerlo con jquery selecciono el elemento con $() y se tranforma de un elemento nativo de js a un elemento jquery.
    click: function () {
      //Evento creado por jQuery
      console.log("Clic en delete");
      //quiero que borre la tarea de la pantalla:
      nodoBoxTarea.remove();
      //quiero que borre la tarea del objeto:
      //.splice para borrar la tarea del objeto?¿
      let myIndexComplet = tareas.completadas.indexOf(tarea); //averiguo la posición en la que está del array
      tareas.completadas.splice(myIndexComplet, 1);
      let myIndexHacer = tareas.porHacer.indexOf(tarea); //averiguo la posición en la que está del array
      tareas.porHacer.splice(myIndexHacer, 1);

      //guardarLocal
      guardarLocalStorage();

      console.log("Mi array es: ", tareas)
    },
  });
  /////////CUANDO HAGO CLICK EN DELETE/////////
}

function primeraMayuscula(texto) {
  return (
    texto.toUpperCase().charAt(0) +
    texto.substring(1, texto.length).toLowerCase()
  ); //pongo return porque quiero que convierta algo en algo, si no lo pongo me da undefined
}

/////////////// LOCAL STORAGE //////////////
function guardarLocalStorage() {
  let tareas_json = JSON.stringify(tareas); //Objeto -> String necesito json para transformar el objeto en cadena de texto

  localStorage.setItem("tareas", tareas_json); //guardo tareas ya en cadena de texto (para que me lo pueda guardar el Local Storage)
  localStorage.setItem("config_view", viewGrid); //guardo
}

function traerLocalStorage() {
  let tareas_json = localStorage.getItem("tareas");
  console.log(tareas_json);
  if (tareas_json !== null) {
    //me aseguro que solo lo haga cuando haya tareas guardadas (cuando no hay tareas guardadas me da null), por eso pongo qye solo lo gafa cuando tareas_json es distinto de null.
    tareas = JSON.parse(tareas_json); //String -> Objeto transformo la cadena de texto en objeto otra vez
  }
  localStorage.getItem("config_view");
}
/////////////// LOCAL STORAGE //////////////

//-1: AÑADIR TAREAS A POR HACER -> botonAñadirTarea && ENTER tiene que => {- recoger el valor del input (seleccionar el input, coger su valor, vaciar el input,comprobar si el valor es vacío)

let nodoInput = document.querySelector("#input"); //selecciono input

let valorInput = nodoInput.value; //valor del input

let nodoBtnAdd = document.querySelector("#btnAdd"); //selecciono botonadd

let nodoBtnChange = document.querySelector("#btnView"); //selecciono boton cambiar visual

let nodoBoxTarea = document.querySelector(".list__boxtarea"); //selecciono la caja de la tarea

//////HAGO EL OBJETO DE TAREAS//////

let tareas = {
  porHacer: [],
  completadas: [],
};

traerLocalStorage(); //siempre me tengo que traer el local storage una vez definida la lista porque sino me dará null, la lista no está definida todavía.
// -tu tienes actualizada tus tareas a nivel funcional
console.log("tareas al inicio");
console.log(tareas);
// Visual -> Tengo que pintarlos
for (let i = 0; i < tareas.porHacer.length; i++) {
  pintaTareaEnElDOM(tareas.porHacer[i], "#tareaXHacer");
}
for (let i = 0; i < tareas.completadas.length; i++) {
  pintaTareaEnElDOM(tareas.completadas[i], "#tareaComplet");
}

console.log(tareas.porHacer[0]);
//////HAGO EL OBJETO DE TAREAS//////

// let pattern_espacios = / {1,}/gi// hago una expresión regular porque lo que quiero es que un espacio o más no lo pinte esto no me sirve para detectar el vacío porque entonces lo que haría es no pintar cada vez que haya un espacio o más

nodoBtnAdd.addEventListener("click", function () {
  //cuando haga click en boton
  console.log("Clic");
  let valorInput = nodoInput.value; //valor del input
  console.log("Add: ", valorInput);
  let trim_value = valorInput.trim(); // utilizo el trim para quitar los espacios del principio y del final y detectar el vacío""

  // if(! (trim_value === "") ){
  if (trim_value !== "") {
    //COMPROBAR SI EL VALOR ES VACÍO
    //le digo que cuando trim_value (quite los espacios del pricipio y del final) sea distinto de vacío me pinte, entonces cuando sea igual a vacío no me pintará
    console.log("*****: ", valorInput);

    pintaTareaEnElDOM(primeraMayuscula(trim_value), "#tareaXHacer");

    ///////GUARDAR EL VALOR EN EL ARRAY DE TAREAS POR HACER:
    //Cuando añada una tarea tengo que hacer .push y añadirlo al objeto. El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
    tareas.porHacer.push(valorInput);
    console.log(tareas);
  }

  // }

  nodoInput.value = "";

  guardarLocalStorage();
});

nodoInput.addEventListener("keyup", function (evento) {
  //cuando pulse enter
  if (evento.key === "Enter") {
    let valorInput = nodoInput.value; //valor del input

    console.log("Enter: ", valorInput);

    let trim_value = valorInput.trim(); // utilizo el trim para quitar los espacios del principio y del final y detectar el vacío""

    // if(! (trim_value === "") ){
    if (trim_value !== "") {
      //le digo que cuando trim_value (quite los espacios del pricipio y del final) sea distinto de vacío me pinte, entonces cuando sea igual a vacío no me pintará
      console.log("*****: ", valorInput);

      pintaTareaEnElDOM(primeraMayuscula(trim_value), "#tareaXHacer");
      ///////GUARDAR EL VALOR EN EL ARRAY DE TAREAS POR HACER:
      //Cuando añada una tarea tengo que hacer .push y añadirlo al objeto. El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
      tareas.porHacer.push(valorInput);
      console.log(tareas);
    }

    nodoInput.value = ""; //tengo que coger nodoInput.value porque es el "original" con el consigo acceder al input, el elemento que yo veo, si pongo valorInput estoy accediendo a lo que yo ya he transformado.

    guardarLocalStorage();
  }
});

///////CAMBIAR VISUAL/////////
let viewGrid = false;
//Funcional->Actualizada mi forma de verlo a nivel funcional: 
traerLocalStorage();//siempre me tengo que traer el local storage una vez definida la variable viewGrid porque sino me dará null, la variable no está definida todavía.

// Visual -> Tengo que pintarla para que se vea en la web: 

let nodoListWrapper = $(".list__wrapper"); //selecciono '.list__wrapper'
nodoBtnChange.addEventListener("click", function () {
  console.log("clic en change");
  if (viewGrid === false) {
    viewGrid = true;
    nodoListWrapper.addClass("grid");
    $('.list__visual').html("Ver como lista");
    //NO LO PUEDO HACER DE LA SIGUIENTE FORMA PORQUE ESTO SOLO ME AÑADE LAS PROPIEDADES A LAS TAREAS YA EXISTENTES, PERO SI AÑADO UNA NUEVA TAREA SE AÑADE CON LO QUE YO TENGO EN CSS, por eso es mejor añadiendo y quitando una clase de css, de esta forma se añadirá a todos los elementos: los que ya están y los que estoy añadiendo nuevos.
    // $(".list__boxtarea").css('width', (36 +"%"));
    // $(".list__boxtarea").css('margin', ('1rem'));
    // $(".list__boxtarea").css('justify-content', 'center');
    // $(".list__boxtarea").css('flex-flow', 'row wrap');
    // $(".list__p").css('width', (70 +"%"));
    // $(".list__p").css('text-align', "center");
    // nodoBoxTareas.css('flex-flow', 'row wrap');
    guardarLocalStorage();
  } else {
    viewGrid = false;
    nodoListWrapper.removeClass("grid");
    $('.list__visual').html("Ver como tabla");
    // $(".list__boxtarea").css('width', (100 +"%"));
    // nodoBoxTareas.css('flex-flow', 'column nowrap');
    // $(".list__boxtarea").css('margin', (0.6+ 'rem' + 0));
    // $(".list__p").css('text-align', "left");
    // $(".list__boxtarea").css('justify-content', 'flex-start');
    // $(".list__p").css('width', (90 +"%"));
    guardarLocalStorage();
  }
});
