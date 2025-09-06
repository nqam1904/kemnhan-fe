import './home.css';

import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/apis/products';
import { useRef, useMemo, useState, useEffect } from 'react';

import ItemProductShow from './item-product-show';
import ProductCardSkeleton from './product-card-skeleton';

function ProductList() {
    const { data: productsData, isLoading } = useGetProductsQuery();
    const trackRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateCanScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const epsilon = 2; // guard for rounding
        const atStart = Math.floor(el.scrollLeft) <= epsilon;
        const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - epsilon;
        setCanPrev(!atStart);
        setCanNext(!atEnd);
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
        updateCanScroll();
    }, []);

    // Removed auto-advance to avoid unexpected wrap to start when user clicks next

    const showProduct = useMemo(() => {
        let result = null;
        const products = Array.isArray(productsData) ? productsData : [];
        if (products.length > 0) {
            const featureProduct = products.filter((x) => x.isFeature);
            const productShow = featureProduct;
            result = productShow.map((item, idx) => {
                const firstImageKey = item?.images?.[0]?.key;
                return (
                    <Link
                        key={idx}
                        to={paths.main.productDetail(item.id)}
                        className="item_product link_product"
                        id="product"
                        aria-label={`Xem chi tiết ${item.name}`}
                    >
                        <ItemProductShow
                            name={item.name}
                            id={item.id}
                            description={item.description}
                            images={firstImageKey}
                            isFeature={item.isFeature}
                            isActive={item.isActive}
                            price={item.sellPrice}
                        />
                    </Link>
                );
            });
        }
        return result;
    }, [productsData]);

    const skeletonItems = useMemo(() => Array.from({ length: 4 }).map((_, idx) => (
        <ProductCardSkeleton key={`skeleton-${idx}`} />
    )), []);

    return (
        <div className="page__product">
            <div className="list__products">
                <div className="text">
                    {/* <p className="text-detail">Cần gì nến và hoa, khi kem chính là một món quà</p> */}
                    <p className="text-detail">Sản phẩm nổi bật</p>

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
                        {isLoading ? skeletonItems : showProduct}
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
