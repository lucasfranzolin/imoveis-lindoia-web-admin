import * as types from './types';

export const initialState = {
    [types.ADDRESS]: null,
    [types.ADVERTISE]: null,
    [types.FEATURES]: null,
    [types.OWNER]: null,
};

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
        default:
            throw new Error();
    }
}
