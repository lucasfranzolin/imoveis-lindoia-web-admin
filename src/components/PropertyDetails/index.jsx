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

import { useEffectOnce } from '../../hooks/useEffectOnce';
// import { usePropertyDelete } from '../../hooks/usePropertyDelete';
import { usePropertyDetails } from '../../hooks/usePropertyDetails';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';
import { DetailItem } from '../ui/DetailItem';
import { DetailsActions } from '../ui/DetailsActions';

const PropertyDetails = ({ id }) => {
    const router = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [{ data, loading }, getDetails] = usePropertyDetails();
    // const [{ success }, _delete] = usePropertyDelete();

    useEffectOnce(() => {
        getDetails(id);
    });

    // useUpdateEffect(() => {
    //     if (success) {
    //         toast({
    //             position: 'top',
    //             description: 'Cliente removido!',
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //         router.push('/customers');
    //     }
    // }, [success]);

    const handleEdit = () => {
        router.push(`/properties/${id}/edit`);
    };

    const handlePositive = () => {
        // _delete(id);
        onClose();
    };

    return (
        <>
            <Stack spacing={4}>
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading as="h4" size="md">
                        Detalhes do cliente
                    </Heading>
                    <DetailsActions onEdit={handleEdit} onDelete={onOpen} />
                </HStack>
                <pre>{JSON.stringify(data, null, 4)}</pre>
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

PropertyDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export { PropertyDetails };
