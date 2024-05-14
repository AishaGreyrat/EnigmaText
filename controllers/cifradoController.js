const Texto = require('../models/textoModel');

async function cifrarTexto(req, res) {
    const usuarioId = req.user ? req.user.id : null; // Obtén el ID del usuario si está autenticado
    const textoOriginal = req.body.textoOriginal;
    const tipoCifrado = req.body.tipoCifrado;
    let textoCifrado;

    try {
        // Obtener los métodos de cifrado disponibles desde el modelo
        const metodosCifrado = await Texto.obtenerMetodosCifrado();

        // Verificar si metodosCifrado está definido y tiene valores
        if (metodosCifrado && metodosCifrado.length > 0) {
            // Determina qué función de cifrado utilizar según el tipo seleccionado
            switch (tipoCifrado) {
                case '1':
                    textoCifrado = Texto.cifrarCesar(textoOriginal, 3); // Puedes ajustar el desplazamiento según tu preferencia
                    break;
                case '2':
                    textoCifrado = Texto.cifrarBase64(textoOriginal);
                    break;
                case '3':
                    textoCifrado = Texto.cifrarHexadecimal(textoOriginal);
                    break;
                case '4':
                    textoCifrado = Texto.cifrarBinario(textoOriginal);
                    break;
                default:
                    textoCifrado = 'Tipo de cifrado no válido';
            }
        } else {
            // Manejar el caso donde no se obtuvieron métodos de cifrado
            console.error('No se pudieron obtener los métodos de cifrado');
            res.status(500).send('Error interno del servidor');
            return;
        }

        /*----------------------------------------------------------------------------------------------*/ 

        let conversionesRealizadas = req.session.conversionesRealizadas || 0;

        if (!req.isAuthenticated()) {
            // Si el usuario no está autenticado, verificar el límite de conversiones
            if (conversionesRealizadas < 3) {
              conversionesRealizadas++;
              req.session.conversionesRealizadas = conversionesRealizadas;
            } else {
              // Si el usuario ha realizado tres conversiones y no está autenticado, redirigir al usuario al inicio de sesión
              return res.status(444).send('Ya has realizado 3 conversiones \nInicia sesion para tener conversiones ilimitadas');
            }
          }
        /*----------------------------------------------------------------------------------------------*/ 

        // Guardar el texto cifrado en la base de datos solo si el usuario está autenticado
        if (usuarioId) {
            Texto.guardarTextoCifrado(usuarioId, textoOriginal, textoCifrado, (error, resultados) => {
                if (error) {
                    // Manejar el error
                    return res.status(500).send('Error al guardar el texto cifrado');
                }
                // Redirigir a la página "texto-cifrado" con el texto cifrado en la query string

                

                

                res.redirect(`/texto-cifrado?texto=${encodeURIComponent(textoCifrado)}`);
            });
        } else {
            // Redirigir a la página "texto-cifrado" con el texto cifrado en la query string
            res.redirect(`/texto-cifrado?texto=${encodeURIComponent(textoCifrado)}`);
        }
    } catch (error) {
        console.error('Error al cifrar el texto:', error);
        res.status(500).send('Error interno del servidor');
    }
}


async function mostrarFormularioEnIndex(req, res, title, user) {
    try {
        // Obtener los métodos de cifrado disponibles desde el modelo
        const metodosCifrado = await Texto.obtenerMetodosCifrado();

        // Renderizar la vista del formulario y pasar los métodos de cifrado junto con el título y el usuario
        res.render('index', { 
            title: title,
            user: user,
            metodosCifrado: metodosCifrado
        });
    } catch (error) {
        // Manejar el error si ocurre
        console.error('Error al obtener métodos de cifrado:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function mostrarHistorial(req, res) {
    try {
        // Obtener el ID del usuario autenticado
        const usuarioId = req.user ? req.user.id : null;
        
        console.log("usuarioId ", usuarioId);
        // Verificar si el usuario está autenticado
        if (!usuarioId) {
            return res.status(401).send('Usuario no autenticado');
        }

        // Obtener el historial de textos cifrados del usuario
        const historial = await Texto.obtenerHistorialPorUsuario(usuarioId);
        console.log(historial);
        // Renderizar la vista del historial y pasar los datos necesarios
        res.render('historial', { historial: historial });
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        res.status(500).send('Error interno del servidor');
    }
}


  
  module.exports = {
    cifrarTexto,
    mostrarFormularioEnIndex,
    mostrarHistorial: mostrarHistorial
  };