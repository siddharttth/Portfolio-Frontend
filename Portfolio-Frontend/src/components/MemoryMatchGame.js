import React, { useState, useEffect, useCallback } from 'react';
import './MemoryMatchGame.css';

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);

  // Responsive scaling
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width <= 320) setScale(0.6);
      else if (width <= 375) setScale(0.7);
      else if (width <= 425) setScale(0.8);
      else if (width <= 768) setScale(0.9);
      else setScale(1);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const cardSymbols = ['🐶', '🐱', '🦊', '🐸', '🐰', '🐻', '🐼', '🐨'];
    const shuffledCards = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = useCallback((index) => {
    if (isAnimating || flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsAnimating(true);
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlipped;
      
      if (cards[firstCard].symbol === cards[secondCard].symbol) {
        setTimeout(() => {
          setMatchedCards(prev => [...prev, firstCard, secondCard]);
          setFlippedCards([]);
          setIsAnimating(false);
        }, 800);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsAnimating(false);
        }, 1200);
      }
    }
  }, [isAnimating, flippedCards, matchedCards, cards, moves]);

  return (
    <div className="memory-game">
      <h2 className="game-title">Memory Match</h2>
      <p className="moves-counter">Moves: {moves}</p>
      <div 
        className="memory-grid"
        style={{
          transform: `scale(${scale})`,
          marginTop: scale < 1 ? '2rem' : '0'
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="memory-card-container"
            onClick={() => handleCardClick(index)}
          >
            <div className={`memory-card ${(flippedCards.includes(index) || matchedCards.includes(index)) ? 'flipped' : ''}`}>
              <div className="memory-card-front">
                <span className="card-content">?</span>
                <div className="card-reflection"></div>
              </div>
              <div className="memory-card-back">
                <span className="card-content">{card.symbol}</span>
                <div className="card-reflection"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {matchedCards.length === cards.length && (
        <div className="victory-message">
          <p>Congratulations! 🎉</p>
          <button className="restart-button" onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Memory;
