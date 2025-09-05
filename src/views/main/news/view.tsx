import './news.css';

import type { Promotion } from '@/store/types/promotion';

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Placeholder } from 'react-bootstrap';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { useGetProductsQuery } from '@/store/apis/products';
import { useGetPromotionsQuery } from '@/store/apis/promotions';

function NewsView() {
    const { data: promotions = [], isLoading } = useGetPromotionsQuery();
    const { data: products = [], isLoading: isLoadingProducts } = useGetProductsQuery();

    return (
        <div id="news" className="news-page">
            <div className="news-page__container">
                <div className="news-page__main">
                    <h2 className="news-page__title">Tin tức</h2>
                    <div className="news-grid">
                        {isLoading && (
                            <>
                                {Array.from({ length: 6 }).map((_, idx) => (
                                    <article key={`sk-news-${idx}`} className="news-card">
                                        <div className="news-card__thumb">
                                            <div style={{ width: '100%', paddingTop: '56%', background: '#e9ecef' }} />
                                            <div className="news-card__date">
                                                <div className="news-card__date-day">&nbsp;</div>
                                                <div className="news-card__date-month">&nbsp;</div>
                                            </div>
                                        </div>
                                        <div className="news-card__content">
                                            <Placeholder as="h3" animation="glow" className="news-card__title">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder as="p" animation="glow" className="news-card__excerpt">
                                                <Placeholder xs={7} /> <Placeholder xs={5} /> <Placeholder xs={8} />
                                            </Placeholder>
                                        </div>
                                    </article>
                                ))}
                            </>
                        )}
                        {!isLoading && promotions.length === 0 && (
                            <div className="news-empty">Chưa có tin tức.</div>
                        )}
                        {!isLoading &&
                            promotions.map((item: Promotion) => {
                                const key = item.images?.[0]?.key;
                                const img = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;
                                const createdAt = item.createDate ? dayjs(item.createDate) : null;
                                const createdDay = createdAt && createdAt.isValid() ? createdAt.format('DD') : '';
                                const createdMonth = createdAt && createdAt.isValid() ? `Th${createdAt.format('MM')}` : '';
                                return (
                                    <article key={String(item.id)} className="news-card">
                                        <div className="news-card__thumb">
                                            <img src={img} alt={item.name} />
                                            <div className="news-card__date">
                                                <div className="news-card__date-day">{createdDay}</div>
                                                <div className="news-card__date-month">{createdMonth}</div>
                                            </div>
                                        </div>
                                        <div className="news-card__content">
                                            <h3 className="news-card__title">{item.name}</h3>
                                            <p
                                                className="news-card__excerpt"
                                                dangerouslySetInnerHTML={{ __html: item.content || '' }}
                                            />
                                        </div>
                                    </article>
                                );
                            })}
                    </div>
                </div>

                <aside className="news-page__sidebar">
                    <h3 className="news-page__sidebar-title">Bài viết mới</h3>
                    <ul className="news-list">
                        {isLoading && (
                            <>
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <li key={`sk-latest-${idx}`} className="news-list__item">
                                        <div
                                            style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 6,
                                                background: '#e9ecef',
                                                border: '1px solid #f0f0f0',
                                            }}
                                        />
                                        <Placeholder as="span" animation="glow">
                                            <Placeholder xs={7} />
                                        </Placeholder>
                                    </li>
                                ))}
                            </>
                        )}
                        {!isLoading &&
                            promotions.slice(0, 5).map((item: Promotion) => {
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
                    <ul className="news-list news-list--featured">
                        {isLoadingProducts && (
                            <>
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <li key={`sk-fp-${idx}`} className="news-list__item">
                                        <div
                                            style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 6,
                                                background: '#e9ecef',
                                                border: '1px solid #f0f0f0',
                                            }}
                                        />
                                        <Placeholder as="span" animation="glow">
                                            <Placeholder xs={7} />
                                        </Placeholder>
                                    </li>
                                ))}
                            </>
                        )}
                        {!isLoadingProducts &&
                            Array.isArray(products) &&
                            products
                                .filter((p: any) => p?.isFeature)
                                .slice(0, 3)
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
                        {!isLoadingProducts && (
                            <li key="fp-more" className="news-list__more">
                                <Link to="/">Xem thêm</Link>
                            </li>
                        )}
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default NewsView;
