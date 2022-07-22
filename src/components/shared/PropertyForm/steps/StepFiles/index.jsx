import { Box, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { InputDropArea } from '../../../../ui/InputDropArea';

const StepFiles = ({ initialValues, onPrevious, onSubmit }) => {
    const handleChange = (files) => {
        console.log(files);
    };

    return (
        <Stack alignItems="center" spacing={4}>
            <InputDropArea
                defaultFiles={initialValues}
                onChange={handleChange}
            />
            <Box w="full" borderWidth={1} h="400px">
                Galeria
            </Box>
        </Stack>
    );
};

StepFiles.propTypes = {
    initialValues: PropTypes.shape({
        downloadURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export { StepFiles };
