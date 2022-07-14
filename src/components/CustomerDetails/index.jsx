import { Heading, Stack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useCustomerDetails } from '../../hooks/useCustomerDetails';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { format } from '../../utils/phone';
import { DetailItem } from '../shared/DetailItem';

const CustomerDetails = ({ id }) => {
    const [{ data, loading }, getDetails] = useCustomerDetails();

    useEffectOnce(() => {
        getDetails(id);
    });

    return (
        <Stack spacing={8}>
            <Heading>Detalhes do cliente</Heading>
            <Stack
                bg="white"
                shadow="md"
                borderWidth={1}
                borderRadius="md"
                p={8}
            >
                <DetailItem label="Nome" isLoaded={!loading}>
                    <Text>{data?.props.fullName}</Text>
                </DetailItem>
                <DetailItem label="Email" isLoaded={!loading}>
                    <Text>{data?.props.email}</Text>
                </DetailItem>
                <DetailItem label="Telefone" isLoaded={!loading}>
                    <Text>{format(data?.props.phone)}</Text>
                </DetailItem>
            </Stack>
        </Stack>
    );
};

CustomerDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export { CustomerDetails };
