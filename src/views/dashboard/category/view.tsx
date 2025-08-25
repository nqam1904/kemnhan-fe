import { CONFIG } from '@/config-global';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

const CategoryComponents: React.FC = () => {
    const [categorys, setCategorys] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');

    const getDataCategory = useCallback(() => {
        axios
            .get(`${CONFIG.domain}/categories`)
            .then((res) => {
                setCategorys(res.data || []);
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            });
    }, []);

    useEffect(() => {
        getDataCategory();
    }, [getDataCategory]);

    const onEdit = useCallback((categoryId: any) => {
        axios
            .get(`${CONFIG.domain}/categories/${categoryId}`)
            .then((res) => {
                setId(categoryId);
                setShowModal(true);
                setTitleModal('Cập nhật danh mục');
                setName(res.data?.name || '');
            })
            .catch((_error) => toast.error('Có lỗi xảy ra'));
    }, []);

    const onDelete = useCallback(
        (categoryId: any) => {
            axios
                .delete(`${CONFIG.domain}/categories/${categoryId}`)
                .then((_res) => {
                    toast.success('Xóa thành công');
                    getDataCategory();
                })
                .catch((_error) => {
                    toast.error('Có lỗi xảy ra');
                });
        },
        [getDataCategory]
    );

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (name === '') {
                toast.warning('Vui lòng điền thông tin!');
                return;
            }
            const bodyFormData = new FormData();
            bodyFormData.append('name', name);
            if (id) {
                axios
                    .put(`${CONFIG.domain}/categories/${id}`, {
                        name: name,
                    })
                    .then((_) => {
                        setShowModal(false);
                        setName('');
                        setId('');
                        toast.success('Cập nhật thành công!');
                        getDataCategory();
                    })
                    .catch((_) => toast.error('Có lỗi xảy ra'));
            } else {
                try {
                    axios
                        .post(`${CONFIG.domain}/categories`, bodyFormData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then((_res) => {
                            setShowModal(false);
                            setName('');
                            toast.success('Thêm thành công!');
                            getDataCategory();
                        })
                        .catch((_error) => toast.error('Có lỗi xảy ra'));
                } catch (error) {
                    toast.error(`${error}`);
                }
            }
        },
        [getDataCategory, id, name]
    );

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Tên danh mục',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Hành động',
                selector: (data: any, _b: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-warning white mr-10"
                            onClick={() => onEdit(data.id)}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-danger white"
                            onClick={() => onDelete(data.id)}
                        >
                            Xoá
                        </Button>
                    </>
                ),
            },
        ],
        [onDelete, onEdit]
    );

    return (
        <>
            <h1 className="mt-10"> Danh mục sản phẩm </h1>
            <ToastContainer autoClose={3000} />
            <div className="text-right">
                <Button
                    type="button"
                    className="btn btn-primary mbt-10"
                    onClick={() => {
                        setShowModal(true);
                        setTitleModal('Thêm danh mục');
                        setName('');
                    }}
                >
                    Thêm danh mục
                </Button>
            </div>
            <DataTable
                title="Category"
                columns={columns}
                data={categorys}
                defaultSortFieldId="title"
                pagination
                responsive={true}
            />
            {/* <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> # </th> <th> Tên danh mục </th> <th> Hành động </th>
            </tr>
          </thead>
          <tbody> {showCategory(categorys)} </tbody>
        </Table> */}
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
                        <label> Tên danh mục </label>
                        <input
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                                setName('');
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
};

export default CategoryComponents;
