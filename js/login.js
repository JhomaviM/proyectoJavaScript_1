let validacion = {
    user: 'jonatan',
    password: '12345'
}

const btnIngresar = document.getElementById('ingresar');
btnIngresar.addEventListener('click', ()=> {
    ingresarUsuario();
})

function ingresarUsuario(){
    const usuario = document.getElementById('usuario').value;
    const contra = document.getElementById('password').value;

    document.getElementById('mensaje').innerText='Ingresando a la aplicación . . .'

    const promesa = new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(usuario==validacion.user && contra==validacion.password){
                resolve(1);
            }else{
                reject('Credenciales incorrectas');
            }
        }, 2000)
    })
    promesa
        .then(resultado => {
            window.location.href = 'tareas.html';
            document.getElementById('usuario').value='';
            document.getElementById('password').value='';
            document.getElementById('mensaje').innerText='';
        })
        .catch(error => {
            alert(error);
            document.getElementById('usuario').value='';
            document.getElementById('password').value='';
            document.getElementById('mensaje').innerText='';
        })
        .finally(() => {
            console.log('Termino el calculo');
        });
}