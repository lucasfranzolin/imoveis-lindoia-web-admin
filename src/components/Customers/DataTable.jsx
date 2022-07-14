import {
    Box,
    Button,
    Icon,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import { ConfirmationDialog } from '../ui/ConfirmationDialog';

const DataTable = ({ rows, loading, onDelete, onEdit, onClickRow }) => {
    const deleteRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClickRow = (id) => () => onClickRow(id);

    const handleClickEdit = (id) => (e) => {
        e.stopPropagation();
        onEdit(id);
    };

    const handleClickDelete = (row) => (e) => {
        e.stopPropagation();
        deleteRef.current = row;
        onOpen();
    };

    const handlePositive = () => {
        onClose();
        onDelete(deleteRef.current.uuid);
    };

    return (
        <>
            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>Telefone</Th>
                            <Th isNumeric>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {loading ? (
                            <Tr>
                                <Td colSpan="3">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Spinner />
                                    </Box>
                                </Td>
                            </Tr>
                        ) : (
                            rows.map((row) => (
                                <Tr
                                    key={row.uuid}
                                    onClick={handleClickRow(row.uuid)}
                                    _hover={{
                                        cursor: 'pointer',
                                        textColor: 'teal.500',
                                    }}
                                >
                                    <Td>{row.props.fullName}</Td>
                                    <Td>{row.props.email}</Td>
                                    <Td>{row.props.phone}</Td>
                                    <Td isNumeric>
                                        <IconButton
                                            variant="ghost"
                                            isRound
                                            title="Editar"
                                            icon={<Icon as={PencilIcon} />}
                                            onClick={handleClickEdit(row.uuid)}
                                        />
                                        <IconButton
                                            variant="ghost"
                                            isRound
                                            title="Remover"
                                            icon={<Icon as={TrashIcon} />}
                                            onClick={handleClickDelete(row)}
                                        />
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                    {rows.length === 0 && !loading && (
                        <TableCaption>Nenhum cliente cadastrado.</TableCaption>
                    )}
                </Table>
            </TableContainer>
            <ConfirmationDialog
                body="Você não pode desfazer essa ação depois."
                header={`Apagar cliente '${deleteRef.current?.props.fullName}'?`}
                isOpen={isOpen}
                onClose={onClose}
                onNegative={onClose}
                onPositive={handlePositive}
            />
        </>
    );
};

DataTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onClickRow: PropTypes.func.isRequired,
};

export { DataTable };
