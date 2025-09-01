import { paths } from '@/routes/paths';
import { useGetPromotionsQuery } from '@/store/apis/promotions';
import type { Promotion } from '@/store/types/promotion';
import ImageAssets from 'constants/ImagesAsset';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import resolveImageUrl from 'utils/image-url';
import '../Navbar.css';
import NavbarMobile from '../mobile/NavbarMobile';

function Navbar() {
    const [show, setShow] = useState<boolean>(false);
    const [selectedNews, setSelectedNews] = useState<number>(0);
    const { data: promotionsData, isLoading } = useGetPromotionsQuery();

    const promotions: Promotion[] = useMemo(() => promotionsData ?? [], [promotionsData]);

    const scrollToId = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const makeNavHandler = useCallback(
        (id: string) =>
            (e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToId(id);
            },
        [scrollToId]
    );

    const handleOpenPromotion = useCallback(
        (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setShow(true);
            setSelectedNews(0);
        },
        []
    );

    const handleClose = useCallback(() => setShow(false), []);

    const selectedPromotion = promotions[selectedNews];
    const selectedPromotionImage = useMemo(() => {
        const imageKey = selectedPromotion?.images?.[0]?.key;
        return imageKey ? resolveImageUrl(`static/${imageKey}`) : ImageAssets.logo;
    }, [selectedPromotion]);

    const navItems = useMemo(
        () => [
            { label: 'Trang chủ', id: 'home' },
            { label: 'Sản phẩm', id: 'product' },
            { label: 'Liên hệ', id: 'footer' },
        ],
        []
    );

    return (
        <div className="nav" style={{ backgroundImage: `url(${ImageAssets.header})` }}>
            <div className="group-logo">
                <Link to="/" onClick={makeNavHandler('home')}>
                    <img src={ImageAssets.logo} alt="logo" className="logo1" />
                    <img src={ImageAssets.kemnhanonline} alt="kemnhanonline" className="logo-title" />
                </Link>
            </div>
            <div className="links">
                {navItems.map((item) => (
                    <Link key={item.id} to="/" onClick={makeNavHandler(item.id)}>
                        {item.label}
                    </Link>
                ))}
                <Link to={paths.main.news}>Khuyến mãi</Link>

                <Link to={paths.main.cart}>
                    <div className="button-cart">
                        <img src={ImageAssets.icCart} alt="cart" className="ic_cart" />
                        <p className="title_cart">Giỏ hàng</p>
                    </div>
                </Link>
            </div>
            <NavbarMobile />

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tin tức khuyến mại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content__news">
                        <div className="item__news">
                            {isLoading ? (
                                <img src={ImageAssets.loading} alt="loading" width={200} />
                            ) : selectedPromotion ? (
                                <div>
                                    <LazyLoadImage
                                        effect="blur"
                                        src={selectedPromotionImage}
                                        alt={selectedPromotion.name}
                                        width="300"
                                        placeholderSrc={ImageAssets.logo}
                                    />
                                    <h3>{selectedPromotion.name}</h3>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: selectedPromotion.content ?? '',
                                        }}
                                    ></p>
                                </div>
                            ) : null}
                        </div>
                        <div className="list__news">
                            {promotions.map((item: Promotion, index: number) => {
                                const imageKey = item.images?.[0]?.key;
                                const thumbSrc = imageKey
                                    ? resolveImageUrl(`static/${imageKey}`)
                                    : ImageAssets.logo;

                                return (
                                    <div
                                        key={`${item.name}-${index}`}
                                        className="image__news"
                                        onClick={() => setSelectedNews(index)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                                            if (e.key === 'Enter' || e.key === ' ') setSelectedNews(index);
                                        }}
                                    >
                                        <LazyLoadImage
                                            effect="blur"
                                            src={thumbSrc}
                                            alt={item.name}
                                            width="200"
                                            placeholderSrc={ImageAssets.logo}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Modal.Body>

                <div className="footer__modal">
                    <img src={ImageAssets.logo} width={25} alt="logo small" />
                    <span>Kemnhanonline</span>
                </div>
            </Modal>
        </div>
    );
}

export default Navbar;
