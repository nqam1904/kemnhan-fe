import React, { Component } from 'react';
import { formatSubstring } from '../../../shared/Function'
class CartItem extends Component {
    render() {
        var { item } = this.props;
        console.log(item)
        return (
            <div className="cart_item">
                <div className="content_item">
                    <div className="item_delete_1">
                        <img src={require('../../../res/image/Delete.png').default} alt="delete" />
                    </div>
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="mota">
                        <p className="title_item_cart">{item.product.name}</p>
                        <p className="title_item_cart">{formatSubstring(item.product.description)}</p>
                    </div>
                </div>
                <div className="option_item">
                    <img src={require('../../../res/image/tru.png').default} alt="tru" />
                    <div className="quantity">{item.quantity}</div>
                    <img src={require('../../../res/image/plus.png').default} alt="plus" />
                </div>
            </div>
        );
    }
}

export default CartItem;