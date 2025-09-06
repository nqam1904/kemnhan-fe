import { useState, useEffect } from 'react';
import ImageAssets from '@/constants/ImagesAsset';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
            setIsVisible(scrollTop > 100);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleScrollToTop = () => {
        const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
        if (supportsSmoothScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Fallback for older browsers (e.g., older Safari/iOS)
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    };

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button
                    type="button"
                    onClick={handleScrollToTop}
                    className="scrollToTop"
                    id="btnArrow"
                    aria-label="Scroll to top"
                >
                    <img src={ImageAssets.upwardsArrow} width={20} height={20} alt="Go to top" />
                </button>
            )}
        </div>
    );
}


