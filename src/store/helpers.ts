import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { TResponseErrorWithMessage } from './types/error';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is TResponseErrorWithMessage {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        (typeof (error as any).message === 'string' || Array.isArray(error.message))
    );
}
