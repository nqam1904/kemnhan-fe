import './home.css';

import { useGetProductsQuery } from '@/store/apis/products';
import { useRef, useMemo, useState, useEffect } from 'react';

import ItemProductShow from './item-product-show';

interface Product {
    id: string | number;
    name: string;
    description: string;
    images: Array<{ key: string }>;
    isFeature: boolean;
    isActive: boolean;
    sellPrice?: number;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const { data: productsData } = useGetProductsQuery();
    const trackRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
        }
    }, [productsData]);

    const updateCanScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const maxScrollLeft = el.scrollWidth - el.clientWidth - 1;
        setCanPrev(el.scrollLeft > 0);
        setCanNext(el.scrollLeft < maxScrollLeft);
    };

    useEffect(() => {
        const el = trackRef.current;
        if (!el) {
            return () => { };
        }
        updateCanScroll();
        el.addEventListener('scroll', updateCanScroll);
        window.addEventListener('resize', updateCanScroll);
        const ro = new ResizeObserver(() => updateCanScroll());
        ro.observe(el);
        return () => {
            el.removeEventListener('scroll', updateCanScroll);
            window.removeEventListener('resize', updateCanScroll);
            ro.disconnect();
        };
    }, [trackRef]);

    useEffect(() => {
        // Re-evaluate when product list changes (width/scrollWidth may change)
        updateCanScroll();
    }, [products]);

    // Auto-scroll carousel every 2 seconds and loop
    useEffect(() => {
        const el = trackRef.current;
        if (!el) {
            return () => { };
        }

        const intervalId = window.setInterval(() => {
            // If there is nothing to scroll, do nothing
            const maxScrollLeft = el.scrollWidth - el.clientWidth;
            if (maxScrollLeft <= 0) return;

            const nextLeft = el.scrollLeft + el.clientWidth;
            if (nextLeft >= maxScrollLeft - 1) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
            }
        }, 2000);

        return () => { window.clearInterval(intervalId); };
    }, [products]);

    const showProduct = useMemo(() => {
        let result = null;
        if (products.length > 0) {
            const featureProduct = products.filter((x) => x.isFeature);
            const productShow = featureProduct;
            result = productShow.map((item, idx) => {
                const firstImageKey = item?.images?.[0]?.key;
                return (
                    <div key={idx} className="item_product" id="product">
                        <ItemProductShow
                            name={item.name}
                            id={item.id}
                            description={item.description}
                            images={firstImageKey}
                            isFeature={item.isFeature}
                            isActive={item.isActive}
                            price={item.sellPrice}
                        />
                    </div>
                );
            });
        }
        return result;
    }, [products]);

    return (
        <div className="page__product">
            <div className="list__products">
                <div className="text">
                    <p className="text-detail">Cần gì nến và hoa, khi kem chính là một món quà</p>
                </div>
                <div className="carousel">
                    <button
                        type="button"
                        className="carousel__btn carousel__btn--prev"
                        onClick={() => {
                            const el = trackRef.current;
                            if (el) el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
                        }}
                        disabled={!canPrev}
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <div className="list_product" ref={trackRef}>
                        {showProduct}
                    </div>
                    <button
                        type="button"
                        className="carousel__btn carousel__btn--next"
                        onClick={() => {
                            const el = trackRef.current;
                            if (el) el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
                        }}
                        disabled={!canNext}
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
