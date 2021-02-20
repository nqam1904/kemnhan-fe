import React, { Component } from 'react'
import { history } from '../../../configureStore'
import './Success.css'
class SuccessPayment extends Component {
  render() {
    return (
      <div className="success">

        <div className="form">
          <div class="pyro"><div class="before"></div><div class="after"></div></div>
          <div className="border__logo">
            {/* <img alt="logo" src={require('../../../res/image/logo1.png').default} className="logo" /> */}
            <img alt="logo" src={require('../../../res/image/Kemnhanonline.png').default} className="title__logo" />
          </div>
          <br />

          <img alt="success" src={require('../../../res/image/success.png').default} className="image__success" />
          <div className="form__title">
            <br />
            <p>Bạn đã đặt đơn hàng thành công!</p>
          </div>
          <div className="form__button" onClick={() => history.push('/')}>
            Quay lại trang chủ
          </div>
        </div>
      </div>
    )
  }
}

export default SuccessPayment
