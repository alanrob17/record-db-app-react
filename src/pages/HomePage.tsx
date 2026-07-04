import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Artist } from '../types';
import ArtistList from '../components/ArtistList';

interface Props {
  artists: Artist[];
}

const PAGE_SIZE = 25;

const HomePage = ({ artists }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const artistParam = searchParams.get('artist');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // If ?artist=ID is in the URL, pre-fill search with that artist's name
  useEffect(() => {
    if (artistParam && artists.length > 0) {
      const found = artists.find((a) => a.artistid === parseInt(artistParam));
      if (found) {
        setSearchText(found.name);
        setCurrentPage(1);
        setSearchParams({}, { replace: true });
      }
    }
  }, [artistParam, artists, setSearchParams]);

  // Reset to page 1 whenever search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClear = () => {
    setSearchText('');
    setCurrentPage(1);
    navigate('/', { replace: true });
  };

  if (artists.length === 0) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading artists…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="page-header mb-4">
        <h1 className="h4 mb-0">🎵 Record Collection</h1>
        <span className="text-muted small">{artists.length.toLocaleString()} artists</span>
      </div>

      {/* Search bar */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">🔍</span>
            <input
              id="search-text"
              type="text"
              className="form-control"
              placeholder="Search for an artist…"
              value={searchText}
              onChange={handleSearch}
              autoFocus
            />
            {searchText && (
              <button
                className="btn btn-outline-secondary"
                onClick={handleClear}
                type="button"
                title="Clear search"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <ArtistList
        artists={artists}
        searchText={searchText}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
