import './NotFoundPage.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function NotFoundPageComponent() {
    useEffect(() => {
        toast.info('Không tìm thấy trang này!');
    }, []);
    return (
        <div className="notfoundpage">
            <ToastContainer autoClose={1000} />
            <p className="title_notfound">404</p>
            <p className="oops">Oops! không tìm thấy trang này!</p>
            <Link className="notfound_btn" to="/trang-chu">
                Quay về
            </Link>
        </div>
    );
}

export default NotFoundPageComponent;
