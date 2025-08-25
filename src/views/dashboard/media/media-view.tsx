import { CONFIG } from '@/config-global';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

function MediaComponent(): React.ReactNode {
    const [media, setMedia] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [value, setValue] = useState('');
    const [id, setId] = useState<string | null>(null);

    const getDataMedia = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/settings`)
            .then((res) => {
                setMedia(res.data);
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            });
    }, []);

    useEffect(() => {
        getDataMedia();
    }, [getDataMedia]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value);
    }, []);

    const onEdit = useCallback((editId: any) => {
        axios
            .get(`${CONFIG.serverUrl}/settings/${editId}`)
            .then((res) => {
                setId(editId);
                setShowModal(true);
                setTitleModal('Cập nhật danh mục');
                setValue(res.data.value);
            })
            .catch((_error) => toast.error('Có lỗi xảy ra'));
    }, []);

    const onDelete = useCallback(
        (deleteId: any) => {
            axios
                .delete(`${CONFIG.serverUrl}/categories/${deleteId}`)
                .then((_) => {
                    toast.success('Xóa thành công');
                    getDataMedia();
                })
                .catch((error) => {
                    toast.error(`${error}`);
                });
        },
        [getDataMedia]
    );

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (value === '') {
                toast.warning('Vui lòng điền thông tin!');
                return;
            }

            if (id) {
                axios
                    .put(`${CONFIG.serverUrl}/settings/${id}`, {
                        value: value,
                    })
                    .then((_res) => {
                        setShowModal(false);
                        setValue('');
                        setId(null);
                        toast.success('Cập nhật thành công!');
                        getDataMedia();
                    })
                    .catch((_error) => toast.error('Có lỗi xảy ra'));
            }
        },
        [id, value, getDataMedia]
    );

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row: any) => row.id,
                sortable: true,
            },
            {
                name: 'Media',
                selector: (row: any) => row.value,
                sortable: true,
            },
            {
                name: 'Hành động',
                selector: (data: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-success white mr-10"
                            onClick={() => onEdit(data.id)}
                        >
                            Cập nhật
                        </Button>
                    </>
                ),
            },
        ],
        [onEdit]
    );

    return (
        <>
            <h1 className="mt-10"> Link youtube</h1>
            <ToastContainer autoClose={3000} />

            <DataTable
                title="Youtube"
                columns={columns as any}
                data={media}
                defaultSortFieldId="title"
                pagination
                responsive={true}
            />
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <form onSubmit={onSave}>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label> Link youtube </label>
                        <input
                            className="form-control"
                            name="value"
                            value={value}
                            onChange={onChange}
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
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default MediaComponent;
