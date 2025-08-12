import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL } from '../../../config/setting';
class SettingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: [],
            showModal: false,
            titleModal: '',
            value: '',
            id: '',
        };
    }
    columns = [
        {
            name: '#',
            selector: 'id',
            sortable: true,
        },

        {
            name: 'Thông báo',
            selector: 'value',
            sortable: true,
        },
        // {
        //   name: "Hành động",
        //   selector: (data, b) =>
        //     <>
        //       <Button type="button" className="btn btn-success white mr-10" onClick={() => this.onEdit(data.id)}>Cập nhật</Button>

        //     </>,

        // }
    ];
    async componentDidMount() {
        await this.getDataMedia();
    }

    getDataMedia = () => {
        axios
            .get(`${API_URL}/settings`)
            .then((res) => {
                this.setState({
                    settings: res.data,
                });
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            });
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

    onEdit = (id) => {
        axios
            .get(`${API_URL}/settings/${id}`)
            .then((res) => {
                this.setState({
                    id: id,
                    showModal: true,
                    titleModal: 'Cập nhật danh mục',
                    value: res.data.value,
                });
            })
            .catch((_error) => toast.error('Có lỗi xảy ra'));
    };
    onDelete = (id) => {
        axios
            .delete(`${API_URL}/categories/${id}`)
            .then((_res) => {
                toast.success('Xóa thành công');
                this.getDataMedia();
            })
            .catch((_error) => {
                toast.error('Có lỗi xảy ra');
            });
    };
    onSave = (e) => {
        e.preventDefault();
        const { value, id } = this.state;
        if (value === '') {
            toast.warning('Vui lòng điền thông tin!');
            return;
        }

        if (id) {
            axios
                .put(`${API_URL}/settings/${id}`, {
                    value: value,
                })
                .then((_res) => {
                    this.setState({ showModal: !this.state.showModal, value: '', id: null }, () => {
                        toast.success('Cập nhật thành công!');
                        this.getDataMedia();
                    });
                })
                .catch((_error) => toast.error('Có lỗi xảy ra'));
        }
    };
    render() {
        const { showModal, titleModal, value, settings } = this.state;
        return (
            <>
                <h1 className="mt-10"> Cài đặt thông báo</h1>
                <ToastContainer autoClose={3000} />

                {/* <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> # </th> <th> Đường dẫn youtube </th> <th> Hành động </th>
            </tr>
          </thead>
          <tbody> {this.showMedia(media)} </tbody>
        </Table> */}
                <DataTable title="Thông báo" columns={this.columns} data={settings} defaultSortField="title" pagination responsive={true} />
                <Modal
                    show={showModal}
                    onHide={() => {
                        this.setState({
                            showModal: false,
                        });
                    }}
                >
                    <form onSubmit={this.onSave}>
                        <Modal.Header closeButton>
                            <Modal.Title> {titleModal} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label> Link youtube </label>
                            <input className="form-control" type="text" name="value" value={value} onChange={this.onChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    this.setState({ showModal: false, name: '' });
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
}

export default SettingComponent;
