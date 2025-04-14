import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { JournalCalendar } from '../components/JournalCalendar';
import { database, ref, push } from '../components/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


const JournalList = () => {
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const navigate = useNavigate();

  // ⏱️ Stopwatch tracking
  const startTimeRef = useRef(Date.now());

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

const handleNewEntryClick = () => {
  const endTime = Date.now();
  const elapsedTimeSeconds = Number(((endTime - startTimeRef.current) / 1000).toFixed(4));
  ;

  const userName = sessionStorage.getItem('userName') || 'Unknown';
  const data = {
    name: userName,
    event: "new journal entry",
    version: "B",
    startTime: new Date(startTimeRef.current).toLocaleString(),
    endTime: new Date(endTime).toLocaleString(),
    elapsedTimeSeconds
  };

  push(ref(database, 'timers/'), data)
    .then(() => {
      console.log('Timer data saved to Firebase');
      navigate("/journalEntry");
    })
    .catch(error => {
      console.error('Error saving data:', error);
      navigate("/journalEntry"); // Optional: still navigate on error
    });
};

  

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    return localDate.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h1 className="journal-header">Journal</h1>
      <button className="new-entry-button" onClick={handleNewEntryClick}>
        New Entry Today
      </button>

      <div className="calendar d-flex justify-content-center">
        <JournalCalendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>

      <h3 className="previous-entries-title">Previous Entries</h3>
      <div className="previous-entries d-flex flex-column justify-content-center">
        <h4 className="entry-date">{formatDate(selectedDate)}</h4>
        <div>
          <ul className="list-group">
            {entries[selectedDate]?.length ? (
              entries[selectedDate].map((entry, index) => (
                <JournalListItem
                  key={index}
                  entry={entry}
                  index={index}
                  emojiUrl={`${process.env.PUBLIC_URL}/images/${entry.emotion}.svg`}
                  onDelete={handleRemoveEntry}
                />
              ))
            ) : (
              <li className="list-group-item">No entries</li>
            )}
          </ul>
        </div>
      </div>

      <BackButton />
    </div>
  );
};

// Move these components here to keep clean
const JournalListItem = ({ entry, index, onDelete, emojiUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="list-group-item">
      <div style={{ cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
        <img src={emojiUrl} alt="emotion" style={{ width: '24px', height: '24px', marginRight: '0.5rem' }} />
        {entry.text}
      </div>

      {isExpanded && (
        <div className="mt-2 d-flex gap-2 justify-content-right">
          <button className="btn btn-sm btn-secondary">Edit</button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(index)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "12px 12px" }}>
      <button className="back-button" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
    </div>
  );
};

export default JournalList;
