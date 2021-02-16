import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Types from "../../../redux/action/mesAction";
import "./Cart.css";
import CartItem from "./CartItem";
import { currencyFormat, validateInput, isValidEmailAddress } from "../../../shared/Function";
import { API_URL } from "../../../config/setting";
import axios from "axios";
class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      showCustom: false,
      cart: [],
      layout: "container-fluid",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      customer: [],
      emailIsValid: "",
      errorMessage: ''
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("cart", this.props.cartItem)) {
      this.setState({
        layout: "container",
      });
      toast.success(`${Types.MSG_CART_EMPTY}`);
    } else {
      this.setState({
        showCustom: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log("asd", this.props.cartItem !== prevProps.cartItem);
  }
  showCartItem = () => {
    var result = null;
    const { cartItem } = this.props;
    if (cartItem.length > 0) {
      result = cartItem.map((item, index) => {
        const quantity = parseInt(item.quantity);
        return (
          <CartItem
            {...this.props}
            key={index}
            item={item}
            index={index}
            onDeleteItem={() => this.onDeleteItem(item.product.id)}
            subItem={() => this.subItem(quantity, item.product.id)}
            plusItem={() => this.plusItem(quantity, item.product.id)}
          />
        );
      });
    }
    return result;
  };
  subItem = (quantity, id) => {
    if (quantity > 1) {
      const sl = -1;
      this.props.actUpdateItem(id, sl);
      window.location.reload();
      console.log("subtract", quantity, sl, this.props.cartItem);
    }
  };

  plusItem = (quantity, id) => {
    if (quantity < 100) {
      const sl = 1;
      this.props.actUpdateItem(id, sl);
      window.location.reload();
      console.log("plus", quantity, sl, this.props.cartItem);
    }
  };

  onDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      this.props.actDeleteItem(id);
      window.location.reload();
    }
  };
  showTotalAmount = (cartItem) => {
    var result = 0;
    if (cartItem.length > 0) {
      for (var i = 0; i < cartItem.length; i++) {
        result += cartItem[i].product.price * cartItem[i].quantity;
      }
    }
    return currencyFormat(result);
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
  payment = () => {
    const { cartItem } = this.props;
    const { firstName, lastName, email, address, phone, note } = this.state;
    const date = new Date();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      address === "" ||
      phone === ""
    ) {
      return toast.warning("Vui lòng nhập đủ thồng tin cá nhân!");

    } else if (!isValidEmailAddress(email)) {

      toast.error("Nhập đúng định dạng email!");
      return;
    }
    else if (!validateInput(phone)) {

      toast.error("Số điện thoại phải có 10-11 chữ số");
      return;
    }
    else {
      let listProduct = [];
      for (var item of cartItem) {
        listProduct.push({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
          subtotal: item.product.price * item.quantity,
          discount: 0,
          note: note,
        });
      }
      axios
        .post(`${API_URL}/orders`, {
          data: date,
          expectDateDelivery: date,
          note: note,
          customer: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: address,
          },
          lines: listProduct,
        })
        .then((res) => {
          toast.success("Success!");
          // this.props.actDeleteAll();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onDeleteAll = () => {
    this.props.actDeleteAll();
    window.location.reload();
  };
  onSaveCustom = () => { };
  render() {
    const {
      note,
      cart,
      showCustom,
      layout,
      firstName,
      lastName,
      email,
      address,
      phone,
    } = this.state;
    const { cartItem } = this.props;
    console.log();
    const emptyCart = (
      <div className="description_cart">
        <div className="page_empty">
          <img
            className="img_empty_cart"
            alt="empty"
            src={require("../../../res/image/empty.png").default}
          />
          <Link to="/" className="btn_back">
            <span>Mua thêm sản phẩm</span>
          </Link>
        </div>
      </div>
    );
    const elemCustom = showCustom === true && (
      <div className="cart_custom">
        <div className="cart_header_custom">
          <p className="content_cart">Đơn hàng</p>
        </div>
        <div className="cart_custom_body">
          <div className="cart_custom_detail">
            <input
              className="input_custom"
              style={{ marginLeft: 20, width: '90%' }}
              onChange={this.onChange}
              name="firstName"

              value={firstName}
              placeholder="Nhập họ"
            />{" "}
            <br />
            <input
              className="input_custom"
              style={{ marginLeft: 20, width: '90%' }}
              onChange={this.onChange}
              name="lastName"
              value={lastName}
              placeholder="Nhập tên"
            />{" "}
            <br />
            <img
              src={require("../../../res/image/Location.png").default}
              alt="#"
            />
            <input
              className="input_custom"
              placeholder="Nhập địa chỉ"
              style={{ width: '90%' }}
              name="address"
              // onBlur={() => this.setState({
              //   emailIsValid: isValidEmailAddress(this.state.email)
              // })}
              value={address}
              onChange={this.onChange}
            />
            <br />
            <img src={require("../../../res/image/Call.png").default} alt="#" />
            <input
              className="input_custom"
              style={{ width: '90%' }}
              placeholder="Nhập số điện thoại"
              name="phone"
              type="number"
              pattern="[0-9]*" inputmode="numeric"
              value={phone}
              onChange={this.onChange}
            />
            <br />
            <img src={require("../../../res/image/mail.png").default} alt="#" />
            <input
              className="input_custom"
              style={{ width: '90%' }}
              placeholder="Nhập email"
              value={email}
              name="email"
              type="email"
              onChange={this.onChange}
            />
            <input
              className="input_custom"
              style={{ marginLeft: 20, width: '90%' }}
              placeholder="Nhập ghi chú nếu có"
              value={note}
              name="note"
              onChange={this.onChange}
            />
          </div>

        </div>
        <div className="cart_amount_body">
          <div className="thongtin">
            <p>Giá sản phẩm (1):</p>
            <p>Tổng cộng:</p>
            {/* <p>Phí ship:</p> */}
          </div>
          <div className="thanhtoan">
            <p>{currencyFormat(cartItem[0]?.product.price)} đ</p>
            <p className="total">{this.showTotalAmount(cartItem)} đ</p>
          </div>
        </div>
        <div className="btn_payment" onClick={() => this.payment()}>
          Đặt mua
        </div>
      </div>
    );
    return (
      <div className={layout}>
        <ToastContainer autoClose={3000} />
        <div className="page_cart">
          <div className="card_cart">
            <div className="cart_header">
              <p className="content_cart">Giỏ hàng</p>
              <p className="number_cart">{cartItem.length ?? 0} Sản phẩm</p>
            </div>
            <div className="cart_body">
              <div className="option">
                <div className="select_all">
                  <input type="checkbox" className="checkbox" />
                  <p className="text_selectAll" style={{ paddingLeft: 8 }}>
                    Chọn tất cả
                  </p>
                </div>
                <div className="delete_item" onClick={() => this.onDeleteAll()}>
                  <img
                    src={require("../../../res/image/Delete.png").default}
                    alt="delete"
                  />
                  <p className="text_delete">Xoá Tất cả</p>
                </div>
              </div>
              <div className="content_cart_item">
                {!localStorage.getItem("cart", cart)
                  ? emptyCart
                  : this.showCartItem()}
              </div>
            </div>
          </div>
          {elemCustom}
        </div>
      </div>
    );
  }
}

export default CartComponent;
