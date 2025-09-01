import arrowImg from '@/assets/images/arrow.png';
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', toggleVisibility);
        return () => document.removeEventListener('scroll', toggleVisibility);
    }, [toggleVisibility]);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <div onClick={scrollToTop} className="scrollToTop" id="btnArrow">
                    <img src={arrowImg} width={20} height={20} alt="Go to top" />
                </div>
            )}
        </div>
    );
}


