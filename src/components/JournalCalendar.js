import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const JournalCalendar = ({ setSelectedDate }) => {
    const [entries, setEntries] = useState({});

    useEffect(() => {
        const fetchEntries = () => {
            const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || {};
            setEntries(storedEntries);
        };

        fetchEntries();
        window.addEventListener("storage", fetchEntries);

        return () => window.removeEventListener("storage", fetchEntries);
    }, []);

    const tileContent = ({ date, view }) => {
        const formattedDate = date.toISOString().split('T')[0];
        if (view === 'month' && Array.isArray(entries[formattedDate]) && entries[formattedDate].length > 0) {
            return <span style={{ background: 'lightblue', borderRadius: '50%', padding: '3px' }}>😞</span>;
        }
        return null;
    };

    return (
        <Calendar
            onChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
            value={new Date()}
            tileContent={tileContent}
            locale="en-US"
        />
    );
};
