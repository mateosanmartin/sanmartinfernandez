
/*
  IMPORTACIONES DEL BACKEND

  express:
  Framework para crear el servidor HTTP y definir rutas.

  fs:
  Módulo nativo de Node.js para trabajar con archivos.

  cors:
  Middleware que permite las peticiones entre orígenes
  diferentes, como Vue en localhost:5173 y Express
  en localhost:3000.

  dotenv/config:
  Carga las variables de entorno del archivo .env
  en process.env.

  mongoose:
  Librería para conectarnos a MongoDB y trabajar
  con sus colecciones mediante modelos.
*/
import express from "express";
import fs from "fs";
import cors from "cors"; //evita bloqueos entre servidores
import "dotenv/config";
import mongoose from "mongoose";

/*
  IMPORTACIÓN DE LOS ROUTERS

  Cada router agrupa las operaciones CRUD de
  una entidad de la aplicación.

  pacientesRutas:
  GET, POST, PUT y DELETE de pacientes.

  doctoresRutas:
  GET, POST, PUT y DELETE de doctores.

  citasRutas:
  GET, POST, PUT y DELETE de citas.

  IMPORTANTE:
  Importamos los routers, no directamente los
  modelos de MongoDB.
*/
import pacientesRutas from "./rutas/pacientes.rutas.js"; //importa el modelo de paciente
import doctoresRutas from "./rutas/doctores.rutas.js";
import citasRutas from "./rutas/citas.rutas.js";

/*
  CREAR LA APLICACIÓN EXPRESS

  express() devuelve un objeto aplicación.

  Ese objeto permite:
  - Registrar middlewares con app.use().
  - Definir rutas con app.get(), app.post(), etc.
  - Arrancar el servidor con app.listen().
*/

// Creamos la aplicación Express
const app = express();

/*
  MIDDLEWARE CORS

  app.use(cors()) permite que el frontend,
  alojado en un origen diferente, realice
  peticiones a este backend.

  Sin una configuración CORS adecuada,
  el navegador podría bloquear esas peticiones.
*/
app.use(cors());

/*
  MIDDLEWARE JSON

  express.json() interpreta los cuerpos de
  petición que contienen JSON.

  EJEMPLO:

  Si Vue envía:
  { "nomepac": "Ana" }

  Express permite acceder a esos datos
  mediante req.body.nomepac.

  Sin este middleware, req.body podría no
  contener el JSON interpretado.
*/
app.use(express.json()); //para que pueda leer json

/*
  REGISTRO DE ROUTERS

  app.use(prefijo, router) monta un router
  bajo una ruta determinada.

  EJEMPLO:

  app.use("/api/pacientes", pacientesRutas)

  Si dentro de pacientes.rutas.js tenemos:

  router.get("/")

  La ruta completa será:

  GET /api/pacientes

  Si tenemos:

  router.put("/:id")

  La ruta completa será:

  PUT /api/pacientes/:id

  Esto evita repetir el prefijo en cada ruta.
*/
app.use("/api/pacientes", pacientesRutas); //usa el modelo de paciente
app.use("/api/doctores", doctoresRutas);
app.use("/api/citas", citasRutas);

/*
  PUERTO DEL SERVIDOR

  process.env.PORT:
  Lee el puerto definido en el archivo .env.

  || 3000:
  Si no existe un valor válido en PORT,
  se utiliza 3000 como alternativa.

  El operador || devuelve el primer valor
  que sea truthy.
*/

//USA EL PUERTO definido en la variables de entorno y si no coge el 3000
const PORT = process.env.PORT || 3000;

/*
  CONEXIÓN CON MONGODB

  process.env.MONGO_URI obtiene la cadena
  de conexión definida en .env.

  Así evitamos escribir la configuración
  de conexión directamente en este archivo.
*/

//URL conexion con mongodb

const MONGO_URI = process.env.MONGO_URI;

/*
  RUTA GET /api/municipios

  OBJETIVO:
  Devolver al frontend los datos del archivo
  municipios.json.

  PARÁMETROS:
  req: petición recibida.
  res: respuesta que enviamos.

  PASO A PASO:

  1. fs.readFileSync() lee un archivo del disco.

  2. "./backend/data/municipios.json" es la ruta
     del archivo que queremos leer.

  3. "utf8" indica que queremos obtener texto.

  4. JSON.parse() convierte ese texto JSON
     en un objeto o array de JavaScript.

  5. res.json() envía los datos al frontend
     en formato JSON.

  IMPORTANTE:
  readFileSync() es una operación síncrona:
  bloquea la ejecución mientras lee el archivo.
*/

// Ruta de la API para obtener provincias y municipios
app.get("/api/municipios", (req, res) => {
  // Leemos el fichero JSON
  const datos = fs.readFileSync("./backend/data/municipios.json", "utf8");

  // Convertimos el texto JSON en un objeto JavaScript
  const datosJson = JSON.parse(datos);

  // Enviamos los datos como respuesta al cliente
  res.json(datosJson);
});

/*
  RUTA GET /api/especialidades

  OBJETIVO:
  Devolver la lista de especialidades médicas.

  FUNCIONAMIENTO:

  1. Leemos especialidades.json con fs.readFileSync().
  2. Convertimos su contenido con JSON.parse().
  3. Enviamos el resultado mediante res.json().

  Es una ruta que devuelve datos estáticos
  almacenados en un archivo JSON.
*/

// Ruta de la API para obtener especialidades
app.get("/api/especialidades", (req, res) => {
  // Leemos el fichero JSON
  const datos = fs.readFileSync("./backend/data/especialidades.json", "utf8");

  // Convertimos el texto JSON en un objeto JavaScript
  const datosJson = JSON.parse(datos);

  // Enviamos los datos como respuesta al cliente
  res.json(datosJson);
});


/*
  FUNCIÓN: iniciaServer()

  OBJETIVO:
  Conectarse a MongoDB y, después,
  poner en marcha el servidor Express.

  async:
  Permite utilizar await dentro de la función.

  try:
  Intenta realizar las operaciones.

  await mongoose.connect():
  Espera a que se establezca la conexión
  con MongoDB antes de continuar.

  dbName: "bbdd":
  Selecciona explícitamente la base de datos
  llamada bbdd.

  app.listen(PORT, callback):
  Inicia el servidor HTTP en el puerto indicado.

  callback:
  Función que se ejecuta cuando el servidor
  comienza a escuchar peticiones.

  catch:
  Captura un error de conexión o de arranque.

  IMPORTANTE:
  Si falla mongoose.connect(), no se ejecuta
  app.listen(), porque el flujo salta al catch.
*/

// Ponemos el servidor a escuchar en el puerto 3000

async function iniciaServer() {
  try {
    //conectamos con mongodb
    await mongoose.connect(MONGO_URI, {
      dbName: "bbdd",
    });
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("error de conexion", error);
  }
}

/*
  ARRANQUE DEL BACKEND

  Esta llamada ejecuta iniciaServer().

  Si la conexión con MongoDB funciona,
  se inicia Express y queda preparado
  para recibir peticiones HTTP.
*/
iniciaServer();
