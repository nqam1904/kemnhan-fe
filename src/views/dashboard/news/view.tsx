import ImageAssets from '@/constants/ImagesAsset';
import {
    useCreatePromotionMutation,
    useDeletePromotionMutation,
    useGetPromotionsQuery,
    useUpdatePromotionMutation,
} from '@/store/apis/promotions';
import type { Promotion } from '@/store/types/promotion';
import { formatSubstring } from '@/utils/format-string';
import { fDate } from '@/utils/format-time';
import resolveImageUrl from '@/utils/image-url';
import React, { useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'reactstrap-date-picker';

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

    const resetForm = () => {
        setForm(initialForm);
        setImagePreviews([]);
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
        if (!form.name.trim()) {
            toast.warning('Vui lòng điền thông tin!');
            return;
        }

        try {
            if (form.id) {
                await updatePromotion({
                    id: form.id,
                    body: {
                        name: form.name,
                        content: form.content,
                        slug: form.name,
                        endDate: form.endDate,
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
                    const src = key ? resolveImageUrl(`static/${key}`) : ImageAssets.logo;
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
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => onToggleActive(row)}
                        aria-label={row.isActive ? 'Ẩn' : 'Hiện'}
                    >
                        <img
                            src={row.isActive ? ImageAssets.icEye : ImageAssets.icNoEye}
                            alt={row.isActive ? 'active' : 'inactive'}
                            width={25}
                        />
                    </button>
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
            <h1 className="mt-10">Tin tức khuyến mãi</h1>
            <ToastContainer autoClose={3000} />
            <div className="text-right">
                <Button
                    type="button"
                    className="btn btn-primary mbt-10"
                    onClick={() => {
                        setShowModal(true);
                        setTitleModal('Thêm tin khuyến mãi');
                        resetForm();
                    }}
                >
                    Thêm khuyến mãi
                </Button>
            </div>
            <DataTable
                title="Khuyến mãi"
                columns={columns as any}
                data={promotions as any}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive={true}
            />

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <Form onSubmit={onSave}>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                className="form-control"
                                value={form.name}
                                name="name"
                                placeholder="Nhập tiêu đề"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setForm((prev) => ({ ...prev, name: e.target.value }))
                                }
                            />
                        </div>
                        <label>Hình ảnh</label>
                        <Form.File
                            id="custom-file-translate-scss"
                            label="Hình ảnh đầu tiên sẽ là hình mặc định"
                            lang="en"
                            custom
                            type="file"
                            multiple
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const filesList = e.target.files;
                                const files = filesList ? Array.from(filesList) : [];
                                setForm((prev) => ({ ...prev, images: files }));
                                const previews = files.map((file: any) => URL.createObjectURL(file));
                                setImagePreviews(previews);
                            }}
                        />
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
                                                    <button
                                                        type="button"
                                                        aria-label="Remove image"
                                                        onClick={() => {
                                                            try {
                                                                URL.revokeObjectURL(url);
                                                            } catch (e) { }
                                                            setImagePreviews((prev) =>
                                                                prev.filter((_, i) => i !== idx)
                                                            );
                                                            setForm((prev) => ({
                                                                ...prev,
                                                                images: prev.images.filter((_, i) => i !== idx),
                                                            }));
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
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: 10 }}></div>
                        )}

                        <label>Ngày kết thúc chương trình</label>
                        <DatePicker
                            id="example-datepicker"
                            value={form.endDate}
                            onChange={(value: string) =>
                                setForm((prev) => ({ ...prev, endDate: value }))
                            }
                        />
                        <br />
                        <label>Mô tả</label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            value={form.content}
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setForm((prev) => ({ ...prev, content: e.target.value }))
                            }
                            placeholder="Nhập nội dung mô tả (hỗ trợ HTML nếu cần)"
                        />
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
            >
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xoá tin khuyến mãi "{confirmDelete.label}" không?
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
