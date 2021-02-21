import React, { Component } from 'react'
import { history } from "../../../configureStore";

class NewsComponent extends Component {
  render() {
    if (!localStorage.getItem('token') && !localStorage.getItem('userData')) {
      return history.push("/login")
    }
    return (
      <div className="container">
        <h1>Chức năng đang cập nhật!</h1>
      </div>
    )
  }
}

export default NewsComponent;
