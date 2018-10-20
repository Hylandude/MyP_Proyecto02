# Proyecto 02 Modelado y Programacion
> Cesar Augusto Farrera Ortega - 311617670

Proyecto 02 Un editor de etiquetas Id3V4 para archivos .mp3 que guarda los resultados en una base de datos sqlite

## Como ejecutar el programa

Antes que nada es necesario clonar el repositorio

```shell
git clone https://github.com/Hylandude/MyP_Proyecto02
```

Es necesario tener instalado Node.js y npm para informacion en como instalar
visita https://nodejs.org/es/

Con el repositorio clonado y Node/npm instalados dentro de la carpeta clonada usa:

```shell
npm install
```

Esto instalara las dependencias requeridas. Una vez instaladas puedes usar el siguiente
comando para correr el programa:

```shell
npm start
```

Si el programa no corre usa los siguientes comandos para instalar las dependencias a mano
y compilar electron

```shell
npm install --save-dev electron-rebuild
npm install --save electron
npm install --save sqlite3
npm run rebuild
```

Para correr las pruebas unitarias usa:
```shell
npm test
```

## Bugs/Errores conocidos

La siguiente es una lista de errores conocidos con el programa
* No es posible añadir canciones con comillas simples o caracteres especiales

## Guia de uso

Por omision la aplicacion carga todas las canciones que se encuentren en la base de datos. Si la base de datos se encuentra vacia o no existe se pueden minar los datos seleccionando la opcion "Minar" en el menu (alternativamente se puede usar CTRL+M). 

Para realizar una busqueda basta escribir en el campo superior y presionar "enter"
Para volver a ver todos los resultados es necesario presionar entrer en la barra de busqueda
cuando esta se encuentre vacia.

Por omision si se escribe cualquier cadena de texto en el campo de busqueda se buscara este
valor en el album, artista y nombre de la cancion. Se regresan todas aquellas cadenas que usen la cadena dada en alguna parte de los campos previamente especificados.

Es posible acortar el campo de busqueda si se usa la siguiente sintaxis:
* #titulo TituloABuscar
* #album AlbumABuscar
* #genero GeneroABuscar
* #año AñoABuscar
* #artista ArtistaABuscar

Esto buscara solo en el campo especificado. Ademas se pueden combinar mediante el uso del caracter "|" para producir busquedas especiales que buscan la cadena dada en cada campo especificado, esto funciona como un operador AND por ejemplo:
* #album Un Album | #año 2015
* #artista cierto artista | #album un album | #titulo esa canciones
Es importante dejar un espacio despues de cada identificador.

Tambien es posible realizar busquedas literales, esto buscara en la base de datos de manera exacta en ves de usar subcadenas por ejemplo:
* #album subCadena | #artist "Busqueda literal"

Para editar los datos de una rola se puede hacer doble click sobre la misma y se mostrara la ventana para editar la informacion.

## Licensing

This project is licensed under the MIT License - see the LICENSE.md file for details
