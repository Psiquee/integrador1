const fs = require("fs");
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Función para guardar frutas en el archivo de base de datos
function guardarFrutas(frutas) {
  const datos = JSON.stringify(frutas); // Convertir el arreglo de frutas a formato JSON
  fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos); // Escribir los datos en el archivo definido en la variable de entorno DATABASE_PATH
}

// Función para leer frutas desde el archivo de base de datos
function leerFrutas() {
  const frutasString = fs.readFileSync(__dirname + process.env.DATABASE_PATH, "utf8"); // Leer los datos del archivo definido en la variable de entorno DATABASE_PATH como una cadena de texto
  const frutas = JSON.parse(frutasString); // Convertir la cadena de texto JSON a un arreglo de frutas
  return frutas; // Devolver el arreglo de frutas
}


// Función para obtener una fruta por su id
function obtenerFrutaPorId(id, frutas) {
  const idNumero = parseInt(id); // Convertir el id a número
  return frutas.find(fruta => fruta.id === idNumero); // Realizar la comparación con el id convertido
}



// Función para eliminar una fruta por su id
function eliminarFruta(id, frutas) {
  const idNumero = parseInt(id); // Convertir el id a número
  const index = frutas.findIndex(fruta => fruta.id === idNumero);
  if (index !== -1) {
    frutas.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

// Función para actualizar informacion fruta
function actualizarFruta(id, nuevaData, frutas) {
  const frutaEncontrada = frutas.find(fruta => fruta.id === id);
  if (frutaEncontrada) {
    frutaEncontrada.nombre = nuevaData.nombre;
    frutaEncontrada.imagen = nuevaData.imagen;
    frutaEncontrada.importe = nuevaData.importe;
    frutaEncontrada.stock = nuevaData.stock;
    return true;
  } else {
    return false;
  }
}

// Exportar las funciones para ser utilizadas por otros módulos
module.exports = {
  leerFrutas,
  guardarFrutas,
  obtenerFrutaPorId,
  actualizarFruta,
  eliminarFruta

};
