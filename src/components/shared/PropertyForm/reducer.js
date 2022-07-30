import * as types from './types';
import { initState } from './utils';

export function reducer(state, { type, payload }) {
    switch (type) {
        case types.ADDRESS:
            return {
                ...state,
                [types.ADDRESS]: payload,
            };
        case types.ADVERTISE:
            return {
                ...state,
                [types.ADVERTISE]: payload,
            };
        case types.LEGAL:
            return {
                ...state,
                [types.LEGAL]: payload,
            };
        case types.FEATURES:
            return {
                ...state,
                [types.FEATURES]: payload,
            };
        case types.OWNER:
            return {
                ...state,
                [types.OWNER]: payload,
            };
        case types.FILES:
            return {
                ...state,
                [types.FILES]: payload,
            };
        case types.RESET:
            return initState(payload);
        default:
            throw new Error(`Can't dispatch type '${type}'`);
    }
}
