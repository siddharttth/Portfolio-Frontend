import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const gridSize = 20;
  const initialSnake = [{ x: 10, y: 10 }];
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleSwipe = (e) => {
      const touch = e.changedTouches[0];
      const swipeDir = getSwipeDirection(touch);
      if (swipeDir) setDirection(swipeDir);
    };
    window.addEventListener('touchstart', handleSwipe);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('touchstart', handleSwipe);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  const getSwipeDirection = (touch) => {
    // Swipe detection logic
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (head.x === food.x && head.y === food.y) {
      newSnake.unshift({ x: food.x, y: food.y });
      setFood({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      });
    } else {
      newSnake.pop();
    }

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || isColliding(newSnake, head)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);
    setSnake(newSnake);
  };

  const isColliding = (snake, head) => {
    return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  };

  const resetGame = () => {
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    setFood({ x: 5, y: 5 });
    setGameOver(false);
  };

  return (
    <div className="snake-game-container">
      <h2>Snake Game</h2>
      <div className="snake-grid">
        {[...Array(gridSize)].map((_, row) => (
          <div key={row} className="row">
            {[...Array(gridSize)].map((_, col) => (
              <div
                key={col}
                className={`cell ${
                  snake.some((segment) => segment.x === col && segment.y === row)
                    ? 'snake'
                    : food.x === col && food.y === row
                    ? 'food'
                    : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
      {gameOver && <p>Game Over! Your score: {snake.length}</p>}
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

export default SnakeGame;
