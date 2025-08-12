import React, { Component } from 'react';
import ImageAssets from '../../../constants/ImagesAsset';
import './Footer.css';

const data = [
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
class Footer extends Component {
    render() {
        return (
            <div className="footer" id="footer">
                <div className="list-item">
                    <img src={ImageAssets.logo} width={93} height={100} alt="logo" />
                    {data.map((item, index) => {
                        return (
                            <a href={item.link} key={index} className="item-footer">
                                <img src={item.image} key={index} width={25} height={25} alt={item.text} />
                                <p className="text-item">{item.text}</p>
                            </a>
                        );
                    })}

                    <>
                        <a href="tel:0977667866" className="item-footer">
                            <img src={ImageAssets.phoneCall} width={25} height={25} alt="phone" />
                            <p className="text-item">0977667866</p>
                        </a>
                        <a href="tel:0973277739" className="item-footer">
                            <img src={ImageAssets.phoneCall} width={25} height={25} alt="phone" />
                            <p className="text-item">0973277739</p>
                        </a>
                    </>
                </div>
            </div>
        );
    }
}

export default Footer;
