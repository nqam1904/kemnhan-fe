import ImageAssets from '@/constants/ImagesAsset';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AboutComponents from '../about/view';
import './home.css';
import ProductList from './product-list';

function HomeView() {
    const [modal, setModal] = useState<boolean>(false);

    return (
        <div className="wrapper">
            <div className="landing" id="home">
                <img alt="bg" src={ImageAssets.bg3} />
            </div>
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
