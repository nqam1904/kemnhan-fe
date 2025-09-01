import ImageAssets from '@/constants/ImagesAsset';
import { settingsApi } from '@/store/apis/settings';
import resolveImageUrl from '@/utils/image-url';
import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import AboutComponents from '../about/view';
import './home.css';
import ProductList from './product-list';

function HomeView() {
    const [modal, setModal] = useState<boolean>(false);

    const { data: settings = [] } = settingsApi.useGetSettingsQuery();
    const bannerUrls = useMemo(() => {
        const list = Array.isArray(settings) ? settings : [];
        const media = list.find((s: any) => String(s.key || '').toLowerCase().includes('media'));
        if (!media || !media.value) return [] as string[];
        try {
            const parsed = JSON.parse(media.value);
            if (Array.isArray(parsed)) return parsed.map((k: any) => resolveImageUrl(`${k}`));
        } catch (_e) { }
        const parts = String(media.value).split(',').map((s) => s.trim()).filter(Boolean);
        return parts.length ? parts.map((k) => resolveImageUrl(`${k}`)) : [];
    }, [settings]);

    const carousel = useMemo(() => {
        if (!bannerUrls.length) return null;
        return (
            <div className="landing" id="home">
                <Carousel interval={3000} indicators pause={false} slide={false}>
                    {bannerUrls.map((src, idx) => (
                        <Carousel.Item key={`${src}-${idx}`}>
                            <img alt={`bg-${idx}`} src={src} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        );
    }, [bannerUrls]);

    return (
        <div className="wrapper">
            {carousel || (
                <div className="landing" id="home">
                    <img alt="bg" src={ImageAssets.bg3} />
                </div>
            )}
            <ProductList />
            <AboutComponents />
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
