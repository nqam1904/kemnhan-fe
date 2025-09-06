import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { fDate, fTime } from '@/utils/format-time';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import tableStyles from '@/components/data-table/styles';
import React, { useRef, useMemo, useState } from 'react';
import { compressImagesIfNeeded } from '@/utils/image-compress';
import { Form, Modal, Button, Carousel } from 'react-bootstrap';
import { useGetCarouselsQuery, useCreateCarouselMutation, useDeleteCarouselMutation } from '@/store/apis/carousel';

const BannerCarouselView: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const { data: carousels = [], refetch } = useGetCarouselsQuery();
    const [createCarousel] = useCreateCarouselMutation();
    const [deleteCarousel] = useDeleteCarouselMutation();
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        const nextPreviews = previews.filter((_, i) => i !== idx);
        const nextFiles = files.filter((_, i) => i !== idx);
        setPreviews(nextPreviews);
        setFiles(nextFiles);
        if (nextFiles.length === 0 && fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onClearAll = () => {
        previews.forEach((url) => {
            try { URL.revokeObjectURL(url); } catch (_e) {
                console.log(_e);
            }
        });
        setFiles([]);
        setPreviews([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onUpload = async () => {
        if (!files.length) {
            toast.warning('Vui lòng chọn hình ảnh!');
            return;
        }
        try {
            setIsUploading(true);
            // 1) Compress if needed, then create carousels by sending FormData directly
            const optimized = await compressImagesIfNeeded(files);
            await Promise.all(
                optimized.map((file) => {
                    const form = new FormData();
                    form.append('name', `Banner ${file.name}`);
                    form.append('isActive', 'true');
                    form.append('image', file);
                    return createCarousel({ body: form }).unwrap();
                })
            );
            toast.success('Lưu carousel thành công!');
            setShowModal(false);
            onClearAll();
            refetch();
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setIsUploading(false);
        }
    };

    const onDelete = async (id: string | number) => {
        if (!window.confirm('Bạn có chắc muốn xoá banner này?')) return;
        try {
            await deleteCarousel({ id }).unwrap();
            toast.success('Xoá thành công');
            refetch();
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const carousel = useMemo(() => {
        const sources = previews.length
            ? previews
            : (carousels || [])
                .map((c: any) => c?.image?.url || (c?.image?.key ? resolveImageUrl(c?.image?.key) : ''))
                .filter((src: string) => Boolean(src));
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
                                onError={(e: any) => {
                                    // Hide broken images to avoid showing alt text in preview area
                                    try { e.currentTarget.style.display = 'none'; } catch (_e) {
                                        console.log(_e);
                                    }
                                }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        );
    }, [previews, carousels]);

    const columns = useMemo(
        () => [
            { name: 'Vị trí', selector: (_row: any, index?: number) => String((index ?? 0) + 1), width: '80px' },
            {
                name: 'Hình ảnh',
                selector: (row: any) => row?.image?.key || row?.image?.url || '',
                cell: (row: any) => {
                    const src = row?.image?.url || resolveImageUrl(row?.image?.key || '');
                    return (
                        <img
                            src={src || ImageAssets.image}
                            alt={row?.name || 'banner'}
                            width={140}
                            height={90}
                            style={{ objectFit: 'cover', borderRadius: 6 }}
                        />
                    );
                },
                width: '220px',
            },
            {
                name: 'Link',
                selector: (row: any) => row?.image?.key || row?.image?.url || '',
                cell: (row: any) => {
                    const src = row?.image?.url || resolveImageUrl(row?.image?.key || '');
                    return src ? (
                        <a href={src} target="_blank" rel="noreferrer" aria-label="Xem">
                            <img src={ImageAssets.icEye} alt="view" width={18} height={18} />
                        </a>
                    ) : null;
                },
                width: '120px',
            },
            {
                name: 'Ngày tạo',
                selector: (row: any) => row?.createDate || row?.createdAt || '',
                cell: (row: any) => `${fTime(row?.createDate || row?.createdAt)} ${fDate(row?.createDate || row?.createdAt)}`,
            },
            {
                name: 'Ngày cập nhật',
                selector: (row: any) => row?.writeDate || row?.updatedAt || '',
                cell: (row: any) => `${fTime(row?.writeDate || row?.updatedAt)} ${fDate(row?.writeDate || row?.updatedAt)}`,
            },
            {
                name: 'Chức năng',
                selector: (row: any) => row?.id,
                cell: (row: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-warning white mr-10"
                            onClick={() => { }}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-danger white"
                            onClick={() => onDelete(row.id)}
                        >
                            Xóa
                        </Button>
                    </>
                ),
                width: '180px',
            },
        ],
        []
    );

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-10 mb-3">
                <h1 className="m-0">Quản lý Banner</h1>
                <Button onClick={() => setShowModal(true)}>Thêm</Button>
            </div>
            <ToastContainer autoClose={1000} />

            <DataTable
                title=""
                columns={columns as any}
                data={carousels as any}
                pagination
                responsive
                dense
                customStyles={tableStyles}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <Form.Group controlId="banner-upload">
                            <Form.Label>Chọn ảnh banner</Form.Label>
                            <Form.Control ref={fileInputRef as any} type="file" onChange={onSelectFiles} />
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClearAll} disabled={!files.length}>
                        Xoá tất cả
                    </Button>
                    <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={onUpload}
                        disabled={isUploading || !files.length}
                    >
                        Lưu banner
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="mt-4">{carousel}</div>
        </>
    );
};

export default BannerCarouselView;


