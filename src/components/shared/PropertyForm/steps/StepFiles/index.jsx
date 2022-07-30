import { Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { useArray } from '../../../../../hooks/useArray';
import { GalleryPreview } from '../../../../ui/GalleryPreview';
import { InputDropArea } from '../../../../ui/InputDropArea';
import { BaseButtons } from '../../StepperActions/BaseButtons';
import { withGallery } from '../../utils';

const StepFiles = ({ initialValues, onPrevious, onSubmit }) => {
    const [
        previews,
        {
            push, //
            removeAt,
            set,
            clear,
        },
    ] = useArray(initialValues);

    const handleRemove = useCallback(
        (index) => {
            previews[index].file
                ? URL.revokeObjectURL(previews[index].url)
                : console.log('push index to array of images to delete in s3');
            removeAt(index);
        },
        [previews, removeAt]
    );

    const handleChange = (files) =>
        files.map(withGallery).forEach((i) => push(i));

    const handleNext = useCallback(() => {
        previews.forEach((preview) => {
            !!preview.file && URL.revokeObjectURL(preview.url);
        });
        onSubmit(previews);
    }, [previews, onSubmit]);

    return (
        <Stack alignItems="center" spacing={8}>
            {previews.length > 0 && (
                <GalleryPreview
                    data={previews}
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
            file: PropTypes.any,
            url: PropTypes.string,
            uuid: PropTypes.string,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepFiles };
