import './product-detail.css';

import { paths } from '@/routes/paths';
import { useDispatch } from 'react-redux';
import { useRouter } from '@/routes/hooks';
import { useParams } from 'react-router-dom';
import { addToCart } from '@/store/slices/cart';
import { fNumber } from '@/utils/format-number';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { useMemo, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Breadcrumb, Placeholder } from 'react-bootstrap';
import { useGetProductQuery } from '@/store/apis/products';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ProductDetail() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState<any | null>(null);
    const router = useRouter();
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
        () => (product ? resolveImageUrl(product.images?.[0]?.key) : null),
        [product]
    );

    const loading = isFetching || isLoading || !product;

    const addCart = () => {
        const cartPayload = {
            product: {
                id: id as string,
                name: product?.name,
                image: selectedImage,
                price: product?.sellPrice,
                description: product?.description,
            },
            quantity: 1,
        };
        dispatch(addToCart(cartPayload));
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
                <div className="container-fluid">
                    <ToastContainer autoClose={1000} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item href="/">Sản phẩm</Breadcrumb.Item>
                        <Breadcrumb.Item active>{product?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="page_product_detail">
                        <div className="product_img">
                            {/* @ts-ignore */}
                            <LazyLoadImage
                                effect="blur"
                                src={(selectedImage as string) || ImageAssets.logo}
                                placeholderSrc={ImageAssets.logo}
                                alt="product"
                                onError={(e: any) => {
                                    if (e?.target) e.target.src = ImageAssets.logo;
                                }}
                            />
                        </div>
                        <div className="product_body">
                            <div className="product_content">
                                <h1 className="product-title">
                                    {product?.name}
                                    {hasShopee && (
                                        <span
                                            className="shopee-inline"
                                            onClick={() => router.push(product?.shopeeUrl)}
                                            role="link"
                                            aria-label="Mua trên Shopee"
                                        >
                                            <img src={ImageAssets.shopee} alt="shopee" />
                                        </span>
                                    )}
                                </h1>
                                <p className="content_price">
                                    {fNumber(product?.sellPrice || 0)}đ/{product?.unit}
                                </p>
                                <div
                                    id="btn_cart"
                                    onClick={() => {
                                        addCart();
                                        router.push(paths.main.cart);
                                    }}
                                    className="btn_mobile_cart"
                                >
                                    <p>Mua ngay</p>
                                </div>
                            </div>
                            <div className="option_detail">
                                <div className="btn_buy" onClick={() => addCart()}>
                                    <img src={ImageAssets.icCart} width={35} alt="add to cart" style={{ marginRight: 10 }} />
                                    <span>Thêm vào giỏ hàng</span>
                                </div>
                                <div
                                    className="btn_buy"
                                    onClick={() => {
                                        addCart();
                                        router.push(paths.main.cart);
                                    }}
                                >
                                    <span>Mua ngay</span>
                                </div>
                                {/* Shopee button removed; inline icon is shown near the title */}
                            </div>
                            <p className="content_des" style={{ marginTop: 16 }}>{product?.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetail;
