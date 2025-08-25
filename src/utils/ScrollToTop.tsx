import ImageAssets from 'constants/ImagesAsset';
import { useCallback, useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = useCallback(() => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', toggleVisibility);
        return () => document.removeEventListener('scroll', toggleVisibility);
    }, [toggleVisibility]);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <div onClick={scrollToTop} className="scrollToTop" id="btnArrow">
                    <img src={ImageAssets.increase} width={40} alt="Go to top" />
                </div>
            )}
        </div>
    );
}
