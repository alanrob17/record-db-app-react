import type { Artist } from '../types';
import ArtistItem from './ArtistItem';

interface Props {
  artists: Artist[];
  searchText: string;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const ArtistList = ({ artists, searchText, currentPage, pageSize, onPageChange }: Props) => {
  const filtered = artists.filter((a) =>
    a.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showRecords = searchText.length >= 2;
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = showRecords
    ? filtered
    : filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildPageRange = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      const start = Math.max(2, currentPage - 2);
      const end   = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      {/* Results summary */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <p className="text-muted small mb-0">
          {filtered.length === 0
            ? 'No artists match your search.'
            : showRecords
            ? <><strong>{filtered.length}</strong> artist{filtered.length !== 1 ? 's' : ''} found</>
            : (
              <>
                Showing{' '}
                <strong>{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)}</strong>
                {' '}of <strong>{filtered.length}</strong> artists
              </>
            )
          }
        </p>
        {!showRecords && totalPages > 1 && (
          <p className="text-muted small mb-0">Page {currentPage} of {totalPages}</p>
        )}
      </div>

      {/* Artist table */}
      {paginated.length > 0 && (
        <div className="artist-table">
          <div className="table-responsive">
            <table className="table table-hover table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th>Artist</th>
                  <th className="text-center col-records">Records</th>
                  {showRecords && <th className="d-none d-sm-table-cell">Albums</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map((artist) => (
                  <ArtistItem
                    key={artist.artistid}
                    artist={artist}
                    showRecords={showRecords}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="alert alert-light border text-muted text-center py-4">
          No artists match "<strong>{searchText}</strong>".
        </div>
      )}

      {/* Pagination */}
      {!showRecords && totalPages > 1 && (
        <nav aria-label="Artist pagination" className="mt-4">
          <ul className="pagination justify-content-center flex-wrap">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ‹ <span className="d-none d-sm-inline">Prev</span>
              </button>
            </li>
            {buildPageRange().map((page, idx) =>
              page === '...' ? (
                <li key={`ellipsis-${idx}`} className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              ) : (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(page as number)}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <span className="d-none d-sm-inline">Next</span> ›
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ArtistList;
