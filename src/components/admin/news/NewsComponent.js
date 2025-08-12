import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'reactstrap-date-picker';
import { API_URL } from '../../../config/setting';
import { history } from '../../../configureStore';
import ItemNews from './ItemNews';
class NewsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            content: '',
            endDate: new Date().toISOString(),
            images: [],
            isActive: false,
            showModal: false,
            titleModal: 'Thêm tin khuyến mãi',
            id: '',
            media: [],
            selectImage: [],
            imageName: '',
            value: new Date().toISOString(),
            formattedValue: '',
        };
    }

    componentDidMount() {
        this.getDataPromotion();
    }
    getDataPromotion = () => {
        axios
            .get(`${API_URL}/promotions`)
            .then((res) => {
                this.setState({
                    data: res.data,
                });
            })
            .catch((_err) => {});
    };
    onChange = (e) => {
        e.preventDefault();
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        });
    };
    onChangeEditor = (changeEvent) => {
        this.setState({
            content: changeEvent.target.value,
        });
    };
    onEditorChange = (evt) => {
        this.setState({
            content: evt.editor.getData(),
        });
    };
    uploadMultipleFiles = (e) => {
        if (e.target.files) {
            this.fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            this.setState(
                {
                    media: e.target.files,
                },
                () => {}
            );
        }
    };
    handleChangeDate(value, formattedValue) {
        this.setState({
            endDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue, // Formatted String, ex: "11/19/2016"
        });
    }

    onUpdate = (id) => {
        axios
            .get(`${API_URL}/promotions/${id}`)
            .then((res) => {
                this.setState({
                    showModal: true,
                    titleModal: 'Cập nhật tin khuyến mãi',
                    id: id,
                    name: res.data.name,
                    content: res.data.content,
                    endDate: res.data.endDate,
                    media: res.data.images[0]?.key,
                    isActive: res.data.isActive,
                });
            })
            .catch((error) => {
                toast.error(`${error}`);
            });
    };
    onDelete = (id) => {
        axios
            .delete(`${API_URL}/promotions/${id}`)
            .then((_) => {
                toast.success('Xóa thành công');
                this.getDataPromotion();
            })
            .catch((error) => {
                toast.error(`${error}`);
            });
    };
    onActive = (id, isActive) => {
        axios
            .put(`${API_URL}/promotions/${id}`, {
                isActive: !isActive,
            })
            .then((_) => {
                toast.success('Cập nhật thành công');
                this.getDataPromotion();
            })
            .catch((_error) => {});
    };
    showPromotion = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((item, index) => {
                return (
                    <ItemNews
                        key={index}
                        index={index}
                        id={item.id}
                        images={item.images[0]?.key}
                        name={item.name}
                        endDate={item.endDate}
                        content={item.content}
                        isActive={item.isActive}
                        onDelete={this.onDelete}
                        onUpdate={this.onUpdate}
                        onActive={() => this.onActive(item.id, item.isActive)}
                    />
                );
            });
        }
        return result;
    };

    onSave = (e) => {
        e.preventDefault();
        const { id, name, content, endDate, media, isActive } = this.state;
        if (name === '') {
            toast.warning('Vui lòng điền thông tin!');
            return;
        }
        var bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('content', content);
        bodyFormData.append('endDate', endDate);
        bodyFormData.append('isActive', isActive);
        bodyFormData.append('slug', name);
        for (const file of media) {
            bodyFormData.append('images', file);
        }
        if (id) {
            axios
                .put(`${API_URL}/promotions/${id}`, {
                    name: name,
                    content: content,
                    slug: name,
                    endDate: endDate,
                })
                .then((_) => {
                    this.setState({ showModal: !this.state.showModal, name: '', id: null }, () => {
                        toast.success('Cập nhật thành công!');
                        this.getDataPromotion();
                    });
                })
                .catch((_) => toast.error('Có lỗi xảy ra'));
        } else {
            try {
                axios
                    .post(`${API_URL}/promotions`, bodyFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((_) => {
                        this.setState(
                            {
                                showModal: !this.state.showModal,
                                name: '',
                                content: '',
                                endDate: new Date().toISOString(),
                            },
                            () => {
                                toast.success('Thêm thành công!');
                                this.getDataPromotion();
                            }
                        );
                    })
                    .catch((_) => {});
            } catch (error) {}
        }
    };
    render() {
        if (!localStorage.getItem('token') && !localStorage.getItem('userData')) {
            return history.push('/login');
        }

        const { showModal, titleModal, name, content, data, endDate, imageName } = this.state;
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
                            this.setState({
                                showModal: true,
                                name: '',
                                content: '',
                                endDate: new Date().toISOString(),
                            });
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
                    <tbody>{this.showPromotion(data)}</tbody>
                </Table>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModal}
                    onHide={() => {
                        this.setState({
                            showModal: false,
                        });
                    }}
                >
                    <Form onSubmit={this.onSave}>
                        <Modal.Header closeButton>
                            <Modal.Title> {titleModal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <label>Tiêu đề</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    name="name"
                                    placeholder="Nhập tiêu đề"
                                    onChange={this.onChange}
                                />
                            </div>
                            <label>Hình ảnh</label>
                            <Form.File
                                id="custom-file-translate-scss"
                                label="Hình ảnh đầu tiên sẽ là hình mặc định"
                                lang="en"
                                custom
                                type="file"
                                // custom
                                onChange={this.uploadMultipleFiles}
                            />
                            {this.fileArray ? (
                                <div className="mbt-10 show_image">
                                    <div className="container testimonial-group">
                                        <div className="row text-center">
                                            <div className="col-xs-4">
                                                {(this.fileArray || []).map((url) => (
                                                    <img src={url} width="100" height="auto" alt={imageName} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginBottom: 10 }}></div>
                            )}

                            <label>Ngày kết thúc chương trình</label>
                            <DatePicker id="example-datepicker" value={endDate} onChange={(v, f) => this.handleChangeDate(v, f)} />
                            <br />
                            <label>Mô tả</label>
                            <div>
                                <CKEditor data={content} onChange={this.onEditorChange} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    this.setState({ showModal: false });
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
    }
}

export default NewsComponent;
