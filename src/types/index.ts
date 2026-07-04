export interface RecordItem {
  recordid: number;
  artistid: number;
  name: string;
  field: string;
  recorded: number;
  label: string;
  pressing: string;
  rating: string;
  discs: number;
  media: string;
  bought: string;
  cost: string;
  covername?: string;
  review: string;
}

export interface Artist {
  artistid: number;
  firstname: string;
  lastname: string;
  name: string;
  biography: string;
  record: RecordItem[];
}
