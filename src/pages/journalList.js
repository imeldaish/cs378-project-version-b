import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { JournalCalendar } from '../components/JournalCalendar';
import LoadBar from '../components/LoadBar.js';
import { ArrowBigLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JournalList = () => {

  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const navigate = useNavigate();

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
    navigate("/journalEntry");
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
      <LoadBar percentage={75} />
      <h1 className="journal-header">My Journal</h1>
      <div className="back-button-container">
        <button className="back-button mt-2" onClick={() => navigate("/suggestions")}>
          <ArrowBigLeft size={30} />
        </button>
      </div>
      <div className="calendar d-flex justify-content-center fade-in-up">
        <JournalCalendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>
      <h3 className="previous-entries-title fade-in-up">Previous Entries</h3>
      <div className="previous-entries d-flex flex-column justify-content-center fade-in-up">
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
                  selectedDate={selectedDate}
                />
              ))
            ) : (
              <li className="list-group-item">No entries</li>
            )}
          </ul>
        </div>
      </div>
      <button className="new-entry-button fade-in-up" onClick={handleNewEntryClick}>
        New Entry
      </button>
    </div>
  );
};

const JournalListItem = ({ entry, index, onDelete, emojiUrl, selectedDate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  return (
    <li className="list-group-item">
      <div
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={emojiUrl} alt="emotion" style={{ width: '24px', height: '24px' }} />
        <strong>{entry.title || "No Title"}</strong>
      </div>

      {isExpanded && (
        <div className="mt-2">
          <p>{entry.text}</p>
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                sessionStorage.setItem('editEntryIndex', index);
                sessionStorage.setItem('editEntryDate', selectedDate);
                sessionStorage.setItem('editEntryTitle', entry.title || 'No Title');
                sessionStorage.setItem('editEntryText', entry.text);
                navigate("/journalEntry");
              }}
            >
              Edit
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(index)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default JournalList;
