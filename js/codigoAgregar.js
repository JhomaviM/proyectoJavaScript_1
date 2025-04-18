
// Matrices de datos de tareas
let acciones = localStorage.getItem('matrizTareas');
let tareasHacer = acciones ? JSON.parse(acciones) : [];
imprimirDatos(tareasHacer, 'datosTareas');
let termi = localStorage.getItem('matrizTerminadas');
let tareasTerminadas = termi ? JSON.parse(termi) : [];
imprimirDatos(tareasTerminadas, 'datosTareasTerminadas');

// Botones de acciones del formulario
const btnGuardarTarea = document.getElementById('guardar');
btnGuardarTarea.addEventListener('click', () => {
    agregarTareas();
})

const btnEditarTarea = document.getElementById('editar');
btnEditarTarea.addEventListener('click', () => {
    editarTareas();
})

const btnEliminarTarea = document.getElementById('eliminar');
btnEliminarTarea.addEventListener('click', () => {
    eliminarTareas();
})
// localStorage.clear();

// Función agregar tareas
function agregarTareas(){
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

    let captura = -1;
    for(let i=0; i<tareasHacer.length; i++){
        if(tarea==tareasHacer[i][0]){
            captura=i;
        }
    }

    if(!tarea && !fechaInicial && !fechaFinal && !estado){
        alert('Campos vacios!')
    }else{
        if(fechaInicial > fechaFinal){
            alert('Fecha de inicio no puede ser despues de la fecha final')
        }else{
            if(captura==-1){
                tareasHacer.push([tarea, fechaInicial, fechaFinal, estado, dias]);
            }else{
                alert('Tarea ya ingresada')
            }
        }
    }
    
    localStorage.setItem('matrizTareas', JSON.stringify(tareasHacer));

    limpiarInputs('tarea','fechaInicial','fechaFinal','estado');
    imprimirDatos(tareasHacer, 'datosTareas');
}

// Función editar tareas agregadas
function editarTareas(){
    const tarea = document.getElementById('tarea').value;
    const fechaInicial = document.getElementById('fechaInicial').value;
    const fechaFinal = document.getElementById('fechaFinal').value;
    const estado = document.getElementById('estado').value;

    const tiempoInicio = new Date(document.getElementById('fechaInicial').value);
    const tiempoFinal = new Date(document.getElementById('fechaFinal').value);

    let dife = tiempoFinal.getTime() - tiempoInicio.getTime();
    let dias = dife/(1000*60*60*24);

    let captura = -1;
    for(let i=0; i<tareasHacer.length; i++){
        if(tarea==tareasHacer[i][0]){
            captura=i;
        }
    }
    console.log(captura);
    if(captura!=-1){
        tareasHacer[captura]=([tarea,fechaInicial,fechaFinal,estado,dias]);

        const promesa = new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(estado=='Terminado'){
                    resolve();
                }else{
                    reject();
                };
            },1000)
        })
    
        promesa
            .then(resultado => {
                tareasHacer.splice(captura, 1);
                tareasTerminadas.push([tarea,fechaInicial,fechaFinal,estado,dias]);

                localStorage.setItem('matrizTareas', JSON.stringify(tareasHacer));
                localStorage.setItem('matrizTerminadas', JSON.stringify(tareasTerminadas));
    
                imprimirDatos(tareasTerminadas, 'datosTareasTerminadas');
                imprimirDatos(tareasHacer, 'datosTareas');
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                console.log('Termino el calculo');
            });
    };


    limpiarInputs('tarea','fechaInicial','fechaFinal','estado');
}

// Función eliminar tareas
function eliminarTareas(){
    const tarea = document.getElementById('tarea').value;

    let indice = tareasHacer.findIndex(tareaH => tareaH[0] === tarea);
            if(indice !== -1){
                tareasHacer.splice(indice, 1);
            }
    limpiarInputs('tarea','fechaInicial','fechaFinal','estado');
    imprimirDatos(tareasHacer, 'datosTareas');
}

// Función imprimir matrices de tareas
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

// Función limpiar inputs 
function limpiarInputs(dato1, dato2, dato3, dato4){
    document.getElementById(dato1).value = '';
    document.getElementById(dato2).value = '';
    document.getElementById(dato3).value = '';
    document.getElementById(dato4).value = '';
}