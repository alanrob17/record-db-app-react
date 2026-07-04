import type { Artist } from '../types';
import AddRecord from '../components/AddRecord';

interface Props {
  artists: Artist[];
  onArtistsUpdated: (artists: Artist[]) => void;
}

const AddRecordPage = ({ artists, onArtistsUpdated }: Props) => {
  return (
    <div>
      <AddRecord artists={artists} onArtistsUpdated={onArtistsUpdated} />
    </div>
  );
};

export default AddRecordPage;
