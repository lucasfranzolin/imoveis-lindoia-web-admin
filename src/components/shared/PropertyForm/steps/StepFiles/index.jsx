import { Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { useArray } from '../../../../../hooks/useArray';
import { GalleryPreview } from '../../../../ui/GalleryPreview';
import { InputDropArea } from '../../../../ui/InputDropArea';
import { BaseButtons } from '../../StepperActions/BaseButtons';
import { initState, withGallery } from './utils';

const StepFiles = ({ initialValues, onPrevious, onSubmit }) => {
    const [
        previews,
        {
            push, //
            removeAt,
            set,
            clear,
            updateAt,
        },
    ] = useArray(initState(initialValues));

    const handleRemove = useCallback(
        (index, isFile) => {
            if (isFile) URL.revokeObjectURL(previews[index].url);
            removeAt(index);
        },
        [previews, removeAt]
    );

    const handleChange = (files) =>
        files.map(withGallery).forEach((i) => push(i));

    const handleSubmitMetadata = useCallback(
        (index, metadata) => {
            updateAt(index, {
                ...previews[index],
                ...metadata,
            });
        },
        [previews, updateAt]
    );

    const handleNext = useCallback(() => {
        previews.forEach((preview) => {
            preview.prevIndex < 0 && URL.revokeObjectURL(preview.url);
        });
        onSubmit(previews);
    }, [previews, onSubmit]);

    return (
        <Stack alignItems="center" spacing={8}>
            {previews.length > 0 && (
                <GalleryPreview
                    data={previews}
                    onSubmitMetadata={handleSubmitMetadata}
                    onRemove={handleRemove}
                    onReorder={set}
                    onClear={clear}
                />
            )}
            <InputDropArea
                onChange={handleChange}
                options={{
                    accept: {
                        'image/*': ['.png', '.jpeg', '.jpg'],
                    },
                    maxSize: 1 * 1024 * 1024, // 1 MB
                }}
            />
            <BaseButtons onNegative={onPrevious} onPositive={handleNext} />
        </Stack>
    );
};

StepFiles.propTypes = {
    initialValues: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            index: PropTypes.number,
            downloadUrl: PropTypes.string,
            fullPath: PropTypes.string,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepFiles };
