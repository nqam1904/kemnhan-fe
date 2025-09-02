// Carousel types
export type Carousel = {
    id: string | number;
    images: any; // or a single image depending on BE
    name?: string;
    isActive?: boolean;
    createDate?: string;
    writeDate?: string;
};

export type CarouselListResponse = Carousel[];
