import { CustomAlertProps } from './types';

const InfoIcon = ({ color = '#1890ff' }: { color?: string }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: '8px', marginTop: '5px' }}
    >
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 16V12"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 8H12.01"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CustomAlert = (props: CustomAlertProps) => {
    const {
        iconColor = '#1890ff',
        backgroundColor = '#e6f4ff',
        textColor = '#000',
        message = '',
        borderLeftColor = '#fff',
    } = props || {};
    return (
        <div
            style={{
                background: backgroundColor, // light blue background
                borderLeft: `4px solid ${borderLeftColor}`, // blue left border
                display: 'flex',
                alignItems: 'flex-start',
                borderRadius: '4px',
                fontSize: '14px',
                color: textColor,
                textAlign: 'left',
            }}
        >
            <InfoIcon color={iconColor} />
            {message}
        </div>
    );
};

export default CustomAlert;
