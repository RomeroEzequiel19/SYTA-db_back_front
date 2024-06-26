﻿# Replicar en grupo 3 servidores - Base de datos - Backend - Aplicacion

### Con 3 compañeros o mas replicar 3 servidores para ello les compartimos el siguiente zip. Tenemos un archivo .zip que contiene el sql de la base de datos, otro archivo con el script del servicio de nodejs y otro llamado index.html que seria la aplicación.

Para realizar este trabajo primero nos dividimos las partes:

- Acuña Melanie: Base de Datos
- Cubilla Giuliana: Backend
- Romero Ezequiel: Frontend

Primero, entramos cada uno desde nuestras computadoras al cmd y realizamos el comando "ipconfig".
Luego, nos pingueamos cada uno a las computadoras de la otra persona utilizanso el comando "ping" seguido de la dirección ip de la otra persona. Nos dimos cuenta que la computadora de Romero Ezequiel no se podía pinguear a ninguna computadora pero los demás a él, si. Entonces, decidimos que él sería el que se encargaría del Frontend.

### Base De Datos:

- Para realizar la base de datos, utilizamos una que se llamaba "database", a la cual le creamos una tabla llamada "users" la cual contenía los campos de id, nombre, user y password. Y luego le asignamos tres registros.

Como ocurrían problemas cuando el backend se quería conectar a la base datos, colocamos la siguiente consulta sql en el phpmyadmin: GRANT ALL PRIVILEGES ON \* TO 'root'@'%'

### Servidor Backend:

- Para el servidor, primero iniciamos la plataforma node "npm init", instalamos la dependencia "mysql2" para la conexión a la base de datos "npm install mysql2".

Despues realizamos de la conexión a la base de datos MySQL donde en el "host" colocamos la direccion IP de la computadora que tenía la Bade de datos

```
const dbConfig = {
  host: "192.168.43.230",
  port: "3306",
  user: "root",
  password: "",
  database: "database",
};
```

- 1 - Creamos la conexión a la base de datos: const connection = mysql.createConnection(dbConfig);
- 2 - Creamos un servidor HTTP que escuche en el puerto 4444
- 3 - Permitimos las solicitues de cualquier origen (CORS)
- 4 - Verificamos si la solicitud es para la ruta /TraerDatos. Si es para esa ruta conectamos a la base de datos:

```
connection.connect((err) => {
    if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Error al conectar a la base de datos" })
        );
        return;
    }})
```

5 - Luego, realizamos la respectiva consulta a la base de datos para poder traer los datos de la tabla "users"

```
connection.query(
        "SELECT id, nombre, usuario, password FROM users",
        (err, results) => {
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
        }
      );
```

6 - Por último, iniciamos el servidor en el puerto que establecimos, el cual fue el 4444:

```
server.listen(4444, "0.0.0.0", () => {
  console.log("Servidor Node.js en ejecución en http://192.168.50.10:4444");
});
```

### Frontend

Para el frontend, hicimos una pantalla con un título, un botón Para consultar a los usuarios, Un botón par mandar un saludo el cual tiene la función 'onclick= "saludar()"' y un contenedor donde se mostrarían los usuarios.

Despues, realizamos un script donde realizamos lo siguiente:

1 - Obtenemos el botón para consultar a los usuarios mediante su 'id="consulta"' y lo mismo con el contenedor, los almacenamos en diferentes constantes.
2 - Creamos la función "saludar()" con un mensaje de aleta, el cual se ejecuta al hacer click en el botón para saludar.
3 - Despues, colocmos un evento que al hacer click en el botón de consulta, se ejecuta la función para mostrar a los usuarios:

Realizamos el método fetch para traer los datos y los pasamos en formato json(). En el fetch() colocamos la dirección IP de la computadora que cuenta con el backend seguido del puerto que en este caso es 4444.

```
const response = await fetch("http://192.168.43.15:4444/TraerDatos");
const data = await response.json();
```

Luego, realizamos un forEach para recorrer la información extraída y mostrarlo por pantalla en caso de que no haya errores, o sino muestra un mensaje de error.

```
if (!data.error) {
    contenedor.innerHTML = "";
    data.forEach((user) => {
        contenedor.innerHTML += `<p>Nombre: ${user.nombre}, Usuario: ${user.usuario}</p>`;
});
} else {
    contenedor.innerHTML = `<p>Error: ${data.error}</p>`;
}
```
