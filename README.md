# 🐍 Snake Game - Laboratorio React

¡Bienvenido al clásico juego de la Serpiente (Snake), desarrollado enteramente con **React** y **Vite**! Esta aplicación fue construida como parte de un laboratorio universitario para poner en práctica la construcción de interfaces usando componentes, props y manejo de estado en React (`useState`, `useEffect`).

Cuenta con una estética suave de tonos **pastel**, animaciones sutiles y un sistema de progresión de dificultad.

## 🚀 Descripción Breve

El objetivo de este proyecto es implementar el clásico juego Snake. La serpiente se mueve por un tablero en forma de grilla, come alimento para crecer y aumentar la puntuación, y pierde automáticamente si choca contra los límites del tablero o contra su propio cuerpo. Además, la velocidad de movimiento (dificultad) del juego aumenta progresivamente a medida que acumulas puntos.

## 🛠️ Instrucciones para instalar y correr el proyecto

Para ejecutar este proyecto en tu entorno local, asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, sigue estos pasos:

1. **Clona o descarga este repositorio** y colócate dentro de la carpeta del proyecto.

   ```bash
   git clone <url-del-repositorio>
   cd snake-game
   ```

2. Instala las dependencias necesarias ejecutando:

   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Vite ejecutando:
   ```bash
   npm run dev
   ```
4. Abre el enlace local proporcionado por la terminal en tu navegador web (usualmente `http://localhost:5173`).

## 🎮 Instrucciones para jugar

1. Al abrir la aplicación en el navegador, verás una pantalla de bienvenida. Haz clic en el botón **Jugar** para comenzar la partida.
2. Utiliza las **flechas direccionales de tu teclado** (Arriba ⬆️, Abajo ⬇️, Izquierda ⬅️, Derecha ➡️) para controlar la dirección de la serpiente azul pastel.
3. El objetivo principal es guiar a la serpiente para que coma el **alimento (el círculo rosa)** que aparece de manera aleatoria en el tablero.
4. Por cada comida que consumas, ganarás **10 puntos**, la serpiente crecerá un segmento, y la velocidad del juego aumentará ligeramente, haciéndolo más desafiante.
5. El juego termina (¡Game Over!) si la cabeza de la serpiente choca contra las paredes del tablero o contra cualquier parte de su propio cuerpo.
6. Si pierdes, puedes hacer clic en el botón **Volver a Jugar** para reiniciar completamente la partida y la puntuación. ¡Intenta superar tu propio récord!
