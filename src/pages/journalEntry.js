import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JournalEntry = () => {

  const [entries, setEntries] = useState({});
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getLocalDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  };

  const [selectedDate] = useState(getLocalDate());
  const navigate = useNavigate();

  const isEditMode = sessionStorage.getItem('editEntryIndex') !== null;

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || {};
    setEntries(storedEntries);

    const editTitle = sessionStorage.getItem('editEntryTitle');
    const editText = sessionStorage.getItem('editEntryText');

    if (editTitle || editText) {
      setTitle(editTitle || '');
      setInput(editText || '');
    }
  }, []);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const emotion = sessionStorage.getItem('emotion') || 'bored';
    const newEntry = {
      title: title.trim() || 'No Title',
      text: input.trim(),
      emotion: emotion
    };

    const newEntries = { ...entries };
    const editingIndex = sessionStorage.getItem('editEntryIndex');
    const editingDate = sessionStorage.getItem('editEntryDate');

    setShowSuccessModal(true);

    if (editingIndex !== null && editingDate) {
      const updatedArray = [...(newEntries[editingDate] || [])];
      updatedArray[editingIndex] = newEntry;
      newEntries[editingDate] = updatedArray;

      sessionStorage.removeItem('editEntryIndex');
      sessionStorage.removeItem('editEntryDate');
      sessionStorage.removeItem('editEntryTitle');
      sessionStorage.removeItem('editEntryText');
    } else {
      newEntries[selectedDate] = [...(entries[selectedDate] || []), newEntry];
    }

    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
    setInput('');
    setTitle('');
  };

  const handleCancel = () => {
    sessionStorage.removeItem('editEntryIndex');
    sessionStorage.removeItem('editEntryDate');
    sessionStorage.removeItem('editEntryTitle');
    sessionStorage.removeItem('editEntryText');
    navigate('/journalList');
  };

  const handleGoBack = () => {
    navigate('/journalList');
  };

  const handleClear = () => {
    setInput('');
    setTitle('');
  };

  return (
    <div className="page" style={{ padding: '1rem' }}>
      <h2>{isEditMode ? 'Edit Entry' : 'New Entry'}</h2>
      <form onSubmit={handleAddEntry} className="d-flex flex-column justify-content-center">
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '80vm', marginBottom: '0.5rem', borderRadius: '8px' }}
        />
        <textarea
          placeholder="Write your journal entry..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{ width: '80vm', marginBottom: '0.5rem', borderRadius: '8px' }}
        />

        <div className="d-flex justify-content-between" style={{ width: '80vm' }}>
          <div className="p-2">
            <button type="button" class="button" onClick={handleClear}>Clear</button>
          </div>
          <div className="d-flex">
            <div className="p-2">
              <button type="button" className="button" onClick={() => setShowCancelModal(true)}>Cancel</button>
            </div>
            <div className="p-2">
              <button type="submit" class="button">{isEditMode ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      </form>

      {showCancelModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>{isEditMode ? "Are you sure? Your changes will not be saved." : "Are you sure? Your entry will not be added."}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '0.5rem' }}>
              <button className="button" onClick={handleCancel}>Yes</button>
              <button className="button" onClick={() => setShowCancelModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>{isEditMode ? "Successfully edited entry!" : "Successfully added entry!"}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
              <button className="button" onClick={() => { setShowSuccessModal(false); handleGoBack(); }}>Ok</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default JournalEntry;
