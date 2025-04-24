// Objeto con datos de usuario y contraseña
let validacion = {
    user: 'jonatan',
    password: '12345'
}
// Boton para ejecutar función ingresarUsuario()
const btnIngresar = document.getElementById('ingresar');
btnIngresar.addEventListener('click', ()=> {
    ingresarUsuario();
})

// Función para verificar credenciales de usuario
function ingresarUsuario(){
    // Inputs para la captura de datos
    const usuario = document.getElementById('usuario').value;
    const contra = document.getElementById('password').value;

    // Se inserta un mensaje para avisar del proceso de validación de credenciales
    document.getElementById('mensaje').innerText='Validando credenciales . . .'
    // Promesa que vereifica credenciales
    const promesa = new Promise((resolve, reject) => {
        setTimeout(()=>{
            // Validación de credenciales según las establecidas
            if(usuario==validacion.user && contra==validacion.password){
                resolve(1);
            }else{
                reject('Credenciales incorrectas');
            }
        }, 2000)
    })
    // Consumo de la promesa
    promesa
        .then(resultado => {
            // Se muestra la siguiente pagina cuando se valide las credenciales
            window.location.href = 'tareas.html';
            // Limpiar los inputs utilizados
            limpiarInputs('usuario','password','mensaje');
        })
        .catch(error => {
            // Mensaje cuando no sea exitosa la validación de credenciales
            alert(error);
            // Limpiar los inputs utilizados
            limpiarInputs('usuario','password','mensaje');
            document.getElementById('mensaje').innerText='';
        })
        .finally(() => {
            // Mensaje que anuncia la terminación de la promesa
            console.log('Termino el calculo');
        });
}
// Función limpia los campos del input
function limpiarInputs(dato1, dato2, dato3){
    document.getElementById(dato1).value = '';
    document.getElementById(dato2).value = '';
    document.getElementById(dato3).value = '';
}