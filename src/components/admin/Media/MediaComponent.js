import axios from "axios";
import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/setting";
import ItemMedia from "./ItemMedia";
import DataTable from "react-data-table-component";
class MediaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: [],
      showModal: false,
      titleModal: "",
      value: "",
      id: "",
    };
  }
  columns = [
    {
      name: "#",
      selector: "id",
      sortable: true
    },

    {
      name: "Media",
      selector: "value",
      sortable: true,

    }, {
      name: "Hành động",
      selector: (data, b) =>
        <>
          <Button type="button" className="btn btn-success white mr-10" onClick={() => this.onEdit(data.id)}>Cập nhật</Button>

        </>,

    }

  ];
  async componentDidMount() {
    await this.getDataMedia();
  }

  getDataMedia = () => {
    axios
      .get(`${API_URL}/settings`)
      .then((res) => {
        this.setState({
          media: res.data,
        });
      })
      .catch((err) => { toast.danger('Lỗi liên hệ với kỹ thuật để hỗ trợ bạn') });
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

  showMedia(media) {
    var result = null;
    if (media.length > 0) {
      ;
      result = media.map((item, index) => {
        return <ItemMedia
          key={index}
          index={index}
          id={item.id}
          value={item.value}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />;
      });
    }
    return result;
  }
  onEdit = (id) => {
    axios.get(`${API_URL}/settings/${id}`)
      .then(res => {
        this.setState({
          id: id,
          showModal: true,
          titleModal: 'Cập nhật danh mục',
          value: res.data.value
        });
      }).catch(error => toast.danger('Có lỗi xảy ra'));
  }
  onDelete = (id) => {
    axios.delete(`${API_URL}/categories/${id}`)
      .then(res => {
        toast.success('Xóa thành công')
        this.getDataMedia();

      }).catch(error => {
        toast.error(`${error}`)
      });
  }
  onSave = (e) => {
    e.preventDefault();
    const { value, id } = this.state;
    if (value === "") {
      toast.warning('Vui lòng điền thông tin!');
      return;

    }

    if (id) {
      axios.put(`${API_URL}/settings/${id}`, {
        value: value,
      }).then(res => {
        this.setState({ showModal: !this.state.showModal, value: "", id: null }, () => {
          toast.success('Cập nhật thành công!');
          this.getDataMedia();
        })

      }).catch(error => toast.danger('Có lỗi xảy ra'))
    }

  }
  render() {
    const { showModal, titleModal, value, media } = this.state;
    return (
      <>
        <h1 className="mt-10"> Link youtube</h1>
        <ToastContainer autoClose={3000} />

        {/* <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> # </th> <th> Đường dẫn youtube </th> <th> Hành động </th>
            </tr>
          </thead>
          <tbody> {this.showMedia(media)} </tbody>
        </Table> */}
        <DataTable
          title="Category"
          columns={this.columns}
          data={media}
          defaultSortField="title"
          pagination
          responsive={true}

        />
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
              <input
                className="form-control"
                type="text"
                name="value"
                value={value}
                onChange={this.onChange}
              />
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

export default MediaComponent;
