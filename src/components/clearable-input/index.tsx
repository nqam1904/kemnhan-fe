import ImageAssets from '@/constants/ImagesAsset';
import React, { useMemo, useCallback } from 'react';

interface ClearableInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
}

const ClearableInput: React.FC<ClearableInputProps> = ({
    type = 'text',
    value = '',
    onChange,
    onClear,
    className = '',
    style,
    name,
    disabled = false,
    readOnly = false,
    ...rest
}) => {
    // Check if input has meaningful value
    const hasValue = useMemo(() => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (typeof value === 'number') return true;
        return Boolean(value);
    }, [value]);

    // Determine when to show clear button
    const showClear = useMemo(() => type !== 'password' && !disabled && !readOnly && hasValue, [type, disabled, readOnly, hasValue]);

    // Calculate input styles with proper padding
    const inputStyle = useMemo<React.CSSProperties>(() => ({
        ...style,
        ...(showClear && { paddingRight: '2.25rem' })
    }), [style, showClear]);

    // Create synthetic change event with all required methods
    const createChangeEvent = useCallback((newValue: string): React.ChangeEvent<HTMLInputElement> => ({
        target: {
            name: name || '',
            value: newValue,
            type: type || 'text'
        },
        currentTarget: {
            name: name || '',
            value: newValue,
            type: type || 'text'
        },
        preventDefault: () => { },
        stopPropagation: () => { },
        persist: () => { },
        nativeEvent: {} as Event,
        bubbles: false,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        timeStamp: Date.now(),
        type: 'change'
    } as React.ChangeEvent<HTMLInputElement>), [name, type]);

    // Handle clear button click
    const handleClear = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (onClear) {
            onClear();
            return;
        }

        if (onChange) {
            const changeEvent = createChangeEvent('');
            onChange(changeEvent);
        }
    }, [onClear, onChange, createChangeEvent]);

    // Clear button component
    const ClearButton = useMemo(() => {
        if (!showClear) return null;

        return (
            <button
                type="button"
                className="position-absolute border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
                style={CLEAR_BUTTON_STYLE}
                aria-label="Clear input"
                onClick={handleClear}
                tabIndex={-1}
            >
                <img
                    src={ImageAssets.ic_clear}
                    alt="Clear"
                    style={CLEAR_ICON_STYLE}
                />
            </button>
        );
    }, [showClear, handleClear]);

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
            {ClearButton}
        </div>
    );
};

// Styles constants for better maintainability
const CLEAR_BUTTON_STYLE: React.CSSProperties = {
    right: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    cursor: 'pointer'
};

const CLEAR_ICON_STYLE: React.CSSProperties = {
    width: '16px',
    height: '16px',
    objectFit: 'contain',
    display: 'block'
};

export default ClearableInput;


