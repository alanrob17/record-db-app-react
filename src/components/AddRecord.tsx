import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Artist } from '../types';
import { addRecord } from '../services/artistService';

interface Props {
  artists: Artist[];
  onArtistsUpdated: (artists: Artist[]) => void;
}

const FIELDS = ['Acoustic','Audio','Blues','Classical','Comedy','Country','Folk','Fusion','Jazz','Pop','Rock','Soul','Soundtrack','World'];
const PRESSINGS = [
  ['Am','American'],['Aus','Australian'],['Can','Canadian'],['Eng','English'],
  ['Fra','French'],['Ger','German'],['Hk','Hong Kong'],['Hol','Netherlands'],
  ['Ita','Italian'],['Jap','Japanese'],['Kor','Korean'],['Swe','Swedish'],['Swi','Swiss'],
];
const RATINGS = ['*','**','***','****'];
const DISCS = ['1','2','3','4','5','6'];
const MEDIAS = [
  ['CD','CD'],['R','Record (Vinyl)'],['DVD','DVD'],
  ['CD/DVD','CD/DVD'],['Blu-ray','Blu-ray'],['CD/Blu-ray','CD/Blu-ray'],
];

const emptyForm = {
  artistid: 0,
  name: '',
  field: '',
  recorded: '',
  label: '',
  pressing: '',
  rating: '',
  discs: '',
  media: '',
  bought: '',
  cost: '',
  covername: '',
  review: '',
};

const AddRecord = ({ artists, onArtistsUpdated }: Props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const sortedArtists = [...artists].sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.artistid || form.artistid === 0) {
      setError('Please select an artist.');
      return;
    }
    if (!form.name.trim()) {
      setError('Please enter a record title.');
      return;
    }

    const reviewClean = form.review.replace(/\n/g, ' ');

    const updated = addRecord(artists, Number(form.artistid), {
      artistid: Number(form.artistid),
      name: form.name,
      field: form.field,
      recorded: parseInt(form.recorded) || 0,
      label: form.label,
      pressing: form.pressing,
      rating: form.rating,
      discs: parseInt(form.discs) || 1,
      media: form.media,
      bought: form.bought,
      cost: form.cost,
      covername: form.covername,
      review: reviewClean,
    });

    onArtistsUpdated(updated);
    navigate(`/?artist=${form.artistid}`);
  };

  return (
    <div className="row justify-content-center mt-2 mt-md-4">
      <div className="col-12 col-md-10 col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="text-center mb-3">Add New Record</h3>
            <hr />

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Artist selector */}
              <div className="mb-3">
                <label htmlFor="artistid" className="form-label">Artist</label>
                <select
                  id="artistid"
                  name="artistid"
                  className="form-select"
                  value={form.artistid}
                  onChange={handleChange}
                >
                  <option value={0}>— Select an artist —</option>
                  {sortedArtists.map((a) => (
                    <option key={a.artistid} value={a.artistid}>{a.name}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Title</label>
                <input id="name" name="name" type="text" className="form-control"
                  placeholder="Album title" value={form.name} onChange={handleChange} />
              </div>

              <div className="row">
                {/* Field / Genre */}
                <div className="col-12 col-sm-4 mb-3">
                  <label htmlFor="field" className="form-label">Field</label>
                  <select id="field" name="field" className="form-select" value={form.field} onChange={handleChange}>
                    <option value="">— Field —</option>
                    {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                {/* Recorded year */}
                <div className="col-6 col-sm-4 mb-3">
                  <label htmlFor="recorded" className="form-label">Recorded</label>
                  <input id="recorded" name="recorded" type="text" className="form-control"
                    placeholder="e.g. 1975" value={form.recorded} onChange={handleChange} />
                </div>

                {/* Label */}
                <div className="col-6 col-sm-4 mb-3">
                  <label htmlFor="label" className="form-label">Label</label>
                  <input id="label" name="label" type="text" className="form-control"
                    placeholder="Record label" value={form.label} onChange={handleChange} />
                </div>
              </div>

              <div className="row">
                {/* Pressing */}
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="pressing" className="form-label">Pressing</label>
                  <select id="pressing" name="pressing" className="form-select" value={form.pressing} onChange={handleChange}>
                    <option value="">— Pressing —</option>
                    {PRESSINGS.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                  </select>
                </div>

                {/* Rating */}
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="rating" className="form-label">Rating</label>
                  <select id="rating" name="rating" className="form-select" value={form.rating} onChange={handleChange}>
                    <option value="">— Rating —</option>
                    {RATINGS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Discs */}
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="discs" className="form-label">Discs</label>
                  <select id="discs" name="discs" className="form-select" value={form.discs} onChange={handleChange}>
                    <option value="">— Discs —</option>
                    {DISCS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {/* Media */}
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="media" className="form-label">Media</label>
                  <select id="media" name="media" className="form-select" value={form.media} onChange={handleChange}>
                    <option value="">— Media —</option>
                    {MEDIAS.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                  </select>
                </div>
              </div>

              <div className="row">
                {/* Bought */}
                <div className="col-6 col-sm-4 mb-3">
                  <label htmlFor="bought" className="form-label">Bought</label>
                  <input id="bought" name="bought" type="text" className="form-control"
                    placeholder="DD-MM-YYYY" value={form.bought} onChange={handleChange} />
                </div>

                {/* Cost */}
                <div className="col-6 col-sm-4 mb-3">
                  <label htmlFor="cost" className="form-label">Cost</label>
                  <input id="cost" name="cost" type="text" className="form-control"
                    placeholder="e.g. $24.99" value={form.cost} onChange={handleChange} />
                </div>

                {/* Cover name */}
                <div className="col-12 col-sm-4 mb-3">
                  <label htmlFor="covername" className="form-label">Cover filename</label>
                  <input id="covername" name="covername" type="text" className="form-control"
                    placeholder="e.g. dylan-blonde.jpg" value={form.covername} onChange={handleChange} />
                </div>
              </div>

              {/* Review */}
              <div className="mb-3">
                <label htmlFor="review" className="form-label">Review</label>
                <textarea id="review" name="review" className="form-control"
                  placeholder="Write a review..." rows={5} value={form.review} onChange={handleChange} />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Save Record</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
