import React, { useState, useEffect } from 'react';
import './SlidingPuzzleGame.css';

const Puzzle = () => {
  const initialTiles = Array.from({ length: 15 }, (_, i) => i + 1).concat(null);
  const [tiles, setTiles] = useState(initialTiles);

  useEffect(() => {
    setTiles(shuffle([...tiles]));
  }, []);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
    }
  };

  const resetGame = () => {
    setTiles(shuffle(initialTiles));
  };

  return (
    <div className="puzzle-game">
      <h2>Sliding Puzzle</h2>
      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`puzzle-tile ${tile ? 'filled' : 'empty'}`}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Puzzle;
