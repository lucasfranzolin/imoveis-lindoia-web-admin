import {
    Heading,
    HStack,
    Stack,
    Text,
    useDisclosure,
    useToast,
    useUpdateEffect,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { useCustomerDelete } from '../../hooks/useCustomerDelete';
import { useCustomerDetails } from '../../hooks/useCustomerDetails';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';
import { DetailItem } from '../ui/DetailItem';
import { DetailsActions } from '../ui/DetailsActions';

const CustomerDetails = ({ id }) => {
    const router = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [{ data, loading }, getDetails] = useCustomerDetails();
    const [{ success }, _delete] = useCustomerDelete();

    useEffectOnce(() => {
        getDetails(id);
    });

    useUpdateEffect(() => {
        if (success) {
            toast({
                position: 'top',
                description: 'Cliente removido!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            router.push('/customers');
        }
    }, [success]);

    const handleEdit = () => {
        router.push(`/customers/${id}/edit`);
    };

    const handlePositive = () => {
        _delete(id);
        onClose();
    };

    return (
        <>
            <Stack
                spacing={4}
                bg="white"
                borderWidth={1}
                boxShadow="md"
                borderRadius="md"
                px={6}
                py={4}
            >
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading as="h4" size="md">
                        Detalhes do cliente
                    </Heading>
                    <DetailsActions onEdit={handleEdit} onDelete={onOpen} />
                </HStack>

                <DetailItem label="Nome" isLoaded={!loading}>
                    <Text>{data?.props.fullName}</Text>
                </DetailItem>
                <DetailItem label="Email" isLoaded={!loading}>
                    <Text>{data?.props.email}</Text>
                </DetailItem>
                <DetailItem label="Telefone" isLoaded={!loading}>
                    <Text>{data?.props.phone}</Text>
                </DetailItem>
                <DetailItem label="CPF" isLoaded={!loading}>
                    <Text>{data?.props.cpf}</Text>
                </DetailItem>
            </Stack>
            <ConfirmationDialog
                body="Você não pode desfazer essa ação depois."
                header={`Apagar cliente '${data?.props.fullName}'?`}
                isOpen={isOpen}
                onClose={onClose}
                onNegative={onClose}
                onPositive={handlePositive}
            />
        </>
    );
};

CustomerDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export { CustomerDetails };
