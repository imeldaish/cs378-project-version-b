import React, { useState, useEffect } from 'react';
import { JournalCalendar } from '../components/JournalCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const NavButton = () => {
  const navigate = useNavigate();
  return (
    <button variant="primary" onClick={() => navigate("/journalEntry")}>
      New Entry
    </button>
  );
};

const JournalList = () => {
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || {};
    setEntries(storedEntries);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem('journalEntries', JSON.stringify(items));
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = { ...entries };
    if (Array.isArray(updatedEntries[selectedDate])) {
      updatedEntries[selectedDate].splice(index, 1);
    }
    if (updatedEntries[selectedDate].length === 0) {
      delete updatedEntries[selectedDate];
    }
    setEntries(updatedEntries);
    updateLocalStorage(updatedEntries);
  };

  return (
    <div>
      <h2>Journal</h2>
      <JournalCalendar setSelectedDate={setSelectedDate} class="d-flex justify-content-center" />
      <NavButton />
      <h3>Entries for {selectedDate}</h3>
      <ul>
        {entries[selectedDate]?.map((entry, index) => (
          <li key={index}>
            {entry}
            <button onClick={() => handleRemoveEntry(index)}>Delete</button>
          </li>
        )) || <p>No entries for this date.</p>}
      </ul>
    </div>
  );
};

export default JournalList;
