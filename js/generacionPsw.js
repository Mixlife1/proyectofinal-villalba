const edadMinima = 18;
const longitudPassword = 4;

const formulario = document.createElement('form');
formulario.id = 'formulario';
document.body.appendChild(formulario);

const diaNacimiento = document.createElement('input');
diaNacimiento.type = 'number';
diaNacimiento.id = 'diaNacimiento';
diaNacimiento.className = 'campoInput'; 
diaNacimiento.placeholder = 'Día';
diaNacimiento.min = 1;
diaNacimiento.max = 31;
diaNacimiento.required = true;

const mesNacimiento = document.createElement('input');
mesNacimiento.type = 'number';
mesNacimiento.id = 'mesNacimiento';
mesNacimiento.className = 'campoInput'; 
mesNacimiento.placeholder = 'Mes';
mesNacimiento.min = 1;
mesNacimiento.max = 12;
mesNacimiento.required = true;

const anioNacimiento = document.createElement('input');
anioNacimiento.type = 'number';
anioNacimiento.id = 'anioNacimiento';
anioNacimiento.className = 'campoInput'; 
anioNacimiento.placeholder = 'Año';
anioNacimiento.min = 1900;
anioNacimiento.max = new Date().getFullYear();
anioNacimiento.required = true;

const enviar = document.createElement('button');
enviar.type = 'submit';
enviar.className = 'campoInput';
enviar.innerHTML = 'Ingrese fecha Nacim y genere PSW';

formulario.append(diaNacimiento, mesNacimiento, anioNacimiento, enviar);

const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', function (event) {
	event.preventDefault(); 

	const ahora = luxon.DateTime.local().toFormat('dd-MM-yyyy HH:mm:ss');

	const dia = diaNacimiento.value;
	const mes = mesNacimiento.value;
	const anio = anioNacimiento.value;

	const anioActual = new Date().getFullYear();

	const edadUsuario = anioActual - anio;

	if (edadUsuario >= edadMinima) {
		let password = '';
		for (let i = 0; i < longitudPassword; i++) {
			password += Math.floor(Math.random() * 10);
		}
		resultado.innerHTML = `Su contraseña aleatoria es: <span class="password">${password}</span> Su fecha de nacimiento fue el ${dia}-${mes}-${anio} y usted tiene ${edadUsuario} años. <br><br><span class="ultimo-acceso"> Ultimo acceso el ${ahora}</span>`;
		sessionStorage.setItem('password', password);

		enviar.style.display = 'none';
		diaNacimiento.style.display = 'none';
		mesNacimiento.style.display = 'none';
		anioNacimiento.style.display = 'none';

		setTimeout(() => {
			enviar.style.display = 'block';
		}, 300000);

		setTimeout(() => {
			diaNacimiento.style.display = 'block';
		}, 300000);

		setTimeout(() => {
			mesNacimiento.style.display = 'block';
		}, 300000);

		setTimeout(() => {
			anioNacimiento.style.display = 'block';
		}, 300000);

	} else {
		resultado.innerHTML = `Debe ser mayor de 18 años para generar una contraseña y usted tiene ${edadUsuario} años. <br><br><span class="ultimo-acceso"> Ultimo acceso el ${ahora}</span> `;
	}
});
