import ImageAssets from '@/constants/ImagesAsset';
import './about.css';

function AboutComponents() {
    return (
        <section className="py-5 about-hero-bg" id="about-hero">
            <div className="container text-center">
                <h2 className="fw-bold text-uppercase mb-3">
                    GIAO DỊCH DỄ DÀNG VỚI kEMNHANONLINE.VN
                </h2>
                <p className="text-muted mb-4">
                    Mua sắm trực tuyến Kem Nhãn Online, Chúng tôi mang đến cho bạn sự thuận tiện
                    và hoàn toàn yên tâm khi đặt hàng.
                </p>
                <div className="position-relative">
                    <img
                        alt="banner about"
                        src={ImageAssets.menu}
                        className="img-fluid d-block mx-auto"
                        style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutComponents;
