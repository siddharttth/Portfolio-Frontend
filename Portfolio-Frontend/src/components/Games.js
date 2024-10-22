import React, { useState, useEffect } from 'react';
import { endpoints } from '../config';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(endpoints.games);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
      setError('Failed to load games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const startGame = (gameId) => {
    navigate(`/game/${gameId}`); // Navigate to the specific game route
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="games-loading">
        <div className="loading-spinner"></div>
        <p>Loading exciting games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-error">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={fetchGames}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="games-container">
      <h1 className="games-title">Games</h1>
      <p className="games-subtitle">Choose your game and start playing!</p>
      <motion.div
        className="games-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game) => (
          <motion.div
            className="game-card"
            key={game.id}
            variants={itemVariants}
            onClick={() => startGame(game.id)}
          >
            <div className="game-header">
              <h2 className="game-title">{game.name}</h2>
            </div>
            <p className="game-description">{game.description}</p>
            <h3 className="rules-title">Rules:</h3>
            <ul className="rules-list">
              {game.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
            <button className="play-button" onClick={(e) => {
              e.stopPropagation();
              startGame(game.id); // Redirects to the game
            }}>
              Play Now
            </button>
          </motion.div>
        ))}
      </motion.div>
      {games.length === 0 && !loading && !error && (
        <div className="no-games">
          <p>No games available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default Games;
