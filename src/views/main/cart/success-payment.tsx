import './Success.css';

import { useRouter } from '@/routes/hooks';
import ImageAssets from '@/constants/ImagesAsset';

function SuccessPayment() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="success">
      <div className="pyro">
        <div className="before" />
        <div className="after" />
      </div>
      <div className="form">
        <div className="border__logo">
          <img alt="logo" src={ImageAssets.kemnhanonline} className="title__logo" />
        </div>

        <img alt="success" src={ImageAssets.success} className="image__success" />

        <div className="form__title">
          <p>Bạn đã đặt đơn hàng thành công!</p>
        </div>

        <button type="button" className="form__button" onClick={handleGoHome}>
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}

export default SuccessPayment;
