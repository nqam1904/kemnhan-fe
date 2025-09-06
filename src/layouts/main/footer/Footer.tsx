import './Footer.css';

import { CONFIG } from '@/config-global';
import { phonesNumber } from '@/constants/enums';
import ImageAssets from '@/constants/ImagesAsset';

interface SocialItem {
    id: number;
    image: string;
    text: string;
    link: string;
}

const data: SocialItem[] = [
    {
        id: 1,
        image: ImageAssets.youtube,
        text: 'Youtube',
        link: 'https://www.youtube.com/channel/UCYhpfupnbbjrll1fbFxiZ1Q',
    },
    {
        id: 2,
        image: ImageAssets.facebook,
        text: 'Facebook',
        link: 'https://www.facebook.com/kemnhantannha',
    },
    {
        id: 3,
        image: ImageAssets.instagram,
        text: 'Instagram',
        link: 'https://www.instagram.com/kemnhanonline/',
    },
    {
        id: 4,
        image: ImageAssets.zalo,
        text: 'Zalo',
        link: 'https://zalo.me/0973277739',
    },
    {
        id: 5,
        image: ImageAssets.tiktok,
        text: 'Tiktok',
        link: 'https://www.tiktok.com/@kemnhanonline?lang=vi-VN',
    },
];

function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer__container">
                <div className="footer__col">
                    <div className="footer__brand">
                        <img src={ImageAssets.logo} width={93} height={100} alt="logo" />
                        <div className="footer__brand__text">
                            <div className="footer__title">KEM NHÃN</div>
                            <div className="footer__line" />
                            <div className="footer__info">
                                <div>
                                    Kem Nhãn Online
                                </div>
                                <div>
                                    Địa chỉ: Quận 3, Thành Phố Hồ Chí Minh
                                </div>
                                <div>
                                    Điện thoại: {phonesNumber.join(' - ')}
                                </div>
                                <div>   
                                    Website: <a className="footer__link" href={CONFIG.domain} target="_blank" rel="noreferrer">kemnhanonline.vn</a>
                                </div>
                                <div>
                                    Fanpage: <a className="footer__link" href="https://facebook.com/kemnhantannha" target="_blank" rel="noreferrer">Kemnhanonline</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer__col">
                    <div className="footer__title">MẠNG XÃ HỘI</div>
                    <div className="footer__line" />
                    <div className="footer__socials">
                        {data.map((item) => (
                            <a href={item.link} key={item.id} className="footer__social footer__social--big" target="_blank" rel="noreferrer">
                                <img src={item.image} width={25} height={25} alt={item.text} />
                                <span>{item.text}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div>© Bản quyền thuộc về Kem Nhãn Online</div>
            </div>
        </div>
    );
}

export default Footer;
