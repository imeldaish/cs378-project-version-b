import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const JournalCalendar = ({ setSelectedDate }) => {
    const [entries, setEntries] = useState({});
    const [emotions, setEmotions] = useState({});

    // Load entries from localStorage
    useEffect(() => {
        const fetchEntries = () => {
            const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || {};
            setEntries(storedEntries);
        };

        fetchEntries();
        window.addEventListener("storage", fetchEntries);
        return () => window.removeEventListener("storage", fetchEntries);
    }, []);

    // Load emotion data from suggestions.json
    useEffect(() => {
        async function fetchEmotions() {
            try {
                const response = await fetch('/suggestions.json');
                if (!response.ok) throw new Error('Could not fetch emoji data');
                const data = await response.json();
                setEmotions(data);
            } catch (error) {
                console.error("Failed to fetch emotions:", error);
            }
        }

        fetchEmotions();
    }, []);

    const tileContent = ({ date, view }) => {
        if (view !== 'month') return null;
        const formattedDate = date.toISOString().split('T')[0];
        const dateEntries = entries[formattedDate];

        if (Array.isArray(dateEntries) && dateEntries.length > 0) {
            const emotion = dateEntries[0]?.emotion || 'bored';
            const emoji = emotions[emotion]?.emoji || '😐';
            return (
                <span style={{padding: '3px' }}>
                    {emoji}
                </span>
            );
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
