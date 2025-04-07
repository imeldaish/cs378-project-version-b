import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JournalEntry = () => {
  const [entries, setEntries] = useState({});
  const getLocalDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  };
  const [selectedDate] = useState(getLocalDate());
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const [emojiMap, setEmojiMap] = useState({});

  useEffect(() => {
    fetch('/cs378-project/suggestions.json')
      .then((res) => res.json())
      .then((data) => {
        setEmojiMap(data);
      })
      .catch((err) => console.error('Failed to load emoji map:', err));
  }, []);

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

    const emotion = sessionStorage.getItem('emotion') || 'bored';
    const newEntry = {
      text: input.trim(),
      emotion: emotion
    };

    const newEntries = {
      ...entries,
      [selectedDate]: [...(entries[selectedDate] || []), newEntry],
    };

    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
    setInput('');
  };

  const handleGoBack = () => {
    navigate('/journalList');
  };
  const goHome = () => {
    navigate('/index.js');
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
        {(entries[selectedDate] || []).map((entry, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>
                {emojiMap[entry.emotion]?.emoji || '😐'}
              </span>
              {entry.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalEntry;
