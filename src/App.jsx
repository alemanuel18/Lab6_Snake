import { useState, useEffect } from 'react';
import Board from './Board';
import Score from './Score';

// Definimos constantes para el tamaño del tablero y direcciones
const BOARD_SIZE = 20;
const INITIAL_SPEED = 200;

export default function Game() {
  // 1. ESTADOS DEL JUEGO
  // La serpiente es un array de objetos [{x, y}]. La cabeza es el índice 0.
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 }); // Moviéndose hacia arriba por defecto
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 2. ESCUCHAR EL TECLADO (Cambiar dirección)
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // 3. GAME LOOP (El movimiento automático)
  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        // Calcular la nueva posición de la cabeza sumando la dirección actual
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        // DETECCIÓN DE COLISIONES (Paredes)
        if (
          newHead.x < 0 || newHead.x >= BOARD_SIZE ||
          newHead.y < 0 || newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // DETECCIÓN DE COLISIONES (Consigo misma)
        for (let segment of prevSnake) {
          if (newHead.x === segment.x && newHead.y === segment.y) {
            setGameOver(true);
            return prevSnake;
          }
        }

        // Crear el nuevo cuerpo de la serpiente
        const newSnake = [newHead, ...prevSnake];

        // DETECCIÓN DE COMIDA
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 10);
          generateNewFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  const generateNewFood = (currentSnake) => {
    // Lógica para generar {x, y} aleatorios que no colisionen con currentSnake
    let newFood;
    while (!newFood || currentSnake.some(s => s.x === newFood.x && s.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    }
    setFood(newFood);
  };

  return (
    <div className="game-container">
      <Score points={score} />
      {gameOver ? (
        <div className="game-over">¡Game Over!</div>
      ) : (
        <Board boardSize={BOARD_SIZE} snake={snake} food={food} />
      )}
    </div>
  );
}