
// Matrices de datos de tareas
let acciones = localStorage.getItem('matrizTareas');
let tareasHacer = acciones ? JSON.parse(acciones) : [];
imprimirDatos(tareasHacer, 'datosTareas');

// Pagina Agregar tareas
// Boton para gardar tareas
const btnGuardarTarea = document.getElementById('guardar');
btnGuardarTarea.addEventListener('click', () => {
    agregarTareas();
})

// localStorage.clear();

// Función agregar tareas
function agregarTareas(){
    // Capturar los datos ingresados en los inputs
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

    // let verde = dias*(50/100);
    // let amarillo = dias*(51/100);
    // let rojo = dias*(85/100);

    // Recorrer la matriz tareasHacer para identificar si existe la tarea y su indice.
    let captura = -1;
    for(let i=0; i<tareasHacer.length; i++){
        if(tarea==tareasHacer[i][0]){
            captura=i;
        }
    }

    // Verificar los inputs en caso de estar vacios
    if(!tarea && !fechaInicial && !fechaFinal && !estado){
        alert('Campos vacios!')
    }else{
        // Verificar los inputs de fecha eb caso que la final sea menor a la inicial
        if(fechaInicial > fechaFinal){
            alert('Fecha de inicio no puede ser despues de la fecha final')
        }else{
            // Verificar sí la tarea ya esta incluida
            if(captura==-1){
                tareasHacer.push([tarea, fechaInicial, fechaFinal, estado, dias]);
            }else{
                alert('Tarea ya ingresada')
            }
        }
    }
    
    // Enviar al localStorage la matriz tareasHacer convertida en json
    localStorage.setItem('matrizTareas', JSON.stringify(tareasHacer));

    // Llamado de la función para limpiar los inputs
    limpiarInputs('tarea','fechaInicial','fechaFinal','estado');
    // Llamado de la función para imprimir la matriz en la tabla
    imprimirDatos(tareasHacer, 'datosTareas');
}

// Función imprimir matrices de tareas
function imprimirDatos(matriz, id){
    // Se guarda etiqueta dentro de la constante tabla
    const tabla = document.getElementById(id);
    console.log(tabla);
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