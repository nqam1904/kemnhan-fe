import { CONFIG } from '@/config-global';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'reactstrap-date-picker';
import ItemNews from './item-news';

const NewsComponent: React.FC = () => {
    const [fileArray, setFileArray] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const [isActive, setIsActive] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('Thêm tin khuyến mãi');
    const [id, setId] = useState<string>('');
    const [media, setMedia] = useState<FileList | File[]>([]);
    const [imageName, setImageName] = useState<string>('');

    const getDataPromotion = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/promotions`)
            .then((res) => {
                setData(res.data || []);
            })
            .catch((_err) => {});
    }, []);

    useEffect(() => {
        getDataPromotion();
    }, [getDataPromotion]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'name') setName(value);
    }, []);

    const onEditorChange = useCallback((evt: any) => {
        setContent(evt.editor.getData());
    }, []);

    const uploadMultipleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const previews = Array.from(e.target.files).map((file: any) =>
                URL.createObjectURL(file)
            );
            setFileArray(previews);
            setMedia(e.target.files);
        }
    }, []);

    const handleChangeDate = useCallback((value: string, _formattedValue: string) => {
        setEndDate(value);
    }, []);

    const onUpdate = useCallback((promotionId: any) => {
        axios
            .get(`${CONFIG.serverUrl}/promotions/${promotionId}`)
            .then((res) => {
                setShowModal(true);
                setTitleModal('Cập nhật tin khuyến mãi');
                setId(promotionId);
                setName(res.data.name || '');
                setContent(res.data.content || '');
                setEndDate(res.data.endDate || new Date().toISOString());
                setImageName(res.data.images?.[0]?.key || '');
                setIsActive(Boolean(res.data.isActive));
            })
            .catch((error) => {
                toast.error(`${error}`);
            });
    }, []);

    const onDelete = useCallback(
        (promotionId: any) => {
            axios
                .delete(`${CONFIG.serverUrl}/promotions/${promotionId}`)
                .then((_) => {
                    toast.success('Xóa thành công');
                    getDataPromotion();
                })
                .catch((error) => {
                    toast.error(`${error}`);
                });
        },
        [getDataPromotion]
    );

    const onActive = useCallback(
        (promotionId: any, currentActive: any) => {
            axios
                .put(`${CONFIG.serverUrl}/promotions/${promotionId}`, {
                    isActive: !currentActive,
                })
                .then((_) => {
                    toast.success('Cập nhật thành công');
                    getDataPromotion();
                })
                .catch((_error) => {});
        },
        [getDataPromotion]
    );

    const showPromotion = useMemo(() => {
        if (!data || data.length === 0) return null;
        return data.map((item: any, index: any) => (
            <ItemNews
                key={index}
                id={item.id}
                images={item.images[0]?.key}
                name={item.name}
                endDate={item.endDate}
                content={item.content}
                isActive={item.isActive}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onActive={() => onActive(item.id, item.isActive)}
            />
        ));
    }, [data, onActive, onDelete, onUpdate]);

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (name === '') {
                toast.warning('Vui lòng điền thông tin!');
                return;
            }
            const bodyFormData = new FormData();
            bodyFormData.append('name', name);
            bodyFormData.append('content', content);
            bodyFormData.append('endDate', endDate);
            bodyFormData.append('isActive', String(isActive));
            bodyFormData.append('slug', name);
            if (media && (media as FileList).length !== undefined) {
                Array.from(media as FileList).forEach((file) =>
                    bodyFormData.append('images', file)
                );
            }
            if (id) {
                axios
                    .put(`${CONFIG.serverUrl}/promotions/${id}`, {
                        name,
                        content,
                        slug: name,
                        endDate,
                    })
                    .then((_) => {
                        setShowModal(false);
                        setName('');
                        setContent('');
                        setId('');
                        toast.success('Cập nhật thành công!');
                        getDataPromotion();
                    })
                    .catch((_) => toast.error('Có lỗi xảy ra'));
            } else {
                axios
                    .post(`${CONFIG.serverUrl}/promotions`, bodyFormData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    })
                    .then((_) => {
                        setShowModal(false);
                        setName('');
                        setContent('');
                        setEndDate(new Date().toISOString());
                        setMedia([]);
                        setFileArray([]);
                        toast.success('Thêm thành công!');
                        getDataPromotion();
                    })
                    .catch((_) => {});
            }
        },
        [content, endDate, getDataPromotion, id, isActive, media, name]
    );

    return (
        <>
            <h1 className="mt-10">Tin tức khuyến mãi</h1>
            <ToastContainer autoClose={3000} />
            <div className="text-right">
                <Button
                    type="button"
                    variant="primary"
                    className="mbt-10"
                    onClick={() => {
                        setShowModal(true);
                        setTitleModal('Thêm tin khuyến mãi');
                        setName('');
                        setContent('');
                        setEndDate(new Date().toISOString());
                        setId('');
                        setMedia([]);
                        setFileArray([]);
                    }}
                >
                    Thêm khuyến mãi
                </Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Hình ảnh</th>
                        <th>Nội dung</th>
                        <th>Ngày kết thúc</th>
                        <th>Hiện thị</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>{showPromotion}</tbody>
            </Table>
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
                                value={name}
                                name="name"
                                placeholder="Nhập tiêu đề"
                                onChange={onChange}
                            />
                        </div>
                        <label>Hình ảnh</label>
                        <Form.File
                            id="custom-file-translate-scss"
                            label="Hình ảnh đầu tiên sẽ là hình mặc định"
                            lang="en"
                            custom
                            type="file"
                            onChange={uploadMultipleFiles}
                        />
                        {fileArray && fileArray.length > 0 ? (
                            <div className="mbt-10 show_image">
                                <div className="container testimonial-group">
                                    <div className="row text-center">
                                        <div className="col-xs-4">
                                            {fileArray.map((url: string) => (
                                                <img
                                                    src={url}
                                                    width="100"
                                                    height="auto"
                                                    alt={imageName}
                                                />
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
                            value={endDate}
                            onChange={handleChangeDate}
                        />
                        <br />
                        <label>Mô tả</label>
                        <div>
                            <CKEditor data={content} onChange={onEditorChange} />
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
        </>
    );
};

export default NewsComponent;
