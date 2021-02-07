import React, { Component } from 'react';
import DataTable from "react-data-table-component";
import { Button, Modal, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/setting";
import axios from "axios";
class CustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      showModal: false,
      titleModal: "",
      id: "",
    }
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default CustomerComponent;