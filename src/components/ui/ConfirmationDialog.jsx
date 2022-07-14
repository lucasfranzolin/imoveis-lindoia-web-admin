import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const ConfirmationDialog = ({ header, body, isOpen, onClose, onPositive }) => {
    // const cancelRef = useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            // leastDestructiveRef={cancelRef}
            onClose={onClose}
            blockScrollOnMount={true}
            motionPreset="slideInBottom"
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {header}
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>{body}</AlertDialogBody>
                <AlertDialogFooter>
                    <Button
                        // ref={cancelRef}
                        onClick={onClose}
                    >
                        Não
                    </Button>
                    <Button colorScheme="teal" onClick={onPositive} ml={3}>
                        Sim
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

ConfirmationDialog.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPositive: PropTypes.func.isRequired,
};

export { ConfirmationDialog };
