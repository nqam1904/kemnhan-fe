import React, { Component } from 'react';

class CartItem extends Component {
    render() {
        var { item } = this.props;
        console.log(item)
        return (
            <div className="cart_item">
                <div className="row">
                    {/* <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <input className="" type="checkbox" />
                    </div> */}
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="content_item">
                            <img src={"http://103.159.50.98:3000/static/1612204748131.jpg"} />
                            <div className="mota">
                                <p className="title_item_cart">{item.product.name}</p>
                                <p className="title_item_cart">{item.product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                        <div className="option_item">
                            <img src={require('../../../res/image/tru.png').default} />
                            <div className="quantity">{item.quantity}</div>
                            <img src={require('../../../res/image/plus.png').default} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;