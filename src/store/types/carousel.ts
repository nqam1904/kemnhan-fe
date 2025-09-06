// Carousel types
export type MediaRef = {
  id: string | number;
  url?: string;
  key?: string;
};

export type Carousel = {
  id: string | number;
  name: string;
  image: MediaRef;
  isActive: boolean;
  createDate?: string;
  writeDate?: string;
};

export type CarouselListResponse = Carousel[];
