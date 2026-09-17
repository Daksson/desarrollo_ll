export interface Apod {
  date: string;
  title: string;
  explanation: string;
  imageUrl: string;
  hdImageUrl?: string;
  mediaType: 'image' | 'video';
  copyright?: string;
}