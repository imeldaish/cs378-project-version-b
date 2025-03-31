import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JournalEntryPage = () => {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries'));
    if (storedEntries) {
      setEntries(storedEntries);
    }
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem('journalEntries', JSON.stringify(items));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newEntries = [input.trim(), ...entries];
    setEntries(newEntries);
    updateLocalStorage(newEntries);
    setInput('');
  };

  const handleGoBack = () => {
    navigate('/journalList'); 
  };
  const goHome = () => {
    navigate('/App.js'); 
  };

  const handleRemoveEntry = (index) => {
    const newEntries = [
      ...entries.slice(0, index),
      ...entries.slice(index + 1),
    ];
    setEntries(newEntries);
    updateLocalStorage(newEntries);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Journal Entry</h2>
      <form onSubmit={handleAddEntry}>
        <textarea
          placeholder="Write your journal entry..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <button type="submit">Add Entry</button>
        <button type="button" onClick={handleClear}>Clear</button>
        <button onClick={handleGoBack}>My Entries</button>
        <button onClick={goHome}>Main Menu</button>
      </form>

      

      <ul style={{ marginTop: '1rem' }}>
        {entries.map((entry, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <div>{entry}</div>
            <button onClick={() => handleRemoveEntry(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalEntryPage;
