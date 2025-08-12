import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL } from '../../../config/setting';
import ItemAccount from './ItemAccount';
import DataTable from 'react-data-table-component';
import { isValidEmailAddress, validateInput } from '../../../utils/Function';
import { history } from '../../../configureStore';
const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'staff' },
];

class AccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: '',
            showModal: false,
            titleModal: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            email: '',
            role: '',
            isSetRole: '',
            loading: true,
        };
    }
    columns = [
        {
            name: '#',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Họ',
            selector: 'firstName',
            sortable: true,
        },
        {
            name: 'Tên',
            selector: 'lastName',
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: 'phone',
            sortable: true,
            right: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            right: true,
        },
        {
            name: 'Chức vụ ',
            selector: 'role',
            sortable: true,
            right: true,
        },
        {
            name: 'Ngày tạo',
            selector: 'createDate',
            sortable: true,
            right: true,
        },
        {
            name: 'Ngày chỉnh sửa',
            selector: 'writeDate',
            sortable: true,
            right: true,
        },
        {
            name: 'Hành động',
            selector: (data) => (
                <>
                    <Button type="button" className="btn btn-warning white mr-10" onClick={() => this.onEdit(data.id)}>
                        Sửa
                    </Button>
                    <Button type="button" className="btn btn-danger white" onClick={() => this.onDelete(data.id)}>
                        Xoá
                    </Button>
                </>
            ),
        },
    ];
    async componentDidMount() {
        await this.getDataAccount();
    }
    getDataAccount() {
        axios
            .get(`${API_URL}/users`)
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            })
            .catch((_) => {
                toast.error('Có lỗi xảy ra');
            });
    }
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
            .get(`${API_URL}/users/${id}`)
            .then((res) => {
                this.setState({
                    id: id,
                    showModal: true,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    phone: res.data.phone,
                    password: res.data.password,
                    email: res.data.email,
                    isSetRole: res.data.role,
                    titleModal: 'Cập nhật tài khoản',
                });
            })
            .catch((_) => {});
    };
    onDelete = (id) => {
        axios
            .delete(`${API_URL}/users/${id}`)
            .then((_) => {
                toast.success('Xóa thành công');
                this.getDataAccount();
            })
            .catch((error) => {
                toast.error(`${error}`);
            });
    };
    showAccount(users) {
        var result = null;
        if (users.length > 0) {
            result = users.map((item, index) => {
                return (
                    <ItemAccount
                        key={index}
                        index={index}
                        id={item.id}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        phone={item.phone}
                        email={item.email}
                        role={item.role}
                        createDate={item.createDate}
                        writeDate={item.writeDate}
                        onDelete={this.onDelete}
                        onEdit={this.onEdit}
                    />
                );
            });
        }
        return result;
    }
    onSave = (e) => {
        e.preventDefault();
        const {
            id,
            firstName,
            lastName,
            phone,
            password,
            email,
            isSetRole,
            // isActive,
        } = this.state;
        if (firstName === '' || lastName === '' || phone === '' || password === '' || email === '' || isSetRole === '') {
            toast.warning('Vui lòng điền đủ thông tin!');
            return;
        } else if (!isValidEmailAddress(email)) {
            toast.error('Nhập đúng định dạng email!');
            return;
        } else if (!validateInput(phone)) {
            toast.error('Số điện thoại phải có 10-11 chữ số');
            return;
        }
        if (id) {
            axios
                .put(`${API_URL}/users/${id}`, {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    password: password,
                    email: email,
                    role: isSetRole,
                })
                .then((_) => {
                    this.setState({
                        showModal: !this.state.showModal,
                        firstName: '',
                        lastName: '',
                        phone: '',
                        emai: '',
                    });
                    toast.success('Cập nhật thành công!');
                    this.getDataAccount();
                })
                .catch((_) => {
                    toast.error('Có lỗi xảy ra');
                });
        } else {
            axios
                .post(`${API_URL}/users/${id}`, {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    password: password,
                    email: email,
                    role: isSetRole,
                })
                .then((_) => {
                    this.setState({
                        showModal: !this.state.showModal,
                        firstName: '',
                        lastName: '',
                        phone: '',
                        emai: '',
                    });
                    toast.success('Thêm thành công!');
                    this.getDataAccount();
                })
                .catch((_) => {
                    toast.error('Có lỗi xảy ra');
                });
        }
    };
    render() {
        const { users, firstName, lastName, phone, password, email, showModal, titleModal, isSetRole } = this.state;
        if (!localStorage.getItem('token') && !localStorage.getItem('userData')) {
            return history.push('/login');
        }
        return (
            <>
                <h1 className="mt-10"> Danh mục tài khoản </h1>
                <ToastContainer autoClose={3000} />

                <div className="text-right">
                    <Button
                        type="button"
                        className="btn btn-primary mbt-10"
                        onClick={() => {
                            this.setState({
                                showModal: true,
                                titleModal: 'Thêm tài khoản',
                                id: '',
                                firstName: '',
                                lastName: '',
                                phone: '',
                                password: '',
                                email: '',
                                isSetRole: '',
                            });
                        }}
                    >
                        Thêm tài khoản
                    </Button>
                </div>
                <DataTable title="Account" columns={this.columns} data={users} defaultSortField="title" pagination responsive={true} />
                {/* <table responsive="lg" id="example" className="table table-bordered">
          <thead>
            <tr>
              <th> # </th>
              <th> Họ tên </th>
              <th> Số điện thoại </th>
              <th> Email </th>
              <th> Chức vụ </th>
              <th> Ngày tạo </th>
              <th> Ngày chỉnh sửa </th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody> {this.showAccount(users)} </tbody>
        </table> */}

                <Modal
                    show={showModal}
                    size="lg"
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
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>
                                        {' '}
                                        Họ <sup className="sub_text">*</sup>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        placeholder="Nhập họ"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className=" form-group col-6">
                                    <label>
                                        {' '}
                                        Tên <sup className="sub_text">*</sup>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        placeholder="Nhập tên"
                                        value={lastName}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className=" form-group col-6">
                                    <label>
                                        {' '}
                                        Mật khẩu <sup className="sub_text">*</sup>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className=" form-group col-6">
                                    <label>
                                        {' '}
                                        Số điện thoại <sup className="sub_text">*</sup>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phone"
                                        placeholder="Nhập thông tin số thoại điện"
                                        value={phone}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className=" form-group col-6">
                                    <label>
                                        {' '}
                                        Email <sup className="sub_text">*</sup>{' '}
                                    </label>
                                    <input
                                        className="form-control"
                                        placeholder="Nhập thông tin email"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className=" form-group col-6">
                                    <label>
                                        Chức vụ <sup className="sub_text">*</sup>
                                    </label>
                                    <select
                                        className="form-control"
                                        size="as"
                                        as="select"
                                        onChange={this.onChange}
                                        value={isSetRole}
                                        name="isSetRole"
                                    >
                                        <option>---Chức vụ---</option>
                                        {roles.map((item, index) => {
                                            return (
                                                <option value={item.name} key={index}>
                                                    {' '}
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
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

export default AccountComponent;
