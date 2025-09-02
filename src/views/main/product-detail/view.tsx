import './product-detail.css';

import axios from 'axios';
import { CONFIG } from '@/config-global';
import { fNumber } from '@/utils/format-number';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { toast, ToastContainer } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMemo, useState, useEffect, useCallback } from 'react';

interface ProductDetailProps {
    actAddToCart: (item: any) => void;
}

function ProductDetail(props: ProductDetailProps) {
    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [shopeeUrl, setShopeeUrl] = useState<string>('');
    const [displayPrice] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFeature, setIsFeature] = useState<boolean>(false);
    const [images, setImages] = useState<any[]>([]);
    const [sellPrice, setSellPrice] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [dataImage, setDataImage] = useState<any[]>([]);
    const [quantity] = useState<number>(0);
    const [note] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const getRouteParams = useCallback((): { [key: string]: string } => {
        const search = new URLSearchParams(window.location.search);
        const params: { [key: string]: string } = {};
        search.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, []);

    const id = useMemo(() => getRouteParams().id, [getRouteParams]);

    const getProductDetail = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/products/${id}`)
            .then((res) => {
                setName(res.data.name);
                setUnit(res.data.unit);
                setDescription(res.data.description);
                setShopeeUrl(res.data.shopeeUrl);
                setSellPrice(res.data.sellPrice);
                setIsActive(res.data.isActive);
                setIsFeature(res.data.isFeature);
                setSelectedImage(resolveImageUrl(`static/${res.data.images[0].key}`));
                setDataImage(res.data.images);
                setLoading(false);
            })
            .catch((_) => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        getProductDetail();
    }, [getProductDetail]);

    const handleClick = (image: any) => {
        setSelectedImage(resolveImageUrl(`static/${image.key}`));
    };

    const addCart = () => {
        const data = {
            product: {
                id,
                name,
                image: selectedImage,
                price: sellPrice,
                description,
            },
            quantity: 1,
        };
        props?.actAddToCart(data);
        toast.success('Thêm vào giỏ thành công!');
    };

    return (
        <>
            {loading ? (
                <div className="loading">Loading</div>
            ) : (
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
                                <p className="content">{name}</p>
                                <p className="content_price">
                                    {fNumber(sellPrice)}đ/{unit}
                                </p>
                                <p className="content_des">{description}</p>
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

export default ProductDetail;
