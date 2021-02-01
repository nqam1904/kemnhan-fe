import React from 'react';
import { Link } from 'react-router-dom'
import './ItemProductShow.css';

const ItemProductShow = props => {
    function getProduct(id) {
        props.getProduct(id)
    }
    // console.log(props.images)
    return (
        <div className="card_item" onClick={() => getProduct(props.id)} >
            {/* <img className="image" src={props.images} alt={props.name} /> */}
            <img className="image" src={require('../../../res/image/image.png').default} alt={props.name} />
            <h5 id="title1" aria-hidden="true">{props.name}</h5>
            <div className="overlay">
                <div className="description">{props.description}</div>
                {props.isFeature === true ? <div className="button_detail">Nổi bật</div> : ''}
                {props.isActive === true ? "" : <div className="button_detail">Hết hàng</div>}
            </div>
        </div>
    );
}

export default ItemProductShow;