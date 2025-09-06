import './home.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';
import { useMemo, useState, useEffect } from 'react';
import { useGetCarouselsQuery } from '@/store/apis/carousel';

import AboutView from '../about/view';
import ProductList from './product-list';

function HomeView() {
    const [modal, setModal] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const { data: carousels = [] } = useGetCarouselsQuery();
    const bannerUrls = useMemo(() => {
        const list = Array.isArray(carousels) ? carousels : [];
        const sources = list
            .map((c: any) => c?.image?.url || (c?.image?.key ? resolveImageUrl(c?.image?.key) : ''))
            .filter((src: string) => Boolean(src));
        return sources;
    }, [carousels]);

    // Auto-rotate banner images without using react-bootstrap Carousel
    useEffect(() => {
        if (!bannerUrls.length) {
            setActiveIndex(0);
            return () => { };
        }
        const id = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % bannerUrls.length);
        }, 3000);
        return () => window.clearInterval(id);
    }, [bannerUrls]);

    return (
        <div className="wrapper">
            <div className="landing" id="home">
                <img
                    className="landing__img"
                    alt="bg"
                    src={bannerUrls.length ? bannerUrls[activeIndex] : ImageAssets.bg3}
                />
            </div>
            <ProductList />
            <AboutView />
            <Modal
                show={modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => {
                    setModal(false);
                }}
            >
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Kemnhanonline thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Kính chúc quý khách 1 năm mới an khang thịnh vượng, tấn tài tấn lộc, vạn sự như
                    ý
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HomeView;
