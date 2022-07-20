import {
    Box,
    Icon,
    IconButton,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import { ConfirmationDialog } from '../ui/ConfirmationDialog';

const DataTable = ({
    header,
    loading,
    onClickRow,
    onDelete,
    onEdit,
    onSort,
    order,
    rows,
    sortBy,
}) => {
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

    const handleSort = (accessor) => () => onSort(accessor);

    return (
        <>
            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            {header.map((th) => (
                                <Th
                                    key={`th-${th.label}`}
                                    display="inline-flex"
                                    alignItems="center"
                                    w="full"
                                    textColor={
                                        th.accessor === sortBy
                                            ? 'teal.500'
                                            : undefined
                                    }
                                >
                                    <Text>{th.label}</Text>
                                    <IconButton
                                        textColor="inherit"
                                        variant="unstyled"
                                        colorScheme={
                                            th.accessor === sortBy
                                                ? 'teal'
                                                : 'gray'
                                        }
                                        isRound
                                        size="xs"
                                        ml={1}
                                        icon={
                                            <Icon
                                                as={
                                                    order > 0
                                                        ? ArrowDownIcon
                                                        : ArrowUpIcon
                                                }
                                            />
                                        }
                                        onClick={handleSort(th.accessor)}
                                    />
                                </Th>
                            ))}
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
                                    {header.map((th, index) => {
                                        const key = `${row.uuid}-td-${index}`;
                                        const text = th.format
                                            ? th.render(row.props[th.accessor])
                                            : row.props[th.accessor];
                                        return <Td key={key}>{text}</Td>;
                                    })}
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
    header: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    onClickRow: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf([1, -1]).isRequired,
    rows: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
};

export { DataTable };
