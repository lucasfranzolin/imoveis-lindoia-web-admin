import { useCallback, useRef } from 'react';

import { useEffectOnce } from './useEffectOnce';

export const useIsMounted = () => {
    const ref = useRef(false);

    useEffectOnce(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    });

    const check = useCallback(() => ref.current, [ref]);

    return check;
};
