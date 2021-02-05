import axios from "axios";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/setting";
import ItemOrder from "./ItemOrder";

class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      id: "",
      showModal: false,
      titleModal: "",
    };
  }
  async componentDidMount() {
    await this.getDataOrder();
  }
  getDataOrder() {
    axios
      .get(`${API_URL}/orders`)
      .then((res) => {
        this.setState({
          orders: res.data,
        });
      })
      .catch((err) => {
        toast.danger("Có lỗi xảy ra");
      });
  }
  // onChange = (e) => {
  //     e.preventDefault();
  //     var target = e.target;
  //     var name = target.name;
  //     var value = target.value;
  //     this.setState({
  //         [name]: value,
  //     });
  // };
  onEdit = (id) => {};
  onDelete = (id) => {};
  showOder(orders) {
    var result = null;
    if (orders.length > 0) {
      console.log(orders);
      result = orders.map((item, index) => {
        return (
          <ItemOrder
            index={index}
            id={item.id}
            name={item.customer.firstName + " " + item.customer.lastName}
            note={item.note}
            amountTotal={item.amountTotal}
            createDate={item.createDate}
            phone={item.customer.phone}
            status={item.status}
          />
        );
      });
    }
    return result;
  }

  render() {
    const { orders } = this.state;
    return (
      <>
        <h1 className="mt-10"> Danh mục hoá đơn</h1>
        <ToastContainer autoClose={3000} />

        <Table striped bordered hover variant="dark" responsive="lg">
          <thead>
            <tr>
              <th> # </th>
              <th> Họ tên </th>
              <th> Số điện thoại </th>
              <th> Tổng tiền</th>
              <th> Ghi chú</th>
              <th> Ngày đặt </th>
              <th> Trạng thái </th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>{this.showOder(orders)}</tbody>
        </Table>
      </>
    );
  }
}

export default AccountComponent;
