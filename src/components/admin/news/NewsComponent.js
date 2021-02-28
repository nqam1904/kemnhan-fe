import React, { Component } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { history } from "../../../configureStore";
import CKEditor from 'ckeditor4-react';
import DatePicker from 'reactstrap-date-picker';
class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      endDate: "",
      images: [],
      isActive: false,
      showModal: false,
      titleModal: "Thêm tin khuyến mãi",
      id: "",
      media: [],
      selectImage: [],
      imageName: "",
      value: new Date().toISOString(),
    }
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
  uploadMultipleFiles = (e) => {
    if (e.target.files) {
      this.fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      this.setState({

        media: e.target.files,
      }, () => {
        console.log(this.state.media, "state")
      });
    }

  };
  handleChangeDate(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    })
  }
  onSave = (e) => {
    e.preventDefault();
    const { id, name, content, endDate, imageName, } = this.state;
    if (id) { }
  }
  render() {
    if (!localStorage.getItem('token') && !localStorage.getItem('userData')) {
      return history.push("/login")
    }
    const { showModal, titleModal, name, content, isActive, imageName } = this.state;
    return (
      <>
        <h1 className="mt-10">Tin tức khuyến mãi</h1>
        <ToastContainer autoClose={3000} />
        <div className="text-right">
          <Button type="button" variant="primary" className="mbt-10"
            onClick={() => {
              this.setState({ showModal: true })
            }}

          >Thêm khuyến mãi</Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Hình ảnh</th>
              <th>Nội dung</th>
              <th>Ngày kết thúc chương trình</th>
              <th>Hiện thị</th>
              <th>Hành động</th>
            </tr>
          </thead>
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
                  name={name}
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
              ) : ""}
              <label>Ngày kết thúc chương trình</label>
              <DatePicker id="example-datepicker"
                value={this.state.value}
                onChange={(v, f) => this.handleChangeDate(v, f)} />
              <label>Mô tả</label>
              <CKEditor
                data={content}
              />
            </Modal.Body>
          </Form>
        </Modal>
      </>
    )
  }
}

export default NewsComponent;
