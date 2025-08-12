import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImageAssets from '../../../constants/ImagesAsset';
import { formatSubstring } from '../../../utils/Function';
class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var { item } = this.props;

        return (
            <div className="cart_item">
                <div className="content_item">
                    <div className="item_delete_1" onClick={() => this.props.onDeleteItem()}>
                        <img src={ImageAssets.delete} alt="delete" />
                    </div>
                    <LazyLoadImage effect="blur" src={item.product.image} alt={item.product.name} />
                    <div className="mota">
                        <p className="title_item_cart">{item.product.name}</p>
                        <p className="title_item_cart description__cart">{formatSubstring(item.product.description)}</p>
                    </div>
                </div>
                <div className="option_item">
                    <img src={ImageAssets.tru} alt="minus" onClick={() => this.props.subItem()} />
                    <div className="quantity">{item.quantity}</div>
                    <img src={ImageAssets.plus} alt="plus" onClick={() => this.props.plusItem()} />
                </div>
            </div>
        );
    }
}

export default CartItem;
