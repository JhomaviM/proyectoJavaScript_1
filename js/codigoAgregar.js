
let acciones = localStorage.getItem('matrizTareas');
let tareasHacer = acciones ? JSON.parse(acciones) : [];
imprimirDatos(tareasHacer, 'datosTareas');

const btnGuardarTarea = document.getElementById('guardar');
btnGuardarTarea.addEventListener('click', () => {
    tareas();
})

function tareas(){
    const tarea = document.getElementById('tarea').value;
    const fechaInicial = document.getElementById('fechaInicial').value;
    const fechaFinal = document.getElementById('fechaFinal').value;
    const estado = document.getElementById('estado').value;

    const tiempoInicio = new Date(document.getElementById('fechaInicial').value);
    const tiempoFinal = new Date(document.getElementById('fechaFinal').value);

    let dife = tiempoFinal.getTime() - tiempoInicio.getTime();
    let dias = dife/(1000*60*60*24);

    let verde = dias*(50/100);
    let amarillo = dias*(51/100);
    let rojo = dias*(85/100);

    // celdaDias.classList.remove('verde');
    //     celdaDias.classList.remove('amarillo');
    //     celdaDias.classList.remove('rojo');
    //     if(tarea[4]<=verde){
    //         celdaDias.classList.add('verde');
    //     }else{
    //         if(tarea[4]>verde && tarea[4]<=amarillo){
    //             celdaDias.classList.add('amarillo');
    //         }else{
    //             if(tarea[4]>amarillo && tarea[4]<=rojo){
    //                 celdaDias.classList.add('rojo');
    //             }
    //         }
    //     }
    
    if(!tarea || !fechaInicial || !fechaFinal || !estado){
        alert('Campos vacios!')
    }else{
        if(fechaInicial > fechaFinal){
            alert('Fecha de inicio no puede ser despues de la fecha final')
        }else{
            tareasHacer.push([tarea, fechaInicial, fechaFinal, estado, dias]);
        }
    }
    
    localStorage.setItem('matrizTareas', JSON.stringify(tareasHacer));

    document.getElementById('tarea').value = '';
    document.getElementById('fechaInicial').value = '';
    document.getElementById('fechaFinal').value = '';
    document.getElementById('estado').value = '';

    imprimirDatos(tareasHacer, 'datosTareas');
}
// localStorage.clear();
function imprimirDatos(matriz, id){
    const tabla = document.getElementById(id);
    tabla.innerHTML = '';

    matriz.forEach(fila => {
        const filaEle = document.createElement('tr');
        fila.forEach(columna => {
            const celda = document.createElement('td');
            celda.textContent=columna;
            filaEle.appendChild(celda)
        })
        tabla.appendChild(filaEle);
    });
}