import './news.css';

import type { Promotion } from '@/store/types/promotion';

import { z } from 'zod';
import { fDate } from '@/utils/format-time';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import DataTable from 'react-data-table-component';
import { Form, Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { formatSubstring } from '@/utils/format-string';
import React, { useRef, useMemo, useState } from 'react';
import compactDataTableStyles from '@/components/data-table/styles';
import {
    useGetPromotionsQuery,
    useCreatePromotionMutation,
    useDeletePromotionMutation,
    useUpdatePromotionMutation,
} from '@/store/apis/promotions';

const NewsView: React.FC = () => {
    const { data: promotions = [], isLoading, refetch } = useGetPromotionsQuery();
    const [createPromotion] = useCreatePromotionMutation();
    const [updatePromotion] = useUpdatePromotionMutation();
    const [deletePromotion] = useDeletePromotionMutation();

    type PromotionForm = {
        id: string | number | null;
        name: string;
        content: string;
        endDate: string;
        isActive: boolean;
        images: File[];
    };

    const initialForm: PromotionForm = {
        id: null,
        name: '',
        content: '',
        endDate: new Date().toISOString(),
        isActive: false,
        images: [],
    };

    const [form, setForm] = useState<PromotionForm>(initialForm);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('Thêm tin khuyến mãi');
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; id: any; label: string }>(
        { show: false, id: null, label: '' }
    );
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const apiPreviewCountRef = useRef<number>(0);
    const [errors, setErrors] = useState<Partial<Record<'name', string>>>({});

    const schema = z.object({ name: z.string().min(1, 'Vui lòng điền tiêu đề!') });

    const resetForm = () => {
        setForm(initialForm);
        setImagePreviews([]);
        setErrors({});
        apiPreviewCountRef.current = 0;
    };

    const onEdit = (record: Promotion) => {
        setForm({
            id: record.id,
            name: record.name || '',
            content: record.content || '',
            endDate: record.endDate || new Date().toISOString(),
            isActive: Boolean(record.isActive),
            images: [],
        });
        const previews: string[] = Array.isArray(record?.images)
            ? record.images
                .map((img: any) => (img?.key ? String(img.key) : null))
                .filter(Boolean)
                .map((key: any) => resolveImageUrl(`${key}`))
            : [];
        setImagePreviews(previews);
        apiPreviewCountRef.current = previews.length;
        setTitleModal('Cập nhật tin khuyến mãi');
        setShowModal(true);
    };

    const onRequestDelete = (record: Promotion) => {
        const label = record.name || `#${record.id}`;
        setConfirmDelete({ show: true, id: record.id, label });
    };

    const onToggleActive = async (record: Promotion) => {
        try {
            await updatePromotion({ id: record.id, body: { isActive: !record.isActive } }).unwrap();
            toast.success('Cập nhật thành công');
            refetch();
        } catch (_e) {
            // ignore
        }
    };

    const onDelete = async (id: any) => {
        try {
            await deletePromotion({ id }).unwrap();
            toast.success('Xóa thành công');
            refetch();
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const parsed = schema.safeParse({ name: form.name });
        if (!parsed.success) {
            const fieldErrors: any = {};
            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as 'name';
                if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});

        try {
            if (form.id) {
                await updatePromotion({
                    id: form.id,
                    body: {
                        name: form.name,
                        content: form.content,
                        slug: form.name,
                        endDate: form.endDate || new Date().toISOString(),
                    },
                }).unwrap();
                toast.success('Cập nhật thành công!');
            } else {
                const bodyFormData = new FormData();
                bodyFormData.append('name', form.name);
                bodyFormData.append('content', form.content);
                bodyFormData.append('endDate', form.endDate);
                bodyFormData.append('isActive', String(form.isActive));
                bodyFormData.append('slug', form.name);
                if (form.images && form.images.length > 0) {
                    form.images.forEach((file) => bodyFormData.append('images', file));
                }
                await createPromotion({ body: bodyFormData }).unwrap();
                toast.success('Thêm thành công!');
            }

            setShowModal(false);
            resetForm();
            refetch();
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const columns = useMemo(
        () => [
            { name: '#', selector: 'id', sortable: true },
            { name: 'Tiêu đề', selector: 'name', sortable: true },
            {
                name: 'Hình ảnh',
                selector: (row: Promotion) => row.images?.[0]?.key || '',
                cell: (row: Promotion) => {
                    const key = row.images?.[0]?.key;
                    const src = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;
                    return (
                        <img src={src} alt={row.name} width={80} height="auto" />
                    );
                },
            },
            {
                name: 'Nội dung',
                selector: 'content',
                grow: 3,
                cell: (row: Promotion) => (
                    <div
                        style={{ maxWidth: 400, overflow: 'hidden' }}
                        dangerouslySetInnerHTML={{ __html: formatSubstring(row.content || '') }}
                    />
                ),
            },
            {
                name: 'Ngày kết thúc',
                selector: 'endDate',
                sortable: true,
                right: true,
                cell: (row: Promotion) => <span>{fDate(row.endDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Hiển thị',
                selector: 'isActive',
                right: true,
                cell: (row: Promotion) => (
                    <Button
                        variant="link"
                        className="p-0"
                        onClick={() => onToggleActive(row)}
                        aria-label={row.isActive ? 'Ẩn' : 'Hiện'}
                    >
                        <img
                            src={row.isActive ? ImageAssets.icEye : ImageAssets.icNoEye}
                            alt={row.isActive ? 'active' : 'inactive'}
                            width={25}
                        />
                    </Button>
                ),
            },
            {
                name: 'Chức năng',
                selector: (row: Promotion) => row.id as any,
                cell: (row: Promotion) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-warning white mr-10"
                            onClick={() => onEdit(row)}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-danger white"
                            onClick={() => onRequestDelete(row)}
                        >
                            Xoá
                        </Button>
                    </>
                ),
            },
        ],
        []
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-10 mbt-10">
                <h1 className="m-0">Tin Khuyến mãi</h1>
                <div>
                    <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setShowModal(true);
                            setTitleModal('Thêm tin khuyến mãi');
                            resetForm();
                        }}
                    >
                        Thêm khuyến mãi
                    </Button>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
            <DataTable
                title=""
                columns={columns as any}
                data={promotions as any}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive
                dense
                customStyles={compactDataTableStyles}
            />

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                animation={false}
                backdrop="static"
            >
                <Form onSubmit={onSave} noValidate>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="news-form">
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <Form.Control
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={form.name}
                                name="name"
                                placeholder="Nhập tiêu đề"
                                onChange={(e) => {
                                    setForm((prev) => ({ ...prev, name: e.target.value }));
                                    setErrors((prev) => ({ ...prev, name: undefined }));
                                }}
                            />
                            <div className={`invalid-feedback ${errors.name ? 'd-block' : ''}`}>
                                {errors.name}
                            </div>
                        </div>
                        <Form.Group controlId="promotion-images" className="form-group">
                            <Form.Label>Hình ảnh (hình đầu tiên sẽ là mặc định)</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const filesList = (e.target as HTMLInputElement).files;
                                    const files = filesList ? Array.from(filesList) : [];
                                    if (!files.length) return;
                                    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
                                    const previews = files.map((file: any) => URL.createObjectURL(file));
                                    setImagePreviews((prev) => [...prev, ...previews]);
                                }}
                            />
                        </Form.Group>
                        {imagePreviews && imagePreviews.length > 0 ? (
                            <div className="mbt-10 show_image">
                                <div className="container testimonial-group">
                                    <div className="row text-center">
                                        <div className="col-xs-4">
                                            {imagePreviews.map((url: string, idx: number) => (
                                                <div
                                                    key={`${url}-${idx}`}
                                                    style={{
                                                        position: 'relative',
                                                        display: 'inline-block',
                                                        marginRight: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <img src={url} width="100" height="auto" alt="preview" />
                                                    <Button
                                                        variant="link"
                                                        className="p-0"
                                                        aria-label="Remove image"
                                                        onClick={() => {
                                                            try {
                                                                URL.revokeObjectURL(url);
                                                            } catch (e) {
                                                                console.log(e);
                                                            }
                                                            setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
                                                            setForm((prev) => {
                                                                const apiCount = apiPreviewCountRef.current;
                                                                if (idx < apiCount) {
                                                                    apiPreviewCountRef.current = Math.max(0, apiCount - 1);
                                                                    return prev;
                                                                }
                                                                const fileIndex = idx - apiCount;
                                                                return {
                                                                    ...prev,
                                                                    images: prev.images.filter((_, i) => i !== fileIndex),
                                                                };
                                                            });
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: -6,
                                                            right: -6,
                                                            border: 'none',
                                                            background: 'transparent',
                                                            padding: 0,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <img src={ImageAssets.ic_clear} alt="clear" width={18} height={18} />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: 10 }} />
                        )}

                        {/* <div className="form-group">
                            <label>Ngày kết thúc chương trình</label>
                            <Form.Control
                                type="date"
                                value={form.endDate ? new Date(form.endDate).toISOString().slice(0, 10) : ''}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        endDate: e.target.value ? new Date(e.target.value).toISOString() : '',
                                    }))
                                }
                            />
                        </div> */}
                        <div className="form-group">
                            <label>Mô tả</label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={form.content}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, content: e.target.value }))
                                }
                                placeholder="Nhập nội dung mô tả (hỗ trợ HTML nếu cần)"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Đóng
                        </Button>
                        <Button type="submit">Lưu</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal
                show={confirmDelete.show}
                onHide={() => setConfirmDelete({ show: false, id: null, label: '' })}
                centered
                animation={false}
                backdrop="static"
            >
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xoá tin khuyến mãi &quot;{confirmDelete.label}&quot; không?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => setConfirmDelete({ show: false, id: null, label: '' })}
                    >
                        Huỷ
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={async () => {
                            if (!confirmDelete.id) return;
                            await onDelete(confirmDelete.id);
                            setConfirmDelete({ show: false, id: null, label: '' });
                        }}
                    >
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewsView;
