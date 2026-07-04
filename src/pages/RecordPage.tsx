import { useParams, Link } from 'react-router-dom';
import type { Artist } from '../types';
import { findArtist, findRecord } from '../services/artistService';
import RecordDetail from '../components/RecordDetail';

interface Props {
  artists: Artist[];
}

const RecordPage = ({ artists }: Props) => {
  const { artistId, recordId } = useParams<{ artistId: string; recordId: string }>();

  if (!artistId || !recordId) {
    return <p className="text-danger mt-4">Invalid URL — missing artist or record ID.</p>;
  }

  const artist = findArtist(artists, parseInt(artistId));
  if (!artist) {
    return (
      <div className="mt-4">
        <p className="text-danger">Artist not found (ID: {artistId}).</p>
        <Link to="/" className="btn btn-outline-secondary">← Back to Artists</Link>
      </div>
    );
  }

  const record = findRecord(artist, parseInt(recordId));
  if (!record) {
    return (
      <div className="mt-4">
        <p className="text-danger">Record not found (ID: {recordId}).</p>
        <Link to={`/?artist=${artistId}`} className="btn btn-outline-secondary">← Back to {artist.name}</Link>
      </div>
    );
  }

  return <RecordDetail artist={artist} record={record} />;
};

export default RecordPage;
