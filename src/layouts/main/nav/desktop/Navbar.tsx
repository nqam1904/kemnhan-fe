import { paths } from '@/routes/paths';
import { useGetPromotionsQuery } from '@/store/apis/promotions';
import ImageAssets from 'constants/ImagesAsset';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import resolveImageUrl from 'utils/image-url';
import '../Navbar.css';
import NavbarMobile from '../mobile/NavbarMobile';

interface Promotion {
    name: string;
    content: string;
    images: Array<{ key: string }>;
}

function Navbar() {
    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState<Promotion[]>([]);
    const [selectedNews, setSelectedNews] = useState<number>(0);
    const { data: promotionsData, isLoading } = useGetPromotionsQuery();

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {}, []);

    const handleClose = () => setShow(false);

    const result = !isLoading ? (
        data.map((item: any, index: any) => {
            if (selectedNews === index) {
                return (
                    <div key={index}>
                        <LazyLoadImage
                            effect="blur"
                            src={resolveImageUrl(`static/${item.images[0]?.key}`)}
                            alt={item.name}
                            width="300"
                            placeholderSrc={ImageAssets.logo}
                        />
                        <h3>{item.name}</h3>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                        ></p>
                    </div>
                );
            }
            return null;
        })
    ) : (
        <img src={ImageAssets.loading} alt="loading" width={200} />
    );

    return (
        <div className="nav" style={{ backgroundImage: `url(${ImageAssets.header})` }}>
            <div className="group-logo">
                {/* <img src={ImageAssets.logo} alt="logo" className="logo" /> */}
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo('home');
                    }}
                >
                    <>
                        <img src={ImageAssets.logo} alt="logo" className="logo1" />
                        <img
                            src={ImageAssets.kemnhanonline}
                            alt="kemnhanonline"
                            className="logo-title"
                        />
                    </>
                </Link>
            </div>
            <div className="links">
                <Link to="/">Trang chủ</Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo('product');
                    }}
                >
                    Sản phẩm
                </Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo('about');
                    }}
                >
                    Giới thiệu
                </Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo('footer');
                    }}
                >
                    Liên hệ
                </Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                        setSelectedNews(0);
                    }}
                >
                    Khuyến mãi
                </Link>

                <Link to={paths.main.cart}>
                    <div className="button-cart">
                        <img src={ImageAssets.icCart} alt="cart" className="ic_cart" />
                        <p className="title_cart">Giỏ hàng</p>
                    </div>
                </Link>
            </div>
            <NavbarMobile />

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Tin tức khuyến mại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content__news">
                        <div className="item__news">{result}</div>
                        <div className="list__news">
                            {data.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className="image__news"
                                    onClick={() => setSelectedNews(index)}
                                >
                                    <LazyLoadImage
                                        effect="blur"
                                        src={resolveImageUrl(`static/${item.images[0]?.key}`)}
                                        alt={item.name}
                                        width="200"
                                        placeholderSrc={ImageAssets.logo}
                                    />
                                </div>
                            ))}
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
