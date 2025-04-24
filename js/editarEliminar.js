// Matrices de datos de tareas
let acciones = localStorage.getItem('matrizTareas');
let tareasHacer = acciones ? JSON.parse(acciones) : [];
imprimirDatos(tareasHacer, 'datosTareas');
let termi = localStorage.getItem('matrizTerminadas');
let tareasTerminadas = termi ? JSON.parse(termi) : [];
imprimirDatos(tareasTerminadas, 'datosTareasTerminadas');

// Boton para editar tareas de la matriz
const btnEditarTarea = document.getElementById('editar');
btnEditarTarea.addEventListener('click', () => {
    editarTareas();
})
// Boton para eliminar tareas de la matriz
const btnEliminarTarea = document.getElementById('eliminar');
btnEliminarTarea.addEventListener('click', () => {
    eliminarTareas();
})

// Pagina Editar
// Función editar tareas agregadas
function editarTareas(){
    // Captura de los datos ingresados en los inputs
    const tarea = document.getElementById('tarea').value;
    const fechaInicial = document.getElementById('fechaInicial').value;
    const fechaFinal = document.getElementById('fechaFinal').value;
    const estado = document.getElementById('estado').value;

    // Guardar las fechas en una variable nueva para aplicar new Date
    const tiempoInicio = new Date(document.getElementById('fechaInicial').value);
    const tiempoFinal = new Date(document.getElementById('fechaFinal').value);

    // Calcular el número de dias entre dos fechas
    let dife = tiempoFinal.getTime() - tiempoInicio.getTime();
    let dias = dife/(1000*60*60*24);

    // Recorrer la matriz tareasHacer para identificar si existe la tarea y su indice.
    let captura = -1;
    for(let i=0; i<tareasHacer.length; i++){
        if(tarea==tareasHacer[i][0]){
            captura=i;
        }
    }
    // Ingreso la tarea editada según su ubicación en la matriz
    if(captura!=-1){
        tareasHacer[captura]=([tarea,fechaInicial,fechaFinal,estado,dias]);

        // Promesa que se ejecuta despues de cambiar el estado de la tarea de Activo a Terminado
        const promesa = new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(estado=='Terminado'){
                    resolve();
                }else{
                    reject();
                };
            },2000)
        })
        // Consumo de la promesa
        promesa
            .then(resultado => {
                // Eliminar registro en la matriz según su ubicación
                tareasHacer.splice(captura, 1);
                // Agregar tarea terminada a la matriz tareasTerminadas
                tareasTerminadas.push([tarea,fechaInicial,fechaFinal,estado,dias]);

                // Enviar los cambios en las matrices al localStorage
                localStorage.setItem('matrizTareas', JSON.stringify(tareasHacer));
                localStorage.setItem('matrizTerminadas', JSON.stringify(tareasTerminadas));
                
                // Llamar funciones para imprimir matrices
                imprimirDatos(tareasTerminadas, 'datosTareasTerminadas');
                imprimirDatos(tareasHacer, 'datosTareas');
            })
            .catch(error => {
                // Mensaje de error cuando no se cumpla lo contenido en la promesa
                console.error(error);
            })
            .finally(() => {
                // Mensaje de conclusión de la promesa
                console.log('Termino el calculo');
            });
    };

    // Función para limpiar los inputs utilizados
    limpiarInputs('tarea','fechaInicial','fechaFinal');
}

// Función eliminar tareas
function eliminarTareas(){
    // Captura de ls tarea a eliminar en el input
    const tarea = document.getElementById('tarea').value;

    // Verificar la existencia de la tarea y su ubicación en la matriz
    let indice = tareasHacer.findIndex(tareaH => tareaH[0] === tarea);
            if(indice !== -1){
                tareasHacer.splice(indice, 1);
            }
    // Se envian los cambios a las matrices al localStorage
    localStorage.setItem('matrizTareas', JSON.stringify(tareasHacer));
    localStorage.setItem('matrizTerminadas', JSON.stringify(tareasTerminadas));

    //Función para limpiar inputs utilizados
    limpiarInputs('tarea','fechaInicial','fechaFinal');

    // Función que imprime de nuevo la matriz
    imprimirDatos(tareasHacer, 'datosTareas');
}

// Función imprimir matrices de tareas
function imprimirDatos(matriz, id){
    // Se guarda etiqueta dentro de la constante tabla
    const tabla = document.getElementById(id);
    // Se reinicia la etiqueta dejandola en blanco
    tabla.innerHTML = '';
    
    // Recorrer la matriz por cada fila
    matriz.forEach(fila => {
        // Se crea elememento fila
        const filaEle = document.createElement('tr');
        // Se recorre cada fila de la matriz
        fila.forEach(columna => {
            // Se crea elememento celda
            const celda = document.createElement('td');
            // Se anexa contenido a la celda
            celda.textContent=columna;
            // Se agrega un hijo a cada fila
            filaEle.appendChild(celda)
        })
        // Se agrega un hijo fila a la tabla
        tabla.appendChild(filaEle);
    });
}

// Función limpiar inputs 
function limpiarInputs(dato1, dato2, dato3){
    document.getElementById(dato1).value = '';
    document.getElementById(dato2).value = '';
    document.getElementById(dato3).value = '';
}
