import React, { Component } from 'react';
import DataTable from "react-data-table-component";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL } from "../../../config/setting";
import axios from "axios";
import { history } from '../../../configureStore';

class CustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      showModal: false,
      titleModal: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      id: "",
    }
  }
  columns = [
    {
      name: "#",
      selector: "id",
      sortable: true
    },
    {
      name: "Họ",
      selector: "firstName",
      sortable: true
    },
    {
      name: "Tên",
      selector: "lastName",
      sortable: true
    },
    {
      name: "Số điện thoại",
      selector: "phone",
      sortable: true,
      right: true
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      right: true
    },
    {
      name: "Ngày mua hàng",
      selector: "createDate",
      sortable: true,
      right: true
    },
    {
      name: "Ngày chỉnh sửa",
      selector: "writeDate",
      sortable: true,
      right: true,
    }, {
      name: "Hành động",
      selector: (data, b) =>
        <>
          <Button type="button" className="btn btn-primary white mr-10" onClick={() => this.onEdit(data.id)}>Xem chi tiết </Button>
        </>,

    }

  ];
  async componentDidMount() {

    await this.getDataAccount();
  }
  onEdit = (id) => {
    axios
      .get(`${API_URL}/customers/${id}`)
      .then((res) => {
        this.setState({
          id: id,
          showModal: true,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email,
          address: res.data.address,
          createDate: res.data.createDate,
          titleModal: "Thông tin khách hàng",
        });
      })
      .catch((_) => { });
  };

  getDataAccount() {
    axios
      .get(`${API_URL}/customers`)
      .then((res) => {
        this.setState({
          customers: res.data,
        });
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  }
  render() {
    const {
      customers,
      firstName,
      lastName,
      phone,
      email,
      showModal,
      createDate,
      titleModal,
      address
    } = this.state;
    if (!localStorage.getItem('token') && !localStorage.getItem('userData')) {
      return history.push("/login")
    }
    return (
      <>
        <h1 className="mt-10"> Danh mục khách hàng </h1>
        <DataTable
          title="Khách hàng"
          columns={this.columns}
          data={customers}
          defaultSortField="title"
          pagination
          responsive={true}

        />

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
                    {" "}
                    Họ <sup className="sub_text">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={firstName}
                    disabled
                    onChange={this.onChange}
                  />
                </div>
                <div className=" form-group col-6">
                  <label>
                    {" "}
                    Tên <sup className="sub_text">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    disabled
                    value={lastName}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">

                <div className=" form-group col-6">
                  <label>
                    {" "}
                    Số điện thoại <sup className="sub_text">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="phone"
                    disabled
                    value={phone}
                    onChange={this.onChange}
                  />
                </div>
                <div className=" form-group col-6">
                  <label>
                    {" "}
                    Email <sup className="sub_text">*</sup>{" "}
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className=" form-group col-6">
                  <label>
                    {" "}
                    Địa chỉ
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    name="address"
                    value={address}
                    onChange={this.onChange}
                  />
                </div>
                <div className=" form-group col-6">
                  <label>
                    {" "}
                    Ngày mua hàng
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    name="createDate"
                    value={createDate}
                    onChange={this.onChange}
                  />
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  this.setState({ showModal: false, name: "" });
                }}
              >
                Đóng
              </Button>

            </Modal.Footer>
          </form>
        </Modal>

      </>
    );
  }
}

export default CustomerComponent;