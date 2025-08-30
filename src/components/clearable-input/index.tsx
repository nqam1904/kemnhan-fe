import ImageAssets from '@/constants/ImagesAsset';
import React, { useMemo } from 'react';

type ClearableInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onClear?: () => void;
};

const ClearableInput: React.FC<ClearableInputProps> = (props) => {
    const {
        type,
        value,
        onChange,
        onClear,
        className,
        style,
        name,
        disabled,
        readOnly,
        ...rest
    } = props;

    const isPassword = type === 'password';
    const showClear = !isPassword && !disabled && !readOnly && !!(value as string | number);

    const inputStyle = useMemo<React.CSSProperties>(() => {
        const base: React.CSSProperties = { ...style };
        if (showClear) base.paddingRight = '2.25rem';
        return base;
    }, [style, showClear]);

    const handleClear = () => {
        if (onClear) {
            onClear();
            return;
        }
        if (onChange) {
            const syntheticEvent = {
                target: { name, value: '' },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        }
    };

    return (
        <div className="position-relative">
            <input
                {...rest}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={className}
                style={inputStyle}
                disabled={disabled}
                readOnly={readOnly}
            />
            {showClear ? (
                <button
                    type="button"
                    className="position-absolute border-0 bg-transparent p-0"
                    style={{ right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}
                    aria-label="Clear"
                    onClick={handleClear}
                >
                    <img src={ImageAssets.ic_clear} alt="clear" width={16} height={16} />
                </button>
            ) : null}
        </div>
    );
};

export default ClearableInput;


