import { Skeleton, Stack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DetailItem = ({ label, children, isLoaded }) => {
    return (
        <Stack spacing={0}>
            <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="sm"
                textColor="teal.500"
            >
                {label}
            </Text>
            <Skeleton isLoaded={isLoaded}>{children}</Skeleton>
        </Stack>
    );
};

DetailItem.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    isLoaded: PropTypes.bool.isRequired,
};

export { DetailItem };
