import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Artist, RecordItem } from '../types';
import {
  getRecordRating,
  getRecordMedia,
  getRecordPressing,
  getRecordBoughtDate,
} from '../utils/formatters';

interface Props {
  artist: Artist;
  record: RecordItem;
}

const RATING_COLOURS: Record<string, string> = {
  Indispensible:     'success',
  'Slightly flawed': 'primary',
  Average:           'warning',
  Mediocre:          'secondary',
};

const MEDIA_ICONS: Record<string, string> = {
  'CD-Audio':            '💿',
  'CD-Audio & Blu-ray':  '💿',
  'CD-Audio & DVD':      '💿',
  'DVD':                 '📀',
  'Blu-ray':             '📀',
  'Record (Vinyl)':      '🎵',
};

const RecordDetail = ({ artist, record }: Props) => {
  const [showReview, setShowReview]       = useState(false);
  const [showBiography, setShowBiography] = useState(false);

  const rating   = getRecordRating(record.rating);
  const media    = getRecordMedia(record.media);
  const pressing = getRecordPressing(record.pressing);
  const bought   = getRecordBoughtDate(record.bought);

  const ratingColour = RATING_COLOURS[rating] ?? 'secondary';
  const mediaIcon    = MEDIA_ICONS[media] ?? '🎵';

  const coverSrc  = record.covername ? `/assets/images/${record.covername}` : null;
  const hasReview = record.review && record.review.trim() !== '';

  return (
    <div className="record-detail-page">

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb flex-nowrap text-truncate">
          <li className="breadcrumb-item">
            <Link to="/">Artists</Link>
          </li>
          <li className="breadcrumb-item text-truncate">
            <Link to={`/?artist=${artist.artistid}`}>{artist.name}</Link>
          </li>
          <li className="breadcrumb-item active text-truncate" aria-current="page">
            {record.name}
          </li>
        </ol>
      </nav>

      {/* Hero card */}
      <div className="record-hero card shadow-sm mb-4 border-0">
        <div className="card-body p-3 p-sm-4">
          <div className="d-flex flex-column flex-sm-row align-items-start gap-3">

            {/* Cover image — shown above title on mobile */}
            {coverSrc && (
              <div className="flex-shrink-0">
                <img
                  src={coverSrc}
                  alt={`${record.name} cover`}
                  className="record-cover-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}

            {/* Title + badges */}
            <div className="flex-grow-1 min-w-0">
              <p className="record-artist-label mb-1">
                <Link to={`/?artist=${artist.artistid}`} className="text-decoration-none">
                  {artist.name}
                </Link>
              </p>
              <h1 className="record-title mb-3">{record.name}</h1>
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span className={`badge bg-${ratingColour} record-badge`}>
                  {record.rating} — {rating}
                </span>
                <span className="badge bg-light text-dark border record-badge">
                  {mediaIcon} {media}
                </span>
                {record.field && (
                  <span className="badge bg-light text-dark border record-badge">
                    🎼 {record.field}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata + Review — stack on mobile, side-by-side on md+ */}
      <div className="row g-3 g-md-4">

        {/* Metadata card — full width on mobile, 5 cols on md+ */}
        <div className={showReview && hasReview ? 'col-12 col-md-5' : 'col-12 col-md-5'}>
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom detail-card-header">
              Album Details
            </div>
            <div className="card-body p-0">
              <table className="table table-sm mb-0 detail-table">
                <tbody>
                  <tr><th scope="row">Recorded</th><td>{record.recorded}</td></tr>
                  <tr><th scope="row">Label</th>   <td>{record.label}</td></tr>
                  <tr><th scope="row">Pressing</th><td>{pressing}</td></tr>
                  <tr><th scope="row">Discs</th>   <td>{record.discs}</td></tr>
                  <tr><th scope="row">Bought</th>  <td>{bought}</td></tr>
                  <tr><th scope="row">Cost</th>    <td>{record.cost}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer bg-white border-top d-flex flex-wrap gap-2">
              {hasReview && (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowReview((v) => !v)}
                >
                  {showReview ? '▲ Hide Review' : '▼ Show Review'}
                </button>
              )}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowBiography((v) => !v)}
              >
                {showBiography ? '▲ Hide Biography' : '▼ Biography'}
              </button>
            </div>
          </div>
        </div>

        {/* Review panel — full width on mobile, stacks below metadata on mobile */}
        {showReview && hasReview && (
          <div className="col-12 col-md-7">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-white border-bottom detail-card-header">
                Review
              </div>
              <div
                className="card-body review-body"
                dangerouslySetInnerHTML={{ __html: record.review }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Biography — full width, collapsible */}
      {showBiography && (
        <div className="card shadow-sm border-0 mt-3 mt-md-4">
          <div className="card-header bg-white border-bottom detail-card-header">
            Artist Biography — {artist.name}
          </div>
          <div
            className="card-body biography-body"
            dangerouslySetInnerHTML={{ __html: artist.biography }}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-3 mt-md-4 d-flex flex-wrap gap-2">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← All Artists
        </Link>
        <Link to={`/?artist=${artist.artistid}`} className="btn btn-outline-primary btn-sm">
          ↩ {artist.name}
        </Link>
      </div>
    </div>
  );
};

export default RecordDetail;
