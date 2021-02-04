import React, { Component } from 'react';
import { formatSubstring } from '../../../shared/Function'
class CartItem extends Component {
    render() {
        var { item } = this.props;
        console.log(item)
        return (
            <div className="cart_item">
                {/* <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <input className="" type="checkbox" />
                    </div> */}
                <div className="content_item">
                    <img src={item.product.image} />
                    <div className="mota">
                        <p className="title_item_cart">{item.product.name}</p>
                        <p className="title_item_cart">{formatSubstring(item.product.description)}</p>
                    </div>
                </div>
                <div className="option_item">
                    <img src={require('../../../res/image/tru.png').default} />
                    <div className="quantity">{item.quantity}</div>
                    <img src={require('../../../res/image/plus.png').default} />
                </div>
            </div>
        );
    }
}

export default CartItem;