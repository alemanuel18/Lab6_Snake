import { useState, useEffect, useCallback } from 'react';
import Board from './components/board/Board';
import Score from './components/score/Score';
import './App.css';

const BOARD_SIZE = 20;
const INITIAL_SPEED = 150;
const MIN_SPEED = 50;

export default function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateNewFood = useCallback((currentSnake) => {
    let newFood;
    while (!newFood || currentSnake.some(s => s.x === newFood.x && s.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    }
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setSpeed(INITIAL_SPEED);
    generateNewFood([{ x: 10, y: 10 }, { x: 10, y: 11 }]);
  };

  const startGame = () => {
    resetGame();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      setDirection((prevDir) => {
        switch (e.key) {
          case 'ArrowUp':
            return prevDir.y !== 1 ? { x: 0, y: -1 } : prevDir;
          case 'ArrowDown':
            return prevDir.y !== -1 ? { x: 0, y: 1 } : prevDir;
          case 'ArrowLeft':
            return prevDir.x !== 1 ? { x: -1, y: 0 } : prevDir;
          case 'ArrowRight':
            return prevDir.x !== -1 ? { x: 1, y: 0 } : prevDir;
          default:
            return prevDir;
        }
      });
    };

    if (gameStarted && !gameOver) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        if (
          newHead.x < 0 || newHead.x >= BOARD_SIZE ||
          newHead.y < 0 || newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        for (let segment of prevSnake) {
          if (newHead.x === segment.x && newHead.y === segment.y) {
            setGameOver(true);
            return prevSnake;
          }
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 10);
          setSpeed((prev) => Math.max(MIN_SPEED, prev - 2));
          setTimeout(() => generateNewFood(newSnake), 0);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, gameStarted, speed, generateNewFood]);

  return (
    <div className="game-container">
      <div className="header">
        <h1>Snake</h1>
        <Score points={score} />
      </div>

      <div className="board-container">
        {!gameStarted && !gameOver && (
          <div className="overlay">
            <h2>Bienvenido a Snake</h2>
            <p>Usa las flechas del teclado para moverte.</p>
            <button className="btn" onClick={startGame}>Jugar</button>
          </div>
        )}

        {gameOver && (
          <div className="overlay game-over-overlay">
            <h2>¡Game Over!</h2>
            <p>Puntaje Final: {score}</p>
            <button className="btn" onClick={resetGame}>Volver a Jugar</button>
          </div>
        )}

        <Board boardSize={BOARD_SIZE} snake={snake} food={food} />
      </div>
    </div>
  );
}