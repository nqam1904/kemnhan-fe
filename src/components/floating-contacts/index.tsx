import { phonesNumber } from "@/constants/enums";


export default function FloatingContacts() {
    return (
        <div className="floating-contacts">
            {phonesNumber.map((p, index) => (
                <a key={index} href={`tel:${p}`} className="floating-contact-button" aria-label={`Gọi ${p}`}>
                    <span className="fc-icon">
                        <span className="fc-pulse fc-pulse--1" />
                        <span className="fc-pulse fc-pulse--2" />
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.99-.25c1.09.36 2.27.55 3.49.55a1 1 0 011 1V21a1 1 0 01-1 1C11.4 22 2 12.6 2 1a1 1 0 011-1h3.52a1 1 0 011 1c0 1.22.19 2.4.55 3.49a1 1 0 01-.25.99l-2.2 2.2z" fill="#fff" />
                        </svg>
                    </span>
                    <span>{p}</span>
                </a>
            ))}
        </div>
    );
}


