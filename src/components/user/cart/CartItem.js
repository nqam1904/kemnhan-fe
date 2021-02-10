import React, { Component } from 'react';
import { formatSubstring } from '../../../shared/Function';
import { LazyLoadImage } from 'react-lazy-load-image-component';
class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        var { item } = this.props;
        console.log(item)
        return (
            <div className="cart_item">
                <div className="content_item">
                    <div className="item_delete_1" onClick={() => this.props.onDeleteItem()}>
                        <img src={require('../../../res/image/Delete.png').default} alt="delete" />
                    </div>
                    <LazyLoadImage effect="blur" src={item.product.image} alt={item.product.name} />
                    <div className="mota">
                        <p className="title_item_cart">{item.product.name}</p>
                        <p className="title_item_cart">{formatSubstring(item.product.description)}</p>
                    </div>
                </div>
                <div className="option_item">
                    <img src={require('../../../res/image/tru.png').default} alt="tru" onClick={() => this.props.subItem()} />
                    <div className="quantity">{item.quantity}</div>
                    <img src={require('../../../res/image/plus.png').default} alt="plus" onClick={() => this.props.plusItem()} />
                </div>
            </div>
        );
    }
}

export default CartItem;