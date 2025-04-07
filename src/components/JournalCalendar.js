import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const JournalCalendar = ({ setSelectedDate, selectedDate }) => {
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
                const response = await fetch('/cs378-project/suggestions.json');
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
            return (
                <img src={`${process.env.PUBLIC_URL}/images/${emotion}.svg`} alt="emotion" style={{ width: '24px', height: '24px', marginRight: '0.5rem', marginLeft: '0.5rem'}} />
            );
        }
        return null;
    };

    const onChangeDate = (date) => {
        const formattedDate = date.toLocaleDateString('en-CA');
        setSelectedDate(formattedDate);
    };

    const parseLocalDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    return (
        <Calendar
            onChange={onChangeDate}
            value={parseLocalDate(selectedDate)}
            tileContent={tileContent}
            locale="en-US"
        />
    );
};
