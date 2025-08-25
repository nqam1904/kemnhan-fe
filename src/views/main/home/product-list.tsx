import { useGetProductsQuery } from '@/store/apis/products';
import { useEffect, useMemo, useState } from 'react';
import './home.css';
import ItemProductShow from './item-product-show';

interface Product {
    id: string | number;
    name: string;
    description: string;
    images: Array<{ key: string }>;
    isFeature: boolean;
    isActive: boolean;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const { data: productsData } = useGetProductsQuery();

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
        }
    }, []);

    const showProduct = useMemo(() => {
        var result = null;
        if (products.length > 0) {
            const featureProduct = products.filter((x) => x.isFeature);
            const productShow =
                featureProduct.length > 6 ? featureProduct.slice(0, 6) : featureProduct;
            result = productShow.map((item, idx) => {
                return (
                    <div key={idx} className="item_product" id="product">
                        <ItemProductShow
                            name={item.name}
                            id={item.id}
                            description={item.description}
                            images={item.images[0].key}
                            isFeature={item.isFeature}
                            isActive={item.isActive}
                            propsURL={`/trang-chu/chi-tiet-san-pham?id=${item.id}`}
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
                <div className="list_product">{showProduct}</div>
            </div>
        </div>
    );
}

export default ProductList;
