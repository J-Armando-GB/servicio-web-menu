const express = require('express'); // Importamos Express para crear el servidor web
const cors = require('cors'); // Importamos CORS para permitir peticiones desde otros dominios

const app = express(); // Inicializamos la aplicación de Express
const PORT = 3000; // Definimos el puerto en el que se ejecutará el servidor

// Configuramos middlewares
app.use(cors()); // Habilitamos CORS para permitir peticiones desde cualquier origen
app.use(express.json()); // Middleware para procesar JSON en las peticiones HTTP

// Base de datos en memoria para almacenar los menús de la semana
const menuSemanal = {
    lunes: ["Spaghetti a la boloñesa", "Pollo a la plancha con ensalada", "Sopa de lentejas"],
    martes: ["Tacos al pastor", "Ensalada César", "Salmón a la parrilla"],
    miércoles: ["Chiles rellenos", "Pechuga en salsa de champiñones", "Arroz frito con vegetales"],
    jueves: ["Pizza Margarita", "Sushi variado", "Burritos de carne"],
    viernes: ["Hamburguesa con papas", "Pasta Alfredo", "Enchiladas verdes"],
    sábado: ["Barbacoa con consomé", "Pollo rostizado", "Tacos de birria"],
    domingo: ["Asado de res", "Pozole rojo", "Paella de mariscos"]
};

// Ruta para obtener un menú aleatorio de un día específico
app.get('/menu/:dia', (req, res) => {
    const diaSolicitado = req.params.dia.toLowerCase(); // Convertimos el día a minúsculas para evitar errores de capitalización
    
    // Verificamos si el día solicitado es válido
    if (!menuSemanal[diaSolicitado]) {
        return res.status(404).json({ error: "Día no válido." });
    }
    
    const opciones = menuSemanal[diaSolicitado]; // Obtenemos la lista de comidas para ese día
    const comidaAleatoria = opciones[Math.floor(Math.random() * opciones.length)]; // Seleccionamos una comida aleatoria
    
    res.json({ dia: diaSolicitado, menu: comidaAleatoria }); // Respondemos con la comida seleccionada
});

// Ruta para obtener un menú aleatorio para toda la semana
app.get('/menu-semana', (req, res) => {
    let semana = {}; // Objeto para almacenar los menús de cada día
    
    for (let dia in menuSemanal) {
        semana[dia] = menuSemanal[dia][Math.floor(Math.random() * menuSemanal[dia].length)];
    }
    
    res.json(semana); // Respondemos con el menú aleatorio de la semana
});

// Ruta para agregar una nueva comida a un día específico utilizando PUT
app.put('/menu/:dia', (req, res) => {
    const diaSolicitado = req.params.dia.toLowerCase(); // Convertimos el día a minúsculas
    const nuevaComida = req.body.comida; // Extraemos la nueva comida del cuerpo de la petición

    // Verificamos si el día es válido
    if (!menuSemanal[diaSolicitado]) {
        return res.status(404).json({ error: "Día no válido." });
    }

    // Verificamos que el usuario haya enviado un nombre de comida válido
    if (!nuevaComida || typeof nuevaComida !== 'string') {
        return res.status(400).json({ error: "Debe proporcionar una comida válida en formato de texto." });
    }

    // Agregamos la nueva comida al menú del día seleccionado
    menuSemanal[diaSolicitado].push(nuevaComida);

    res.json({ mensaje: "Comida agregada correctamente", menuActualizado: menuSemanal[diaSolicitado] }); // Respondemos con la lista actualizada
});

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
