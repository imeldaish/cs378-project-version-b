import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, ref, push } from '../components/firebase';

import { useRef } from 'react';

const JournalEntry = () => {
  const [entries, setEntries] = useState({});
  const [input, setInput] = useState('');
  const getLocalDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  };
  const [selectedDate] = useState(getLocalDate());
  const navigate = useNavigate();

  const addEntryTimeRef = useRef(null);

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
    addEntryTimeRef.current = Date.now();
  };
  

  const handleGoBack = () => {
    navigate('/journalList');
  };
  const goHome = () => {
    if (addEntryTimeRef.current) {
      const endTime = Date.now();
      const elapsedTimeSeconds = Number(((endTime - addEntryTimeRef.current) / 1000).toFixed(4));
  
      const userName = sessionStorage.getItem('userName') || 'Unknown';
      const data = {
        name: userName,
        event: "Time from Add Entry to Main Menu",
        version: "A",
        startTime: new Date(addEntryTimeRef.current).toLocaleString(),
        endTime: new Date(endTime).toLocaleString(),
        elapsedTimeSeconds
      };

      push(ref(database, 'timers/'), data)
        .then(() => {
          console.log('Add-to-Main time saved to Firebase ✅');
          navigate('/');
        })
        .catch(error => {
          console.error('Error saving time:', error);
          navigate('/');
        });
    } else {
      // If no Add Entry clicked, just navigate
      navigate('/');
    }
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
        <button type="submit" class="button">Add Entry</button>
        <button type="button" class="button" onClick={handleClear}>Clear</button>
        <button class="button" onClick={handleGoBack}>My Entries</button>
        <button class="button" onClick={goHome}>Main Menu</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {(entries[selectedDate] || []).map((entry, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <div>
              <img src={`${process.env.PUBLIC_URL}/images/${entry.emotion}.svg`} alt="emotion" style={{ width: '24px', height: '24px', marginRight: '0.5rem' }} />
              {entry.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalEntry;
