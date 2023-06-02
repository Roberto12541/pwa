
    document.addEventListener("DOMContentLoaded", function(event) {
        // @ts-ignore
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Evita que se envíe el formulario por defecto

            // @ts-ignore
            var username = document.getElementById("username").value;
            // @ts-ignore
            var password = document.getElementById("password").value;

            if (username === "usuario" && password === "contraseña") {
                // Inicio de sesión exitoso
               window.location.href = "html/inicio.html";
            } else {
                // Credenciales incorrectas
                alert("Datos incorrectas");
            }
        });
    });

    // Obtener todos los elementos "section" dentro del elemento con ID "espacios"
    const sections = document.querySelectorAll('#espacios section');

    // Agregar un evento de clic a cada elemento "section"
    sections.forEach(section => {
      section.addEventListener('click', () => {
        // Obtener el ID del elemento clicado
        const id = section.id;
        
        // Guardar el ID en el almacenamiento local para usarlo posteriormente
        localStorage.setItem('seleccionado', id);
        
        // Redirigir a otro documento HTML
        window.location.href = 'prueba.html';
      });
    });
