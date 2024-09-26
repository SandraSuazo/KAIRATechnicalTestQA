# Prueba Técnica: Configuración de un Proyecto de Cypress

Este documento describe los pasos necesarios para arrancar un proyecto de pruebas automatizadas utilizando Cypress con npm.

## Requisitos Previos

Asegúrate de tener instalados los siguientes elementos en tu sistema:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- npm (generalmente se instala junto con Node.js)

## Pasos para Arrancar el Proyecto
1. ***Descargar el proyecto de la siguiente URL***
- https://github.com/SandraSuazo/KAIRATechnicalTestQA
2. Navega hacia la carpeta del proyecto
3. Ejecuta: ```npm install```
4. Ejecuta: ```npm run test```



***Los test que he incluido para la validación precisa del formulario basado en la URL son los siguientes:***

   - **Coherencia con la historia de usuario:** Verificar que el formulario cumple con los requerimientos de la historia de usuario. Es decir, comprobar que no se solicitan datos innecesarios y que los campos obligatorios tienen un propósito alineado con los objetivos del producto.
   
   - **Comprobación de los parámetros en la URL:** Verificar que los parámetros se añaden o modifican correctamente en la URL cuando sea necesario y que el formulario los utiliza correctamente (i18n, id del usuario, etc.).
   
   - **Validación de estilos y diseño:** Verificar que los estilos del formulario (colores, márgenes, tamaños de los campos, tipografía, etc.) coincidan con las especificaciones proporcionadas por el departamento de diseño.
   
   - **Validación de envío correcto:** Es decir, rellenar todos los campos del formulario de manera correcta y verificar que el formulario se envía sin errores, redirigiendo al usuario a la página de confirmación.
   
   - **Validación de los campos requeridos:** Verificar que los campos obligatorios están correctamente marcados y que no permiten el envío del formulario si están vacíos.
   
   - **Validación de formato de datos:** Es importante comprobar que los campos que requieren formatos específicos (como correos electrónicos, fechas, etc.) tienen validaciones adecuadas.
   
   - **Validación de persistencia de datos y navegación:** Si el usuario navega hacia atrás o recarga la página, los datos previamente ingresados en el formulario deben persistir. Esto garantiza que el usuario no pierda la información introducida accidentalmente.
   
   - **Validación de mensajes de error:** Asegurarse de que los mensajes de error sean claros, concisos y fácilmente comprensibles.
   
   - **Validación de seguridad:** El formulario debe ser seguro frente a ataques maliciosos. Por ejemplo, se deben realizar pruebas que verifiquen que los inputs de los usuarios evitan posibles inyecciones de código.  

   ***Durante la ejecución de los tests en el formulario proporcionado, he identificado algunos problemas:***
   
   - Los inputs de "Nombre" y "Apellido" son de tipo texto, lo que permite al usuario introducir caracteres como números y símbolos especiales; dichos campos deberían restringir la entrada exclusivamente a caracteres alfabéticos. Además, estos campos no tienen un límite máximo de caracteres. Desde el punto de vista de la usabilidad, sería recomendable añadir un segundo campo para el segundo apellido o modificar el label para que sea "Apellidos" en plural.
   
   - El campo de fecha de nacimiento carece de validación para el día, mes y año. Actualmente, es posible introducir fechas no válidas, como un día superior a 31, un mes mayor a 12 o un año en el futuro, lo cual no debería permitirse.
   
   - El campo de selección de idioma genera confusión. Aunque es posible modificar el idioma, al seleccionar una nueva opción no se actualiza automáticamente el formulario para reflejar el cambio.
   
   - En la tabla de datos, he identificado valores incorrectos en varias columnas. Por ejemplo, en la columna "País" aparece el valor "madrid", en la columna "Provincia" figura "españa", y en la columna "Titulación" se muestra un error del tipo "TypeError". Estos errores sugieren problemas en el mapeo de las columnas. Además, aunque cada columna puede ordenarse alfabéticamente o en orden inverso, el icono de orden no cambia para reflejar si el usuario ha modificado el orden, lo que puede llevar a confusión.
   
   - El formulario no marca ningún campo como requerido, lo que podría llevar a entradas en la base de datos sin información valiosa. Sería importante definir los campos esenciales y asegurarse de que el usuario no pueda enviar el formulario sin rellenar esos campos mínimos.
   
   - Los datos introducidos en el formulario no persisten en el caso de que el usuario navegue hacia atrás o recargue la página.