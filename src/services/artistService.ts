import type { Artist, RecordItem } from '../types';

const STORAGE_KEY = 'artistList';

/**
 * Load artists from localStorage, or fetch from /record-data.json on first load.
 */
export const getSavedArtists = async (): Promise<Artist[]> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Artist[];
    } catch (e) {
      console.error('Failed to parse artistList from localStorage:', e);
    }
  }

  // First load — fetch JSON and seed localStorage
  const response = await fetch('/record-data.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch record data: ${response.statusText}`);
  }
  const data = await response.json() as Artist[];
  saveArtists(data);
  return data;
};

export const saveArtists = (artists: Artist[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artists));
};

export const findArtist = (artists: Artist[], artistId: number): Artist | undefined => {
  return artists.find((a) => a.artistid === artistId);
};

export const findRecord = (artist: Artist, recordId: number): RecordItem | undefined => {
  return artist.record.find((r) => r.recordid === recordId);
};

/**
 * Add a new record to an artist, persisting to localStorage.
 * Assigns a new recordid (max existing + 1).
 */
export const addRecord = (artists: Artist[], artistId: number, record: Omit<RecordItem, 'recordid'>): Artist[] => {
  const updated = artists.map((artist) => {
    if (artist.artistid !== artistId) return artist;
    const maxId = artist.record.reduce((max, r) => Math.max(max, r.recordid), 0);
    const newRecord: RecordItem = { ...record, recordid: maxId + 1 };
    return { ...artist, record: [...artist.record, newRecord] };
  });
  saveArtists(updated);
  return updated;
};
