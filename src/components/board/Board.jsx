import Snake from "../snake/Snake";
import Food from "../food/Food";
import './Board.css';

export default function Board({ boardSize, snake, food }) {
    const cells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const snakeSegmentIndex = snake.findIndex((segment) => segment.x === col && segment.y === row);
            const isSnake = snakeSegmentIndex !== -1;
            const isHead = snakeSegmentIndex === 0;
            const isFood = food.x === col && food.y === row;

            let cellClass = 'cell';
            if (isSnake) {
                cellClass += isHead ? ' snake-cell snake-head' : ' snake-cell';
            }
            if (isFood) {
                cellClass += ' food-cell';
            }

            cells.push(
                <div
                    key={`${row}-${col}`}
                    className={cellClass}
                >
                    {isSnake && <Snake />}
                    {isFood && <Food />}
                </div>
            );
        }
    }

    const boardStyle = {
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
    };

    return (
        <div className="board" style={boardStyle}>
            {cells}
        </div>
    )
}