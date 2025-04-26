// Objeto con datos de usuario y contraseña
let registros = localStorage.getItem('matrizUsuarios');
let validacion = registros ? JSON.parse(registros) : [];
console.log(validacion);
// localStorage.clear();

// Boton para registrar usuarios
const btnRegistrar = document.getElementById('registrar');
btnRegistrar.addEventListener('click', () => {
    registrar();
});
// Captura de inputs en constantes
const usuario = document.getElementById('usuario');
const contra = document.getElementById('password');

// Función para insertar nuevos usuarios
function registrar(){
    // se guardan datos introducidos a los inputs en variables
    let nombreUser = usuario.value;
    let contraUser = contra.value;

    if(nombreUser=='' && contraUser==''){
        alert('Campos vacios');
    }else{
        // Validación si existe usuario ya registrado
        const usuarioEncontrado = validacion.find(dato => nombreUser==dato.user);
        // Si el usuario no esta se inverta nuevo
        if(!usuarioEncontrado){
            validacion.push({user: nombreUser, password: contraUser});
        }else{
            alert('Usuario ya registrado');
        };
    };

    // Se guarda la matriz en el localStorage
    localStorage.setItem('matrizUsuarios', JSON.stringify(validacion));
    // Se limpian los inputs
    limpiarInputs('usuario','password','mensaje');
};

// Boton para ejecutar función ingresarUsuario()
const btnIngresar = document.getElementById('ingresar');
btnIngresar.addEventListener('click', ()=> {
    ingresarUsuario();
})

// Función para verificar credenciales de usuario
function ingresarUsuario(){
    // se guardan datos introducidos a los inputs en variables
    let nombreUser = usuario.value;
    let contraUser = contra.value;

    // Se inserta un mensaje para avisar del proceso de validación de credenciales
    document.getElementById('mensaje').innerText='Validando credenciales . . .'
    // Promesa que vereifica credenciales
    const promesa = new Promise((resolve, reject) => {
        setTimeout(()=>{
            
            // Validar si hay usuarios registrados;
            if(validacion.length === 0){
                reject('No hay usuarios registrados');
                return;
            }
            // Validación de credenciales según los usuarios registrados
            const usuarioEncontrado = validacion.find(dato => nombreUser==dato.user && contraUser == dato.password);
            // Se verifica si esta el usuario la ruta a tomar
            if(usuarioEncontrado){
                resolve();
            }else{
                reject('Credenciales Incorrectas')
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
            // window.location.href = 'tareas.html';
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