// ----------------------------------------------------------------------

export function localStorageGetItem(key: string, defaultValue?: any) {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            return defaultValue ?? null;
        }

        const value = window.localStorage.getItem(key);
        return value !== null ? value : (defaultValue ?? null);
    } catch {
        return defaultValue ?? null;
    }
}

export function localStorageSetItem(key: string, value: string) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    } catch {
        // noop
    }
}

export function localStorageRemoveItem(key: string) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
        }
    } catch {
        // noop
    }
}
