import './news.css';

import dayjs from 'dayjs';
import { paths } from '@/routes/paths';
import { Helmet } from 'react-helmet-async';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Placeholder } from 'react-bootstrap';
import { useGetProductsQuery } from '@/store/apis/products';
import { useGetPromotionQuery, useGetPromotionsQuery } from '@/store/apis/promotions';

function NewsDetailView() {
    const { id } = useParams<{ id: string }>();
    const { data: news, isLoading } = useGetPromotionQuery({ id: id as string }, { skip: !id });
    const { data: promotions = [], isLoading: isLoadingPromotions } = useGetPromotionsQuery();
    const { data: products = [], isLoading: isLoadingProducts } = useGetProductsQuery();

    const imageKey = news?.images?.[0]?.key;
    const cover = imageKey ? resolveImageUrl(`${imageKey}`) : ImageAssets.logo;
    const createdAtSrc: any = (news as any)?.createDate || (news as any)?.createdAt || '';
    const createdAt = createdAtSrc ? dayjs(createdAtSrc) : null;
    const createdDay = createdAt && createdAt.isValid() ? createdAt.format('DD') : '';
    const createdMonth = createdAt && createdAt.isValid() ? `Th${createdAt.format('MM')}` : '';

    const title = news?.name || 'Tin tức';

    return (
        <div id="news" className="news-page">
            <Helmet>
                <title>{title}</title>
                <meta name="og:title" content={title} />
            </Helmet>
            <div className="news-page__container">
                <div className="news-page__main">
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link as any} linkProps={{ to: '/' }}>
                            Trang chủ
                        </Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link as any} linkProps={{ to: paths.main.news }}>
                            Tin tức
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                    </Breadcrumb>

                    <article className="news-detail">
                        <h1 className="news-detail__title">{title}</h1>
                        {isLoading ? (
                            <div style={{ width: '100%', paddingTop: '56%', background: '#e9ecef' }} />
                        ) : (
                            <div className="news-detail__thumb">
                                <img src={cover} alt={title} />
                                <div className="news-card__date">
                                    <div className="news-card__date-day">{createdDay}</div>
                                    <div className="news-card__date-month">{createdMonth}</div>
                                </div>
                            </div>
                        )}
                        <div
                            className="news-detail__content"
                            dangerouslySetInnerHTML={{ __html: news?.content || '' }}
                        />
                    </article>
                </div>

                <aside className="news-page__sidebar">
                    <h3 className="news-page__sidebar-title">Bài viết mới</h3>
                    <ul className="news-list">
                        {isLoadingPromotions && (
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
                        {!isLoadingPromotions &&
                            promotions.slice(0, 5).map((item: any) => {
                                const key = item?.images?.[0]?.key;
                                const img = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;
                                return (
                                    <li key={`latest-${String(item.id)}`} className="news-list__item">
                                        <Link to={paths.main.newsDetail(item.id)}>
                                            <img src={img} alt={item.name} />
                                        </Link>
                                        <span>
                                            <Link to={paths.main.newsDetail(item.id)}>{item.name}</Link>
                                        </span>
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

export default NewsDetailView;


