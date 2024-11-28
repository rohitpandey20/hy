// src/App.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [displayState, setDisplayState] = useState('status'); // Default display state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        if (Array.isArray(data)) {
          // Assuming the API returns an array of tickets
          setTickets(data);
        } else {
          console.error('Data format error: API response is not an array.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDisplayStateChange = (newDisplayState) => {
    setDisplayState(newDisplayState);
    localStorage.setItem('displayState', newDisplayState);
  };

  return (
    <div className="app">
      <KanbanBoard tickets={tickets} displayState={displayState} />
    </div>
  );
};

export default App;
