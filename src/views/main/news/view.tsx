import ImageAssets from '@/constants/ImagesAsset';
import { useGetProductsQuery } from '@/store/apis/products';
import { useGetPromotionsQuery } from '@/store/apis/promotions';
import type { Promotion } from '@/store/types/promotion';
import resolveImageUrl from '@/utils/image-url';
import './news.css';

function NewsView() {
    const { data: promotions = [], isLoading } = useGetPromotionsQuery();
    const { data: products = [] } = useGetProductsQuery();

    return (
        <div id="news" className="news-page">
            <div className="news-page__container">
                <div className="news-page__main">
                    <h2 className="news-page__title">Tin tức</h2>
                    <div className="news-grid">
                        {isLoading && <img src={ImageAssets.loading} alt="loading" width={120} />}
                        {!isLoading && promotions.length === 0 && (
                            <div className="news-empty">Chưa có tin khuyến mãi.</div>
                        )}
                        {!isLoading &&
                            promotions.map((item: Promotion) => {
                                const key = item.images?.[0]?.key;
                                const img = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;
                                return (
                                    <article key={String(item.id)} className="news-card">
                                        <div className="news-card__thumb">
                                            <img src={img} alt={item.name} />
                                            <div className="news-card__date">
                                                <div className="news-card__date-day">26</div>
                                                <div className="news-card__date-month">Th10</div>
                                            </div>
                                        </div>
                                        <div className="news-card__content">
                                            <h3 className="news-card__title">{item.name}</h3>
                                            <p
                                                className="news-card__excerpt"
                                                dangerouslySetInnerHTML={{ __html: item.content || '' }}
                                            ></p>
                                        </div>
                                    </article>
                                );
                            })}
                    </div>
                </div>

                <aside className="news-page__sidebar">
                    <h3 className="news-page__sidebar-title">Bài viết mới</h3>
                    <ul className="news-list">
                        {promotions.slice(0, 5).map((item: Promotion) => {
                            const key = item.images?.[0]?.key;
                            const img = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;
                            return (
                                <li key={`latest-${String(item.id)}`} className="news-list__item">
                                    <img src={img} alt={item.name} />
                                    <span>{item.name}</span>
                                </li>
                            );
                        })}
                    </ul>

                    <h3 className="news-page__sidebar-title">Sản phẩm nổi bật</h3>
                    <ul className="news-list">
                        {Array.isArray(products) &&
                            products
                                .filter((p: any) => p?.isFeature)
                                .slice(0, 5)
                                .map((p: any) => {
                                    const key = p?.images?.[0]?.key;
                                    const img = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;
                                    return (
                                        <li key={`fp-${String(p.id)}`} className="news-list__item">
                                            <img src={img} alt={p.name} />
                                            <span>{p.name}</span>
                                        </li>
                                    );
                                })}
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default NewsView;
