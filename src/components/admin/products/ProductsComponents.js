import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/setting";
import ItemProduct from "./ItemProduct";
import "./Product.css";
import { Spinner } from 'react-activity';

class ProductsComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showModal: false,
      titleModal: "",
      id: "",
      name: "",
      unit: "",
      description: "",
      displayPrice: 0,
      sellPrice: 0,
      soldQuantity: 0,
      stockQuantity: 0,
      isFeature: false,
      isActive: false,
      selectCategory: "",
      category: null,
      shopeeUrl: "",
      image: "",
      imageName: "",
      categoriesId: [],
      imagesId: [],
      media: [],
      selectImage: [],
      loading: false,
    };
    this.fileObj = [];
    this.fileArray = [];
  }

  async componentDidMount() {
    await this.getDateProduct();
    await this.getDataCategory();
  }
  getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({
          category: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
  getDateProduct = () => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
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
  onEdit = (id) => {
    axios.get(`${API_URL}/products/${id}`)
      .then(res => {
        this.setState({
          id: id,
          showModal: true,
          titleModal: 'Cập nhật sản phẩm',
          name: res.data.name,
          unit: res.data.unit,
          description: res.data.description,
          displayPrice: parseInt(res.data.displayPrice),
          sellPrice: parseInt(res.data.sellPrice),
          soldQuantity: parseInt(res.soldQuantity),
          stockQuantity: parseInt(res.data.stockQuantity),
          isFeature: res.data.isFeature,
          isActive: res.data.isActive,
          shopeeUrl: res.data.shopeeUrl,
          selectCategory: res.data.categories[0].name,
          imagesId: res.data.images[0]?.key,
        }, () => {
          console.log(res.data)
        });
      }).catch(error => console.log(error));
  }
  onDelete = (id) => {

    axios.delete(`${API_URL}/products/${id}`)
      .then(res => {

        toast.success('Xóa thành công')
        this.getDateProduct();
      }).catch(error => {
        toast.error(`${error}`)
      });
  }
  showProduct = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((item, index) => {
        return (
          <ItemProduct
            key={index}
            index={index}
            id={item.id}
            name={item.name}
            slug={item.slug}
            unit={item.unit}
            description={item.description}
            displayPrice={item.displayPrice}
            soldQuantity={item.soldQuantity}
            sellPrice={item.sellPrice}
            stockQuantity={item.stockQuantity}
            categoriesId={item.categoriesId}
            isFeature={item.isFeature}
            isActive={item.isActive}
            images={item.images[0]?.key}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            onUpdateStatus={this.onUpdateStatus}
          />
        );
      });
    }
    return result;
  };
  onUpdateStatus = () => {

  }
  onSaveImg = () => {
    const {
      name,
      unit,
      sellPrice,
      media,
      selectCategory,
      description,
      displayPrice,
      stockQuantity,
      soldQuantity,
      isActive,
      isFeature,
      shopeeUrl,
    } = this.state;
    var bodyFormData = new FormData();
    for (const file of media) {
      console.log(media, "file")
      bodyFormData.append("medias", file);
    }
    try {
      console.log(bodyFormData);
      axios
        .post(`${API_URL}/media`, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          axios
            .post(`${API_URL}/products`, {
              name: name,
              unit: unit,
              description: description,
              displayPrice: parseInt(displayPrice),
              sellPrice: parseInt(sellPrice),
              soldQuantity: parseInt(soldQuantity),
              stockQuantity: parseInt(stockQuantity),
              isFeature: isFeature,
              isActive: isActive,
              shopeeUrl: shopeeUrl,
              categoriesId: [parseInt(selectCategory)],
              imagesId: res.data.mediasId,
            })
            .then((result) => {

              console.log(result);
              this.setState(
                {
                  showModal: false,
                  id: "",
                  name: "",
                  unit: "",
                  description: "",
                  displayPrice: 0,
                  sellPrice: 0,
                  stockQuantity: 0,
                  stockQuantity: 0,
                  categoriesId: [],
                  imagesId: []
                },
                () => {
                  toast.success('Thêm sản phẩm thành công!')
                  this.getDateProduct();
                }
              );
            })
            .catch((error) => console.log("error", error));
        }
        )
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  onPutImg = () => {
    const {
      name,
      unit,
      sellPrice,
      media,
      selectCategory,
      description,
      displayPrice,
      stockQuantity,
      isActive,
      isFeature,
      shopeeUrl,
      soldQuantity,
    } = this.state;
    var bodyFormData = new FormData();
    for (const file of media) {
      console.log(media, "file")
      bodyFormData.append("medias", file);
    }
    try {
      console.log(bodyFormData);
      axios
        .put(`${API_URL}/products`, {
          name: name,
          unit: unit,
          description: description,
          displayPrice: parseInt(displayPrice),
          sellPrice: parseInt(sellPrice),
          soldQuantity: parseInt(soldQuantity),
          stockQuantity: parseInt(stockQuantity),
          isFeature: isFeature,
          isActive: isActive,
          shopeeUrl: shopeeUrl,
          categoriesId: [parseInt(selectCategory)],

        })
        .then((result) => {
          console.log(result);
          this.setState(
            {
              showModal: false,
              id: "",
              name: "",
              unit: "",
              description: "",
              displayPrice: 0,
              sellPrice: 0,
              stockQuantity: 0,
              categoriesId: [],
              imagesId: []
            },
            () => {
              this.getDateProduct();
            }
          );
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };
  onSave = (e) => {
    const {
      name,
      id,
      unit,
      selectCategory,
      displayPrice,
      sellPrice,
      stockQuantity,
    } = this.state;
    this.setState({
      id: "",
      name: "",
      unit: "",
      description: "",
      displayPrice: 0,
      sellPrice: 0,
      stockQuantity: 0,
      categoriesId: [],
      imagesId: [],
      shopeeUrl: ""
    })
    e.preventDefault();
    if (id) {
      console.log(id, "id")
      try {
        this.onPutImg();
        toast.success("Cập nhật sản phẩm thành công!");
      } catch (error) {
        console.log(error);
      }
    } else {
      if (
        name === "" ||
        unit === "" ||
        selectCategory === "" ||
        sellPrice === "" ||
        stockQuantity === ""
      ) {
        toast.warn("Vui lòng nhập những thông tin bắt buộc!");
        return;
      } else {
        try {
          this.setState({
            loading: false
          })
          this.onSaveImg();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  render() {
    const {
      products,
      name,
      unit,
      shopeeUrl,
      category,
      selectCategory,
      description,
      soldQuantity,
      displayPrice,
      imageName,
      stockQuantity,
      showModal,
      sellPrice,
      titleModal,
      // selectImage,
      loading
    } = this.state;
    const result = loading ? (
      <Spinner size={32} speed={1} animating={true} />
    ) : (
        this.showProduct(products)
      );
    return (
      <>
        <h1 className="mt-10">Danh sách sản phẩm</h1>
        <ToastContainer autoClose={3000} />
        <div className="text-right">
          <Button
            type="button"
            className="btn btn-primary mbt-10"
            onClick={() => {
              this.setState({
                showModal: true,
                titleModal: "Thêm sản phẩm",
                id: "",
                name: "",
                unit: "",
                description: "",
                displayPrice: 0,
                sellPrice: 0,
                stockQuantity: 0,
                categoriesId: [],
                imagesId: [],
                shopeeUrl: ""
              });
            }}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th> # </th>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá tiền</th>
              <th>Đã bán được</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Mô tả</th>
              <th>Nổi bật</th>
              <th>Hết hàng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{result}</tbody>
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
              <Modal.Title>{titleModal.toString()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className=" form-group col-6">
                  <label>
                    Danh Mục <sup className="sub_text">*</sup>
                  </label>
                  <select
                    className="form-control"
                    size="as"
                    as="select"
                    onChange={this.onChange}
                    value={selectCategory}
                    name="selectCategory"
                  >
                    <option>---Thêm danh mục---</option>
                    {category &&
                      category.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className=" form-group col-6">
                  <label> Tên sản phẩm <sup className="sub_text">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Nhập tên sản phẩm"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <label>Hình ảnh</label>
              <Form.File
                id="custom-file-translate-scss"
                label="Hình ảnh đầu tiên sẽ là hình mặc định"
                lang="en"
                custom
                multiple
                type="file"
                onChange={this.uploadMultipleFiles}
              />
              {/* {this.state.imageName} */}
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
              <div className="row">
                <div className=" form-group col-6">
                  <label> Tiền <sup className="sub_text">*</sup></label>
                  <input
                    className="form-control"
                    type="number"
                    name="sellPrice"
                    placeholder="Nhập giá tiền sản phẩm"
                    value={sellPrice}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label>
                    Đơn vị <sup className="sub_text">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="unit"
                    placeholder="Ví du: Hộp, Cái,..."
                    value={unit}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className=" form-group col-6">
                  <label>Số lượng <sup className="sub_text">*</sup>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="stockQuantity"
                    placeholder="Nhập số lượng sản phẩm"
                    value={stockQuantity}
                    onChange={this.onChange}
                  />
                </div>
                <div className=" form-group col-6">
                  <label> Link Shoppe (Nếu có)</label>
                  <input
                    className="form-control"
                    type="text"
                    name="shopeeUrl"
                    placeholder="Nhập link shoppee nếu có"
                    value={shopeeUrl}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <label> Mô tả </label>
              <textarea
                className="form-control"
                type="text"
                placeholder="Nhập mô tả sản phẩm"
                name="description"
                value={description}
                onChange={this.onChange}
              />
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
export default ProductsComponents;
