import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Artist } from '../types';

interface Props {
  artist: Artist;
  showRecords: boolean;
}

const RECORDS_PER_PAGE = 15;

const ArtistItem = ({ artist, showRecords }: Props) => {
  const [recordPage, setRecordPage] = useState(1);

  const totalRecords = artist.record.length;
  const needsPagination = showRecords && totalRecords > RECORDS_PER_PAGE;
  const totalRecordPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  const pagedRecords = needsPagination
    ? artist.record.slice((recordPage - 1) * RECORDS_PER_PAGE, recordPage * RECORDS_PER_PAGE)
    : artist.record;

  return (
    <>
      {/* Artist row */}
      <tr>
        <td>
          <Link
            to={`/?artist=${artist.artistid}`}
            className="artist-name-link fw-semibold text-decoration-none"
          >
            {artist.name}
          </Link>
        </td>
        <td className="text-center col-records">
          <span className="badge bg-secondary rounded-pill">
            {totalRecords}
          </span>
        </td>
        {showRecords && <td className="d-none d-sm-table-cell"></td>}
      </tr>

      {/* Record sub-rows */}
      {showRecords &&
        pagedRecords.map((record) => {
          const mediaShort = record.media === 'records' ? 'R' : record.media;
          return (
            <tr key={record.recordid} className="record-sub-row">
              <td className="ps-3 ps-sm-4 small">
                <span className="text-muted me-1">{record.recorded} - </span>
                <Link
                  to={`/record/${artist.artistid}/${record.recordid}`}
                  className="text-decoration-none record-link"
                >
                  {record.name}
                </Link>
                {/* Show media inline on mobile since field column is hidden */}
                <span className="d-inline d-sm-none ms-1">
                  <span className="badge bg-light text-secondary border" style={{ fontSize: '0.68rem' }}>
                    {mediaShort}
                  </span>
                </span>
              </td>
              <td className="text-center col-records">
                {/* Show badge on sm+ only */}
                <span className="badge bg-light text-secondary border small d-none d-sm-inline">
                  {mediaShort}
                </span>
              </td>
              <td className="text-muted small d-none d-sm-table-cell">{record.field}</td>
            </tr>
          );
        })}

      {/* Record pagination row */}
      {needsPagination && (
        <tr className="record-pagination-row">
          <td colSpan={3} className="py-1 ps-3 ps-sm-4">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="text-muted small">
                {(recordPage - 1) * RECORDS_PER_PAGE + 1}–
                {Math.min(recordPage * RECORDS_PER_PAGE, totalRecords)} of {totalRecords}:
              </span>
              <nav aria-label={`${artist.name} record pages`}>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${recordPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setRecordPage(recordPage - 1)}
                      disabled={recordPage === 1}
                    >‹</button>
                  </li>
                  {Array.from({ length: totalRecordPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${recordPage === page ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setRecordPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${recordPage === totalRecordPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setRecordPage(recordPage + 1)}
                      disabled={recordPage === totalRecordPages}
                    >›</button>
                  </li>
                </ul>
              </nav>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ArtistItem;
