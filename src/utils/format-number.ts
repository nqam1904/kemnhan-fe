// ----------------------------------------------------------------------

/*
 * Locale-free number formatting utilities
 */

export type InputNumberValue = string | number | null | undefined;

type Options = Intl.NumberFormatOptions | undefined;

const DEFAULT_CURRENCY = 'USD';

const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    VND: '₫',
    CNY: '¥',
    KRW: '₩',
    AUD: 'A$',
    CAD: 'C$',
    SGD: 'S$',
    THB: '฿',
    INR: '₹',
};

function getCurrencySymbol(code?: string): string {
    if (!code) return '';
    const upper = code.toUpperCase();
    return CURRENCY_SYMBOLS[upper] || upper;
}

function processInput(inputValue: InputNumberValue): number | null {
    if (inputValue == null || Number.isNaN(inputValue)) return null;
    return Number(inputValue);
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputNumberValue, options?: Options) {
    const number = processInput(inputValue);
    if (number === null) return '';

    const minimumFractionDigits = options?.minimumFractionDigits ?? 0;
    const maximumFractionDigits = options?.maximumFractionDigits ?? 2;
    const useGrouping = (options as any)?.useGrouping !== false; // mimic Intl option if present

    return formatNumberNoLocale(number, {
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping,
    });
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputNumberValue, options?: Options) {
    const number = processInput(inputValue);
    if (number === null) return '';

    const minimumFractionDigits = options?.minimumFractionDigits ?? 0;
    const maximumFractionDigits = options?.maximumFractionDigits ?? 2;
    const currencyCode = options?.currency || DEFAULT_CURRENCY;
    const symbol = getCurrencySymbol(currencyCode);

    const formatted = formatNumberNoLocale(number, {
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping: (options as any)?.useGrouping !== false,
    });

    return `${symbol}${formatted}`;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputNumberValue, options?: Options) {
    const number = processInput(inputValue);
    if (number === null) return '';

    const minimumFractionDigits = options?.minimumFractionDigits ?? 0;
    const maximumFractionDigits = options?.maximumFractionDigits ?? 1;
    const formatted = formatNumberNoLocale(number / 100, {
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping: (options as any)?.useGrouping !== false,
    });

    return `${formatted}%`;
}

// ----------------------------------------------------------------------

export function fCurrencyByLocale(
    inputValue: InputNumberValue,
    formatLocale?: { code: string; currency: string },
    options?: Options
) {
    const number = processInput(inputValue);
    if (number === null) return '';

    const minimumFractionDigits = options?.minimumFractionDigits ?? 0;
    const maximumFractionDigits = options?.maximumFractionDigits ?? 2;
    const currencyCode = formatLocale?.currency || options?.currency || DEFAULT_CURRENCY;
    const symbol = getCurrencySymbol(currencyCode);

    const formatted = formatNumberNoLocale(number, {
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping: (options as any)?.useGrouping !== false,
    });

    return `${symbol}${formatted}`.replace(/\s+/g, '');
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputNumberValue, options?: Options) {
    const number = processInput(inputValue);
    if (number === null) return '';

    const abs = Math.abs(number);
    const maximumFractionDigits = options?.maximumFractionDigits ?? 2;

    const units: { value: number; suffix: string }[] = [
        { value: 1e12, suffix: 't' },
        { value: 1e9, suffix: 'b' },
        { value: 1e6, suffix: 'm' },
        { value: 1e3, suffix: 'k' },
    ];

    const found = units.find(unit => abs >= unit.value);
    if (found) {
        const val = number / found.value;
        const formatted = formatNumberNoLocale(val, {
            minimumFractionDigits: 0,
            maximumFractionDigits,
            useGrouping: false,
        });
        return `${formatted}${found.suffix}`;
    }

    return formatNumberNoLocale(number, {
        minimumFractionDigits: 0,
        maximumFractionDigits,
        useGrouping: true,
    });
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputNumberValue) {
    const number = processInput(inputValue);
    if (number === null || number === 0) return '0 bytes';

    const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
    const decimal = 2;
    const baseValue = 1024;

    const index = Math.floor(Math.log(number) / Math.log(baseValue));
    const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

    return fm;
}

// ----------------------------------------------------------------------

type FormatNumberInternalOptions = {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
    useGrouping?: boolean;
};

function formatNumberNoLocale(value: number, opts: FormatNumberInternalOptions): string {
    const { minimumFractionDigits, maximumFractionDigits, useGrouping = true } = opts;

    if (!Number.isFinite(value)) return '';

    const sign = value < 0 ? '-' : '';
    const absolute = Math.abs(value);

    // Round using maximumFractionDigits, then trim to minimumFractionDigits
    const fixed =
        maximumFractionDigits >= 0 ? absolute.toFixed(maximumFractionDigits) : String(absolute);
    let [intPart, fracPart = ''] = fixed.split('.');

    if (useGrouping) {
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (maximumFractionDigits > 0) {
        // Remove trailing zeros but keep at least minimumFractionDigits
        fracPart = fracPart.replace(/0+$/g, '');
        if (fracPart.length < minimumFractionDigits) {
            fracPart = fracPart.padEnd(minimumFractionDigits, '0');
        }
    } else {
        fracPart = '';
    }

    return fracPart ? `${sign}${intPart}.${fracPart}` : `${sign}${intPart}`;
}
