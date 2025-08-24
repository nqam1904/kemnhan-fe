import axios from 'axios';
import { CONFIG } from 'config-global';
import { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, ToastContainer } from 'react-toastify';

import ImageAssets from 'constants/ImagesAsset';
import { currencyFormat } from 'utils/Function';
import './ProductDetail.css';

interface ProductDetailProps {
    match: {
        params: {
            id: string;
        };
    };
    actAddToCart: (item: any) => void;
}

interface ProductDetailState {
    id: string;
    name: string;
    unit: string;
    description: string;
    shopeeUrl: string;
    displayPrice: number;
    isActive: boolean;
    isFeature: boolean;
    images: any[];
    sellPrice: number;
    selectedImage: string | null;
    dataImage: any[];
    quantity: number;
    note: string;
    loading: boolean;
}

class ProductDetail extends Component<ProductDetailProps, ProductDetailState> {
    constructor(props: ProductDetailProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            unit: '',
            description: '',
            shopeeUrl: '',
            displayPrice: 0,
            isActive: false,
            isFeature: false,
            images: [],
            sellPrice: 0,
            selectedImage: null,
            dataImage: [],
            quantity: 0,
            note: '',
            loading: true,
        };
    }
    async componentDidMount() {
        await this.getProductDetail();
    }
    getRouteParams = (): { [key: string]: string } => {
        const search = new URLSearchParams(history.location.search);
        const params: { [key: string]: string } = {};

        search.forEach((value, key) => {
            params[key] = value;
        });

        return params;
    };
    getProductDetail = () => {
        const { id } = this.getRouteParams();

        axios
            .get(`${CONFIG.serverUrl}/products/${id}`)
            .then((res) =>
                this.setState(
                    {
                        name: res.data.name,
                        unit: res.data.unit,
                        description: res.data.description,
                        shopeeUrl: res.data.shopeeUrl,
                        sellPrice: res.data.sellPrice,
                        isActive: res.data.isActive,
                        isFeature: res.data.isFeature,
                        selectedImage: `${CONFIG.imageUrl || CONFIG.serverUrl}/static/${res.data.images[0].key}`,
                        dataImage: res.data.images,
                        loading: false,
                    },
                    () => {}
                )
            )
            .catch((_) => {});
    };
    handleClick = (image: any) => {
        this.setState(
            {
                selectedImage: `${CONFIG.imageUrl || CONFIG.serverUrl}/static/${image.key}`,
            },
            () => {}
        );
    };
    addCart = () => {
        const { id } = this.getRouteParams();
        const data = {
            product: {
                id: parseInt(id),
                name: this.state.name,
                image: this.state.selectedImage,
                price: this.state.sellPrice,
                description: this.state.description,
            },
            quantity: 1,
        };

        this.props.actAddToCart(data);

        toast.success('Thêm vào giỏ thành công!');
    };
    render(): React.ReactNode {
        const { name, unit, description, shopeeUrl, sellPrice, selectedImage, id, loading } =
            this.state;

        return (
            <>
                {loading ? (
                    <div className="loading">Loading</div>
                ) : (
                    <div className="container-fluid">
                        <ToastContainer autoClose={2000} />
                        <div className="page_product_detail">
                            <div className="product_img">
                                <LazyLoadImage
                                    effect="blur"
                                    src={selectedImage}
                                    placeholderSrc={ImageAssets.logo}
                                    alt="product"
                                />
                            </div>
                            <div className="product_body">
                                <div className="product_content">
                                    <p className="content">{name}</p>
                                    <p className="content_price">
                                        {currencyFormat(sellPrice)}đ/{unit}
                                    </p>
                                    <p className="content_des">{description}</p>
                                    <div
                                        id="btn_cart"
                                        onClick={() => {
                                            this.addCart();
                                            history.push('gio-hang');
                                        }}
                                        className="btn_mobile_cart"
                                    >
                                        <img
                                            src={ImageAssets.icCart}
                                            width={35}
                                            alt="add to cart"
                                        />
                                        <p>Mua ngay</p>
                                    </div>
                                </div>
                                <div className="option_detail">
                                    <div className="btn_buy" onClick={() => this.addCart()}>
                                        <img
                                            src={ImageAssets.icCart}
                                            width={35}
                                            alt="add to cart"
                                        />
                                        <span>Thêm vào giỏ hàng</span>
                                    </div>
                                    <div
                                        className="btn_buy"
                                        onClick={() => {
                                            this.addCart();
                                            history.push('gio-hang');
                                        }}
                                    >
                                        <span>Mua ngay</span>
                                    </div>
                                    <div
                                        className="btn_shopee"
                                        onClick={() => window.open(shopeeUrl, '_blank')}
                                    >
                                        <img src={ImageAssets.shopee} width={40} alt="shopee" />
                                        <span style={{ marginLeft: 10 }}>Shopee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default ProductDetail;
