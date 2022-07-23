import { Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import { useArray } from '../../../../../hooks/useArray';
import { GalleryPreview } from '../../../../ui/GalleryPreview';
import { InputDropArea } from '../../../../ui/InputDropArea';
import { initState, withGallery } from './utils';

const StepFiles = ({ initialValues, onPrevious, onSubmit }) => {
    const [previews, { push, removeAt, set }] = useArray(
        initState(initialValues.downloadURLs)
    );

    useEffect(() => {
        console.log(previews);
    }, [previews]);

    const handleRemove = useCallback(
        (index) => {
            const ref = previews[index];
            ref instanceof File && URL.revokeObjectURL(ref.preview);
            removeAt(index);
        },
        [previews, removeAt]
    );

    const handleChange = (files) =>
        files.forEach((file) => push(withGallery(file)));

    return (
        <Stack alignItems="center" spacing={8}>
            <InputDropArea
                onChange={handleChange}
                options={{
                    accept: {
                        'image/*': ['.png', '.jpeg', '.jpg'],
                    },
                }}
            />
            {previews.length > 0 && (
                <GalleryPreview
                    data={previews}
                    onRemove={handleRemove}
                    onReorder={set}
                />
            )}
        </Stack>
    );
};

StepFiles.propTypes = {
    initialValues: PropTypes.shape({
        downloadURLs: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
            })
        ).isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepFiles };
