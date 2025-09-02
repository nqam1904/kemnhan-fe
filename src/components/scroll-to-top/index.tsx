import arrowImg from '@/assets/images/arrow.png';
import { useState, useEffect, useCallback } from 'react';

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
                <button
                    type="button"
                    onClick={scrollToTop}
                    className="scrollToTop"
                    id="btnArrow"
                    aria-label="Scroll to top"
                >
                    <img src={arrowImg} width={20} height={20} alt="Go to top" />
                </button>
            )}
        </div>
    );
}


