export type MediaRef = {
  id: number | string;
  key?: string;
  url?: string;
};

export type Promotion = {
  id: number;
  name: string;
  slug: string;
  content: string;
  images: MediaRef[];
  endDate: string; // ISO Date string
  isActive: boolean;
  createDate: string; // ISO Date string
  writeDate: string; // ISO Date string
};

export type PromotionCreateRequest = {
  name: string;
  slug: string;
  content: string;
  endDate: string; // ISO Date string
  isActive: boolean;
  // One of the following will be used depending on API: upload files or send ids
  images?: File[];
  imagesId?: Array<number | string>;
};

export type PromotionUpdateRequest = Partial<PromotionCreateRequest>;

export type PromotionListResponse = Promotion[];
