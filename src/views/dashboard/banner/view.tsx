import ImageAssets from '@/constants/ImagesAsset';
import axiosInstance from '@/utils/axios';
import React, { useMemo, useState } from 'react';
import { Button, Carousel, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const BannerCarouselView: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const list = e.target.files;
        const next = list ? Array.from(list) : [];
        setFiles(next);
        const urls = next.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    const onRemoveAt = (idx: number) => {
        const url = previews[idx];
        try {
            URL.revokeObjectURL(url);
        } catch (_e) { }
        setPreviews((prev) => prev.filter((_, i) => i !== idx));
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const onClearAll = () => {
        previews.forEach((url) => {
            try { URL.revokeObjectURL(url); } catch (_e) { }
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
            files.forEach((f) => formData.append('medias', f));
            await axiosInstance.post('media', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Tải ảnh thành công!');
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setIsUploading(false);
        }
    };

    const carousel = useMemo(() => {
        if (!previews.length) return null;
        return (
            <div style={{ maxWidth: 1920, margin: '0 auto' }}>
                <Carousel interval={2000} indicators={true} pause={false} slide={false}>
                    {previews.map((src, idx) => (
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
    }, [previews]);

    return (
        <>
            <h1 className="mt-10">Quản lý Banner Carousel</h1>
            <ToastContainer autoClose={1000} />

            <div className="mb-3">
                <Form.File
                    id="banner-upload"
                    label="Chọn ảnh banner (có thể chọn nhiều ảnh)"
                    custom
                    multiple
                    onChange={onSelectFiles}
                />
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


