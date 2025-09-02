import React, { useMemo, useState } from 'react';
import ImageAssets from '@/constants/ImagesAsset';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button, Carousel } from 'react-bootstrap';
import { useGetCarouselsQuery, useCreateCarouselMutation } from '@/store/apis/carousel';

const BannerCarouselView: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const { data: carousels = [] } = useGetCarouselsQuery();
    const [createCarousel] = useCreateCarouselMutation();

    const onSelectFiles = (e: any) => {
        const list = (e.target as HTMLInputElement).files;
        const next = list ? Array.from(list) : [];
        setFiles(next);
        const urls = next.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    const onRemoveAt = (idx: number) => {
        const url = previews[idx];
        try {
            URL.revokeObjectURL(url);
        } catch (_e) { 
            console.log(_e);
        }
        setPreviews((prev) => prev.filter((_, i) => i !== idx));
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const onClearAll = () => {
        previews.forEach((url) => {
            try { URL.revokeObjectURL(url); } catch (_e) { 
                console.log(_e);
            }
        });
        setFiles([]);
        setPreviews([]);
    };

    const onUpload = async () => {
        if (!files.length) {
            toast.warning('Vui lòng chọn hình ảnh!');
            return;
        }
        try {
            setIsUploading(true);
            const formData = new FormData();
            files.forEach((f) => formData.append('images', f));
            await createCarousel({ body: formData }).unwrap();
            toast.success('Lưu carousel thành công!');
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setIsUploading(false);
        }
    };

    const carousel = useMemo(() => {
        const sources = previews.length
            ? previews
            : (carousels?.[0]?.images || []).map((img: any) => img?.url || img?.key).filter(Boolean);
        if (!sources.length) return null;
        return (
            <div style={{ maxWidth: 1920, margin: '0 auto' }}>
                <Carousel interval={2000} indicators pause={false} slide={false}>
                    {sources.map((src: any, idx: any) => (
                        <Carousel.Item key={`${src}-${idx}`}>
                            <img
                                src={src}
                                alt={`banner-${idx}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    aspectRatio: '1920 / 700',
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        );
    }, [previews, carousels]);

    return (
        <>
            <h1 className="mt-10">Quản lý Banner Carousel</h1>
            <ToastContainer autoClose={1000} />

            <div className="mb-3">
                <Form.Group controlId="banner-upload">
                    <Form.Label>Chọn ảnh banner (có thể chọn nhiều ảnh)</Form.Label>
                    <Form.Control type="file" multiple onChange={onSelectFiles} />
                </Form.Group>
            </div>


            {previews.length > 0 ? (
                <div className="mb-3">
                    <div className="d-flex flex-wrap">
                        {previews.map((url, idx) => (
                            <div key={`${url}-${idx}`} style={{ position: 'relative', padding: 8 }}>
                                <img
                                    src={url}
                                    alt={`preview-${idx}`}
                                    width={140}
                                    height={90}
                                    style={{ objectFit: 'cover', borderRadius: 6 }}
                                />
                                <Button
                                    variant="link"
                                    className="p-0"
                                    style={{ position: 'absolute', top: 2, right: 2 }}
                                    onClick={() => onRemoveAt(idx)}
                                    aria-label="Remove"
                                >
                                    <img src={ImageAssets.ic_clear} alt="clear" width={18} height={18} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            <div className="mb-3">
                <Button
                    type="button"
                    className="btn btn-primary mr-10"
                    onClick={onUpload}
                    disabled={isUploading || !files.length}
                >
                    Lưu banner
                </Button>
                <Button type="button" variant="secondary" onClick={onClearAll} disabled={!files.length}>
                    Xoá tất cả
                </Button>
            </div>

            <div className="mt-4">
                {carousel}
            </div>
        </>
    );
};

export default BannerCarouselView;


