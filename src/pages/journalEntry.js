import React, { useState, useEffect, useRef } from 'react';
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

  const isEditingRef = useRef(false);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || {};
    setEntries(storedEntries);

    const editTitle = sessionStorage.getItem('editEntryTitle');
    const editText = sessionStorage.getItem('editEntryText');

    const isEditing = sessionStorage.getItem('editEntryIndex') !== null;
    isEditingRef.current = isEditing;

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
      <h2 className="journal-header">{isEditingRef.current ? 'Edit Entry' : 'New Entry'}</h2>
      <form onSubmit={handleAddEntry} className="d-flex flex-column justify-content-center" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ paddingLeft: '10px', width: '80vm', marginBottom: '20px', borderRadius: '13px', height: '45px', border: 'none', fontSize: '24px', fontWeight: '600' }}
        />
        <textarea
          placeholder="Write your journal entry..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{ width: '80vm', marginBottom: '40px', borderRadius: '8px', height: '336px', borderRadius: '16px', border: 'none' }}
        />

        <div className="d-flex justify-content-between" style={{ width: '100%' }}>
          <div style={{ flex: '1', maxWidth: '115px' }}>
            <button type="button" className="cancel-button" onClick={handleClear}>Clear</button>
          </div>

          <div className="d-flex gap-2" style={{ flexShrink: 0 }}>
            <div style={{ maxWidth: '135px' }}>
              <button type="button" className="entry-button" onClick={() => setShowCancelModal(true)}>Cancel</button>
            </div>
            <div style={{ maxWidth: '135px' }}>
              <button type="submit" className="entry-button">{isEditingRef.current ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      </form>

      {showCancelModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>{isEditingRef.current ? "Are you sure? Your changes will not be saved." : "Are you sure? Your entry will not be added."}</p>
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
            <p>{isEditingRef.current ? "Successfully edited entry!" : "Successfully added entry!"}</p>
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
