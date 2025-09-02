import './Success.css';

import ImageAssets from '@/constants/ImagesAsset';

function SuccessPayment() {
    return (
        <div className="success">
            <div className="form">
                <div className="pyro">
                    <div className="before" />
                    <div className="after" />
                </div>
                <div className="border__logo">
                    <img alt="logo" src={ImageAssets.kemnhanonline} className="title__logo" />
                </div>
                <br />

                <img alt="success" src={ImageAssets.success} className="image__success" />
                <div className="form__title">
                    <br />
                    <p>Bạn đã đặt đơn hàng thành công!</p>
                </div>
                <div
                    className="form__button"
                    onClick={() => {
                        window.location.href = '/';
                    }}
                >
                    Quay lại trang chủ
                </div>
            </div>
        </div>
    );
}

export default SuccessPayment;
