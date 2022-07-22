'use strict'

//recomendaciones: 
//hay dos opciones: 
/*
    Tener un objeto de tareas en el cual esten registradas en formato objeto todas las tareas que vamos a tener, es decir, esto va a ser nuestro estado: 
*/
let tareas = {
    porHacer:[
        "HTML", "CSS"
    ],
    completadas:[
        { nombre:"HTML" },
        { nombre:"JS" }
    ]
}

//La otra opcion: 
let tareas2 = [
    { nombre:"HTML", estado:"TO_DO"},
    { nombre:"HTML", estado:"DONE"},

]


//PSEUDOCÓDIGO: ver el video y centrarnis en funcionalidad por funcionalidad: 
/*
    -1: AÑADIR TAREAS A POR HACER -> botonAñadirTarea && ENTER tiene que => {
        - recoger el valor del input (seleccionar el input, coger su valor, vaciar el input,comprobar si el valor es vacío) 
        -guardar el valor en el array de tareas.porHacer (esto se hacía con el push)
        -pintar la tarea en la zona de tareas por hacer 
        -guardar los valores en Local Storage (para que al recargar el navegador se mantengan)
        -boton tareacompletada se pone verde cuando hago hover

    -2: PASAR DE TAREAS POR HACER A TAREAS COMPLETADAS -> botonTareaCompletada =>{
        -eliminar la tarea de la sección tareas por hacer (con sus respectivos botones =caja)
        -añadir la tarea a la sección de tareas completadas tachada (con sus respectivos botones =caja) 
        -tachar el texto
        -boton se queda en verde (tiene asociado otro evento de descompletar)
        -Eliminar tarea del array tareas.porHacer
        -Añadirlo en tareas.completadas

        -Actualizar Local Storage (para que al recargar el navegador se mantengan)
    }
    -2: PASAR DE TAREAS COMPLETADAS A TAREAS POR HACER -> botonDescompletar =>{
        -eliminar la tarea de la sección tareas completadas(con sus respectivos botones =caja)
        -añadir la tarea a la sección de tareas por hacer (con sus respectivos botones =caja) 
        -boton se queda en negro (tiene asociado otro evento de descompletar)
        -Eliminar tarea del array tareas.porHacer
        -Añadirlo en tareas.completadas

        -Actualizar Local Storage (para que al recargar el navegador se mantengan)
    }

    -3: ELIMINAR TAREA -> botonEliminar =>{
        -Eliminar la tarea del array que corresponda 
        -Borrar la tarea de donde esté
        -Actuañozar Local Storage
    }

*/

function pintaTareaEnElDOM( tarea, lugar ){
    //Como quiero crear eventos sobre el contenido dinámico lo pinto de esta manera: 
    //Creo la caja contenedora de cada tarea
    let nodoBoxTarea = document.createElement( 'div')
    //le acabamos de decir que nos cree un div vacío 
    console.log( nodoBoxTarea );
    //ahora el nodoBoxTarea yo lo puedo usar exactamente igual que si yo tuviera un elemento seleccionado del html
    nodoBoxTarea.classList.add ('list__boxtarea' );//añado la clase

    let nodoP = document.createElement( 'p' );//creo el p donde irá la tarea que vaya añadiendo el usuario
    nodoP.classList.add('list__p')
    nodoP.innerHTML = tarea; //la pinto
    console.log(nodoP)

    //SVG CHECK:
    let nodoSvgCheck = document.createElementNS ( 'http://www.w3.org/2000/svg', 'svg' );//creamos el svg Check
    nodoSvgCheck.classList.add('list__check');
    nodoSvgCheck.setAttribute('viewBox', '0 0 16 16')

    let nodoPathCheck = document.createElementNS ('http://www.w3.org/2000/svg', 'path');//creamos el path Check
    nodoPathCheck.setAttribute('d', 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z')

    //SVG DELETE:
    let nodoSvgDelete = document.createElementNS ( 'http://www.w3.org/2000/svg', 'svg' );//creamos el svg delete
    nodoSvgDelete.classList.add('list__delete');
    nodoSvgDelete.setAttribute('viewBox', '0 0 16 16')

    let nodoPathDelete = document.createElementNS ('http://www.w3.org/2000/svg', 'path');//creamos el path delete
    nodoPathDelete.setAttribute('d', 'M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z')

    


    //no quiero la estructuras card y h1 por separado sino que quiero el h1 dentro de card para esto: 
    nodoBoxTarea.appendChild( nodoP); //encajamos el p dentro de list__boxtarea 
    nodoBoxTarea.appendChild( nodoSvgCheck );//encajamos el svg dentro de list_boxtarea
    nodoBoxTarea.appendChild( nodoSvgDelete );//encajamos el svg dentro de list_boxtarea
    nodoSvgDelete.appendChild( nodoPathDelete); //encajamos el path dentro del svg
    nodoSvgCheck.appendChild( nodoPathCheck); //encajamos el path dentro del svg

    let nodoBoxTareas = document.querySelector(lugar) //selecciono la caja de tareas ya creada en html donde quiero que vaya cada tarea
    nodoBoxTareas.appendChild( nodoBoxTarea ); //lo pinto en esa caja

 

}

//-1: AÑADIR TAREAS A POR HACER -> botonAñadirTarea && ENTER tiene que => {- recoger el valor del input (seleccionar el input, coger su valor, vaciar el input,comprobar si el valor es vacío) 

let nodoInput = document.querySelector('#input');//selecciono input

let valorInput = nodoInput.value; //valor del input

let nodoBtnAdd = document.querySelector('#btnAdd');//selecciono botonadd

let nodoBtnCheck = document.querySelector('.list__check');//selecciono el svg check

let pattern_espacios = / {1,}/gi// hago una expresión regular porque lo que quiero es que un espacio o más no lo pinte

nodoBtnAdd.addEventListener( 'click', function(){ //cuando haga click en boton
    console.log( 'Clic')
    console.log('Add: ', nodoInput.value)

    // if(!pattern_espacios){
        
        // pintaTareaEnElDOM(valorInput.toUpperCase().charAt(0) + valorInput.substring(1, valorInput.length()).toLowerCase()  , '#tareaXHacer')

        pintaTareaEnElDOM(nodoInput.value, '#tareaXHacer')
    // }

   

    valorInput = "";
    
});

nodoInput.addEventListener('keyup', function(evento){//cuando pulse enter
    if( evento.key === 'Enter' ){ 
        
        console.log( 'Enter: ', valorInput );

        
        pintaTareaEnElDOM(valorInput, '#tareaXHacer')


        valorInput = "";
    }
})

//CUANDO HAGO CLICK EN EL CHECK
//¿COMO DISTINGO EL CHECK de tareas por hacer del de tareas completas?

nodoBtnCheck.addEventListener('click', function(){
    //quiero que borre la tarea del donde esta y la añada en el otro
    if()
})

