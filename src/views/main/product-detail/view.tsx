import './product-detail.css';

import { useParams } from 'react-router-dom';
import { Placeholder } from 'react-bootstrap';
import { fNumber } from '@/utils/format-number';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { useMemo, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useGetProductQuery } from '@/store/apis/products';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ProductDetailProps {
    actAddToCart: (item: any) => void;
}

function ProductDetail(props: ProductDetailProps) {
    const [product, setProduct] = useState<any | null>(null);

    const { id: routeId } = useParams<{ id: string }>();
    const id = useMemo(() => routeId, [routeId]);

    const { data: productData, isFetching, isLoading } = useGetProductQuery(
        { id: id as string },
        { skip: !id }
    );

    useEffect(() => {
        if (!isFetching && productData) {
            setProduct(productData);
        }
    }, [productData, isFetching]);

    const selectedImage = useMemo(
        () => (product ? resolveImageUrl(`static/${product.images?.[0]?.key}`) : null),
        [product]
    );

    const loading = isFetching || isLoading || !product;

    const addCart = () => {
        const cartPayload = {
            product: {
                id,
                name: product?.name,
                image: selectedImage,
                price: product?.sellPrice,
                description: product?.description,
            },
            quantity: 1,
        };
        props?.actAddToCart(cartPayload);
        toast.success('Thêm vào giỏ thành công!');
    };

    const hasShopee = !!(product?.shopeeUrl && product.shopeeUrl.trim());

    return (
        <>
            {loading ? (
                <div className="container-fluid">
                    <div className="page_product_detail">
                        <div className="product_img">
                            <div style={{ width: '100%', height: 320, background: '#e9ecef' }} />
                        </div>
                        <div className="product_body">
                            <div className="product_content">
                                <Placeholder as="p" animation="glow" className="content">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as="p" animation="glow" className="content_price">
                                    <Placeholder xs={4} />
                                </Placeholder>
                                <Placeholder as="p" animation="glow" className="content_des">
                                    <Placeholder xs={8} /> <Placeholder xs={7} /> <Placeholder xs={6} />
                                </Placeholder>
                                <div className="btn_mobile_cart" style={{ cursor: 'default' }}>
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={2} />
                                    </Placeholder>
                                </div>
                            </div>
                            <div className="option_detail">
                                <div className="btn_buy" style={{ cursor: 'default' }}>
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={3} />
                                    </Placeholder>
                                </div>
                                <div className="btn_buy" style={{ cursor: 'default' }}>
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={3} />
                                    </Placeholder>
                                </div>
                                <div className="btn_shopee" style={{ cursor: 'default' }}>
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={3} />
                                    </Placeholder>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="container-fluid">
                        <ToastContainer autoClose={1000} />
                        <div className="page_product_detail">
                            <div className="product_img">
                                <LazyLoadImage
                                    effect="blur"
                                    src={selectedImage as string}
                                    placeholderSrc={ImageAssets.logo}
                                    alt="product"
                                />
                            </div>
                            <div className="product_body">
                                <div className="product_content">
                                    <h1 className="product-title">{product?.name}</h1>
                                    <p className="content_price">
                                        {fNumber(product?.sellPrice || 0)}đ/{product?.unit}
                                    </p>
                                    <div
                                        id="btn_cart"
                                        onClick={() => {
                                            addCart();
                                            window.location.href = '/gio-hang';
                                        }}
                                        className="btn_mobile_cart"
                                    >
                                        <img src={ImageAssets.icCart} width={35} alt="add to cart" />
                                        <p>Mua ngay</p>
                                    </div>
                                </div>
                                <div className="option_detail">
                                    <div className="btn_buy" onClick={() => addCart()}>
                                        <img src={ImageAssets.icCart} width={35} alt="add to cart" />
                                        <span>Thêm vào giỏ hàng</span>
                                    </div>
                                    <div
                                        className="btn_buy"
                                        onClick={() => {
                                            addCart();
                                            window.location.href = '/gio-hang';
                                        }}
                                    >
                                        <span>Mua ngay</span>
                                    </div>
                                    {hasShopee && (
                                        <div
                                            className="btn_shopee"
                                            onClick={() => window.open(product?.shopeeUrl, '_blank')}
                                        >
                                            <img src={ImageAssets.shopee} width={40} alt="shopee" />
                                            <span style={{ marginLeft: 10 }}>Shopee</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Description block below main section */}
                    <div className="product-desc">
                        <div className="product-desc__title">MÔ TẢ</div>
                        <div className="product-desc__content">{product?.description}</div>
                    </div>
                </>
            )}
        </>
    );
}

export default ProductDetail;
