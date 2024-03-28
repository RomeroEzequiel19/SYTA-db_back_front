const http = require("http");
const mysql = require("mysql2");

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "prueba",
};

// Crear una conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Crear un servidor HTTP que escuche en el puerto 4444
const server = http.createServer((req, res) => {
  // Permitir solicitudes de cualquier origen (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Verificar si la solicitud es para la ruta /TraerDatos
  if (req.url === "/TraerDatos" && req.method === "GET") {
    // Conectarse a la base de datos
    connection.connect((err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Error al conectar a la base de datos" })
        );
        return;
      }

      // Realizar la consulta a la base de datos
      connection.query("SELECT nombre, edad FROM alumnos", (err, results) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Error al consultar la base de datos" })
          );
          return;
        }

        // Enviar los resultados como respuesta
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results));
      });

      // Cerrar la conexión a la base de datos
      //
    });
  } else {
    // Si la ruta no es válida, devolver un error 404
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

// Iniciar el servidor en el puerto 4444
server.listen(3000, () => {
  console.log("Servidor Node.js en ejecución en http://192.168.50.10:4444");
});
