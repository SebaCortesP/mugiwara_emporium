document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registroForm');

  

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evitar envío inmediato

    const errores = [];

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const fechaNacimiento = fechaNacimientoInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Primero limpiamos todas las clases de error
    [nombreInput, apellidoInput, fechaNacimientoInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
      input.classList.remove('is-invalid');
    });

    // Validaciones y marcado de errores
    if (!nombre) {
      errores.push("El campo Nombre es obligatorio.");
      nombreInput.classList.add('is-invalid');
    }
    if (!apellido) {
      errores.push("El campo Apellido es obligatorio.");
      apellidoInput.classList.add('is-invalid');
    }
    if (!fechaNacimiento) {
      errores.push("El campo Fecha de Nacimiento es obligatorio.");
      fechaNacimientoInput.classList.add('is-invalid');
    } else {
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const hoy = new Date();
      const edadMinima = new Date();
      edadMinima.setFullYear(hoy.getFullYear() - 13);

      if (fechaNacimientoDate > edadMinima) {
        errores.push("Debes tener al menos 13 años para registrarte.");
        fechaNacimientoInput.classList.add('is-invalid');
      }
    }
    if (!email) {
      errores.push("El campo Email es obligatorio.");
      emailInput.classList.add('is-invalid');
    } else if (!validarEmail(email)) {
      errores.push("El email no tiene un formato válido.");
      emailInput.classList.add('is-invalid');
    }

    if (!password) {
      errores.push("El campo Contraseña es obligatorio.");
      passwordInput.classList.add('is-invalid');
    } else if (!validarPassword(password)) {
      errores.push("La contraseña debe tener entre 6 y 18 caracteres, incluir al menos una mayúscula y un número.");
      passwordInput.classList.add('is-invalid');
    }

    if (!confirmPassword) {
      errores.push("El campo Confirmar Contraseña es obligatorio.");
      confirmPasswordInput.classList.add('is-invalid');
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errores.push("Las contraseñas no coinciden.");
      passwordInput.classList.add('is-invalid');
      confirmPasswordInput.classList.add('is-invalid');
    }

    if (errores.length > 0) {
      mostrarAlerta(errores, 'danger');
    } else {
      mostrarAlerta("¡Formulario enviado correctamente!", 'success');
      setTimeout(() => {
        form.submit();
      }, 3000);
    }
  });

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function validarPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    return regex.test(password);
  }

  function mostrarAlerta(mensajes, tipo = 'danger') {
    const alertDiv = document.getElementById('formAlert');
    
    // Si mensajes es un array, conviértelo a lista HTML
    let contenido = '';
    if (Array.isArray(mensajes)) {
      contenido = '<ul class="mb-0">';
      mensajes.forEach(msg => {
        contenido += `<li>${msg}</li>`;
      });
      contenido += '</ul>';
    } else {
      contenido = mensajes;
    }

    alertDiv.className = `alert alert-${tipo}`;
    alertDiv.innerHTML = contenido;
    alertDiv.classList.remove('d-none');

    // Ocultar automáticamente después de 5 segundos
    setTimeout(() => {
      alertDiv.classList.add('d-none');
    }, 5000);
  }


  const btnLimpiar = document.getElementById('btnLimpiar');

btnLimpiar.addEventListener('click', function () {
  form.reset();

  // Limpiar clases de error visual
  const campos = form.querySelectorAll('.is-invalid, .is-valid');
  campos.forEach(campo => campo.classList.remove('is-invalid', 'is-valid'));

  // Limpiar mensajes de alerta
  const alertContainer = document.getElementById('alertContainer');
  if (alertContainer) {
    alertContainer.innerHTML = '';
  }
});
});
