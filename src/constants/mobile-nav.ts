import ImageAssets from '@/constants/ImagesAsset';
import { paths } from '@/routes/paths';

export type MobileNavItem = { type: 'link' | 'hash'; to: string; label: string };
export const navItems: MobileNavItem[] = [
  { type: 'link', to: '/', label: 'Trang chủ' },
  { type: 'hash', to: '#product', label: 'Sản phẩm' },
  { type: 'hash', to: '#footer', label: 'Liên hệ' },
  { type: 'link', to: paths.main.news, label: 'Tin tức' },
];

export type PhoneContact = { tel: string; label: string };
export const phones: PhoneContact[] = [
  { tel: '02203844444', label: '02203 844 444' },
  { tel: '02203838838', label: '02203 838 838' },
  { tel: '0915241426', label: '0915 241 426' },
];

export type SocialLink = { id: string; image: string; text: string; link: string };
export const socials: SocialLink[] = [
  {
    id: 'youtube',
    image: ImageAssets.youtube,
    text: 'Youtube',
    link: 'https://www.youtube.com/channel/UCYhpfupnbbjrll1fbFxiZ1Q',
  },
  {
    id: 'facebook',
    image: ImageAssets.facebook,
    text: 'Facebook',
    link: 'https://www.facebook.com/kemnhantannha',
  },
  {
    id: 'instagram',
    image: ImageAssets.instagram,
    text: 'Instagram',
    link: 'https://www.instagram.com/kemnhanonline/',
  },
  { id: 'zalo', image: ImageAssets.zalo, text: 'Zalo', link: 'https://zalo.me/0973277739' },
  {
    id: 'tiktok',
    image: ImageAssets.tiktok,
    text: 'Tiktok',
    link: 'https://www.tiktok.com/@kemnhanonline?lang=vi-VN',
  },
];
