
export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string; // Will be an object URL for local previews
  file?: File; // The actual file object
}

export interface Comment {
  id: string;
  authorName: string;
  text: string;
}

export interface Fish {
  id: string;
  name: string;
  nameEn?: string;
  scientificName: string;
  description: string;
  descriptionEn?: string;
  habitat: string;
  media: Media[];
  comments: Comment[];
}

export interface User {
  name: string;
  email: string;
}