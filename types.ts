
export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string; // Will be an object URL for local previews
  file?: File; // The actual file object
}

export interface Fish {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  media: Media[];
}
