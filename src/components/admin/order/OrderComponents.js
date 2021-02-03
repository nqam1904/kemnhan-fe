import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal, Table } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import { API_URL } from "../../../config/setting";
 import ItemOrder from './ItemOrder'

class AccountComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            id: "",
            showModal: false,
            titleModal: "",
             

        }

    }
    async componentDidMount() {
        await this.getDataOrder();
    }
    getDataOrder() {
        axios.get(`${API_URL}/orders`)
            .then(res => {
                this.setState({
                    orders: res.data
                })
            })
            .catch(err => { toast.danger('Có lỗi xảy ra') })
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
    onEdit = (id) => {

         

         
    }
    onDelete = (id) => {
         
    }
    showOder(orders) {
        var result = null;
        if (orders.length > 0) {
            console.log(orders);
            result = orders.map((item, index) => {
                return <ItemOrder
                    index={index}
                    id={item.id}
                    // firstName={item.firstName}
                    // lastName={item.lastName}
                    // phone={item.phone}
                    // email={item.email}
                    // role={item.role}
                    // createDate={item.createDate}
                    // writeDate={item.writeDate}
                    // onDelete={this.onDelete}
                    // onEdit={this.onEdit}
                />;
            });
        }
        return result;
    }
  
    render() {
        const {  showModal, titleModal,orders } = this.state;
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
                            <th> Email </th>
                            <th> Ngày đặt </th>
                            <th>   </th>
                            <th>  </th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {this.showOder(orders)}
                    </tbody>
                </Table>
              </>
        );
    }
}

export default AccountComponent;