import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MoodPage from './pages';
import SuggestionPage from './pages/suggestions';
import JournalListPage from './pages/journalList';
import JournalEntryPage from './pages/journalEntry';
import ActivityPage from './pages/activity';
import CompletedPage from './pages/completed';
import OnboardingPage from './pages/onboarding';
import SignUpPage from './pages/signup';
import { Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/onboarding' || location.pathname === '/signup';

  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<DefaultRoute />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
        <Route path="/journalList" element={<JournalListPage />} />
        <Route path="/journalEntry" element={<JournalEntryPage />} />
        <Route path="/activities/:activityName" element={<ActivityPage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      {!hideNavbar && <Navbar />}
    </div>
  );
}

function DefaultRoute() {
  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

  if (!hasSeenOnboarding) {
    return <Navigate to="/onboarding" replace />;
  } else {
    return <Navigate to="/mood" replace />;
  }
}

export default App;

