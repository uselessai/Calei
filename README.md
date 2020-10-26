# ¿Qué es un caleidoscopio?

Un caleidoscopio es un instrumento que visualmente, gracias a unos espejos es capaz de hacer que se repitan la misma imagen de manera simétrica generando un patrones únicos.  [Wiki](https://es.wikipedia.org/wiki/Caleidoscopio) 

![img](http://codigoycreatividad.com/img/img1.png)

 En este caso se va a partir la imagen en 4 partes y de ahí repetiremos el primero a través de un shader, se podrá multiplicar el patrón. Estos son algunos de los efectos que se conseguirán con el proyecto

-![img](http://codigoycreatividad.com/img/img2.png)
![img](http://codigoycreatividad.com/img/img3.png)
![img](http://codigoycreatividad.com/img/img4.png)

# Composición

No se explicarán conceptos básicos de los que está compuesto el proyecto.

1 – UI Picker, podrás seleccionar el número de repeticiones. https://sparkar.facebook.com/ar-studio/learn/tutorials/native-ui-picker/

2 – UI Slider, podrás modificar el zoom de la imagen. https://sparkar.facebook.com/ar-studio/learn/tutorials/native-ui-slider/

3 – Scripting  https://sparkar.facebook.com/ar-studio/learn/scripting/scripting-basics/

4 – Promise  Youtube - https://www.youtube.com/watch?v=AQv9GR16xMw&t=634s&ab_channel=SohailMehra

# Patch editor

Este proyecto está casi enteramente realizado mediante scripting, sólo una pequeña parte, relativa al UI Picker y Slider se realiza mediante patches. Para esto el script tiene 2 variables que se necesitan uno será la variable signal escalar Zoom, que se controla a través del UI Slider, como su nombre indica es para controlar el Zoom, y otra variable signal escalar será “Repeticiones” que se controla a través del UI Picker y sirve para seleccionar el número de repeticiones del que va a constar.

# Script.js

Lo primero que vemos es la declaración y obtención de las coordenadas de las textura en los atributos vertex, esto lo que hará es modificar la imagen punto a punto a través de las coordenadas. Sohail Mehra tiene un tutorial explicando la programación de shaders a través del script en Spark AR. https://www.youtube.com/watch?v=ZUTxeQcaZ-I&ab_channel=SohailMehra

Lo primero que tenemos que hacer es generar la proporción para que no genere unos resultados extraños. 

    const proporcion =  Reactive.ge(repeticionesPatch, 5.0).ifThenElse(Reactive.div(canvas.width,canvas.height), 1.0);

Primero vamos modificando el eje Y, para esto generamos la duplicidad

    var  UVy = Reactive.mul(uv.y, Reactive.mul( repeticionesPatch,proporcion));


Con esto empezamos a seleccionar la parte que queremos clonar con base a la proporción dada.

    UVy = Reactive.sin(UVy);

Le aplicamos el seno para generar esa repetición en el eje Y

    UVy = Reactive.div(UVy, zoom);

Y le añadimos el zoom

Lo mismo sucede con el eje X


Por último añadiendo el coseno a la imagen generada con el eje Y se conseguirá que se volteé la imagen en verticalmente y en el X horizontalmente, generando el efecto de duplicado.

    UVy = Reactive.cos(UVy);
    UVx = Reactive.cos(UVx);




