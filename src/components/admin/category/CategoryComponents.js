import axios from "axios";
import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/setting";
import ItemCategory from "./ItemCategory";
import DataTable from "react-data-table-component";

class CategoryComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      showModal: false,
      titleModal: "",
      name: "",
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
      name: "Tên danh mục",
      selector: "name",
      sortable: true,

    }, {
      name: "Hành động",
      selector: (data, b) =>
        <>
          <Button type="button" className="btn btn-warning white mr-10" onClick={() => this.onEdit(data.id)}>Sửa</Button>
          <Button type="button" className="btn btn-danger white" onClick={() => this.onDelete(data.id)}>Xoá</Button>
        </>,

    }

  ];
  async componentDidMount() {
    await this.getDataCategory();
  }

  getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({
          categorys: res.data,
        });
      })
      .catch((err) => { toast.error('Có lỗi xảy ra') });
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

  showCategory(categorys) {
    var result = null;
    if (categorys.length > 0) {
      ;
      result = categorys.map((item, index) => {
        return <ItemCategory
          key={index}
          index={index}
          id={item.id}
          name={item.name}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />;
      });
    }
    return result;
  }
  onEdit = (id) => {
    axios.get(`${API_URL}/categories/${id}`)
      .then(res => {
        this.setState({
          id: id,
          showModal: true,
          titleModal: 'Cập nhật danh mục',
          name: res.data.name
        });
      }).catch(error => toast.error('Có lỗi xảy ra'));
  }
  onDelete = (id) => {
    axios.delete(`${API_URL}/categories/${id}`)
      .then(res => {
        if (window.confirm(`Bạn có muốn xóa danh mục này không ? `)) {
          toast.success('Xóa thành công')
          this.getDataCategory();
        }

      }).catch(error => {
        toast.error(`${error}`)
      });


  }
  onSave = (e) => {
    e.preventDefault();
    const { name, id } = this.state;
    if (name === "") {
      toast.warning('Vui lòng điền thông tin!');
      return;

    }
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    if (id) {
      axios.put(`${API_URL}/categories/${id}`, {
        name: name,
      }).then(res => {
        this.setState({ showModal: !this.state.showModal, name: "", id: null }, () => {
          toast.success('Cập nhật thành công!');
          this.getDataCategory();
        })

      }).catch(error => toast.error('Có lỗi xảy ra'))
    } else {
      try {
        axios.post(`${API_URL}/categories`, bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(res => {


          this.setState({
            showModal: !this.state.showModal,
            name: ""
          }, () => {
            toast.success('Thêm thành công!');
            this.getDataCategory()
          })
        }).catch(error => toast.error('Có lỗi xảy ra'))
      } catch (error) {
        toast.error(`${error}`);
      }
    }

  }
  render() {
    const { showModal, titleModal, name, categorys } = this.state;
    return (
      <>
        <h1 className="mt-10"> Danh mục sản phẩm </h1>
        <ToastContainer autoClose={3000} />
        <div className="text-right">
          <Button
            type="button"
            className="btn btn-primary mbt-10"
            onClick={() => {
              this.setState({
                showModal: true,
                titleModal: "Thêm danh mục",
                name: ""
              });
            }}
          >
            Thêm danh mục
          </Button>
        </div>
        <DataTable
          title="Category"
          columns={this.columns}
          data={categorys}
          defaultSortField="title"
          pagination
          responsive={true}

        />
        {/* <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> # </th> <th> Tên danh mục </th> <th> Hành động </th>
            </tr>
          </thead>
          <tbody> {this.showCategory(categorys)} </tbody>
        </Table> */}
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
              <label> Tên danh mục </label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
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

export default CategoryComponents;
