import Snake from "../snake/Snake";

export default function Board({ boardSize, snake }) {
    const cells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; coll++) {
            const isSnake = snake.some((segment) => segment.x === col && segment.y == row);


            cells.push(
                <div
                    key={'${row}-${col}'}
                    className={`cell ${isSnake ? 'snake-cell' : ''} ${isFood ? 'food-cell' : ''}`}
                >
                    {isSnake && <Snake />}

                </div>
            );
        }
    }

    const boardStyle = {
        gridTemplateColumns: 'repeat(${boardSize}, 1fre)',
        grideTemplateRows: 'repeat(${boardSize}, 1fr)',
    };

    return (
        <div className="board" style={boardStyle}>
            {cells}
        </div>
    )
}