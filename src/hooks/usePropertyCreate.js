import { useUpdateEffect } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

import { useFetch } from './useFetch';

export const usePropertyCreate = () => {
    const previewsRef = useRef();
    const [id, setId] = useState(null);
    const [{ success: created, data, loading }, fetch] =
        useFetch('/api/properties');
    const [{ loading: uploading, ...rest }, upload] = useFetch(
        `/api/properties/${id}/media`
    );

    useUpdateEffect(() => {
        if (!!id) {
            const formData = new FormData();
            previewsRef.current.forEach(({ file }) => {
                formData.append('files', file);
            });
            const headers = {
                'Content-Type': 'multipart/form-data',
            };
            upload('post', formData, { headers });
        }
    }, [id, upload]);

    useUpdateEffect(() => {
        if (created) {
            setId(data.uuid);
        }
    }, [created, data]);

    const submit = useCallback(
        (body, previews) => {
            previewsRef.current = previews;
            fetch('post', body);
        },
        [fetch]
    );

    return [
        {
            loading: loading || uploading,
            ...rest,
        },
        submit,
    ];
};
