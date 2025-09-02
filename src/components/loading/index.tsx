import { Spinner } from 'react-activity';

export default function Loading() {
    return (
        <div className="loading">
            <Spinner size={32} speed={1} animating className="spinner" />
        </div>
    );
}
