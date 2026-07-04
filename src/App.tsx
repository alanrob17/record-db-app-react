import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import AddRecordPage from './pages/AddRecordPage';
import AboutPage from './pages/AboutPage';
import type { Artist } from './types';
import { getSavedArtists } from './services/artistService';

function App() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    getSavedArtists()
      .then((data) => {
        setArtists(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setLoadError(msg);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading your record collection…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <strong>Failed to load data:</strong> {loadError}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: 'clamp(4rem, 8vw, 5.5rem)' }}>
        <Routes>
          <Route path="/" element={<HomePage artists={artists} />} />
          <Route path="/record/:artistId/:recordId" element={<RecordPage artists={artists} />} />
          <Route
            path="/add"
            element={<AddRecordPage artists={artists} onArtistsUpdated={setArtists} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={
            <div className="mt-5 text-center">
              <h2>404 — Page not found</h2>
              <a href="/" className="btn btn-primary mt-3">Go Home</a>
            </div>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
