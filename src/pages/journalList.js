import React, { useState, useEffect } from 'react';
import { JournalCalendar } from '../components/JournalCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const EntryButton = () => {
  const navigate = useNavigate();
  return (
    <button className="new-entry-button" variant="primary" onClick={() => navigate("/journalEntry")}>
      New Entry Today
    </button>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "12px 12px" }}>
      <button className="back-button" variant="primary" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
    </div>
  );
};

const JournalListItem = ({ entry, index, onDelete, emoji }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="list-group-item">
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{emoji}</span>
        {entry.text}
      </div>

      {isExpanded && (
        <div className="mt-2 d-flex gap-2 justify-content-right">
          <button className="btn btn-sm btn-secondary">Edit</button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

const JournalList = () => {

  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h1 className="journal-header">Journal</h1>
      <EntryButton />
      <div class="calendar d-flex justify-content-center">
        <JournalCalendar setSelectedDate={setSelectedDate} />
      </div>
      <h3 className="previous-entries-title">Previous Entries</h3>
      <div className="previous-entries d-flex flex-column justify-content-center ">
        <h4 className="entry-date">{formatDate(selectedDate)}</h4>
        <div>
          <ul className="list-group">
            {entries[selectedDate]?.length ? (
              entries[selectedDate].map((entry, index) => (
                <JournalListItem
                  key={index}
                  entry={entry}
                  index={index}
                  emoji={emojiMap[entry.emotion]?.emoji || '😐'}
                  onDelete={handleRemoveEntry}
                />
              )
              )
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

export default JournalList;
