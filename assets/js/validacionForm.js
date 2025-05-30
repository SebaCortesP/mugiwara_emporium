document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // evitar envío inmediato

    const errores = [];

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!nombre) errores.push("El campo Nombre es obligatorio.");
    if (!apellido) errores.push("El campo Apellido es obligatorio.");
    if (!fechaNacimiento) errores.push("El campo Fecha de Nacimiento es obligatorio.");
    if (!email) errores.push("El campo Email es obligatorio.");
    if (!password) errores.push("El campo Contraseña es obligatorio.");
    if (!confirmPassword) errores.push("El campo Confirmar Contraseña es obligatorio.");

    if (email && !validarEmail(email)) {
      errores.push("El email no tiene un formato válido.");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errores.push("Las contraseñas no coinciden.");
    }

    if (errores.length > 0) {
      alert("Por favor corrige los siguientes errores:\n\n" + errores.join("\n"));
    } else {
      alert("Formulario enviado correctamente!");
      form.submit();
    }
  });

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
