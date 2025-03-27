import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import MoodPage from './pages';
import SuggestionPage from './pages/suggestions';
import JournalListPage from './pages/journalList';
import JournalEntryPage from './pages/journalEntry';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<MoodPage />}></Route>
          <Route path="/suggestions" element={<SuggestionPage />}></Route>
          <Route path="/journalList" element={<JournalListPage />}></Route>
          <Route path="/journalEntry" element={<JournalEntryPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
