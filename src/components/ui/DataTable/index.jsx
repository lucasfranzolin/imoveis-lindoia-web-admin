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
} from '@chakra-ui/react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/solid';
import PropTypes from 'prop-types';

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
    const handleClickRow = (row) => () => onClickRow(row);

    const handleClickEdit = (row) => (e) => {
        e.stopPropagation();
        onEdit(row);
    };

    const handleClickDelete = (row) => (e) => {
        e.stopPropagation();
        onDelete(row);
    };

    const handleSort = (accessor) => () => onSort(accessor);

    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr bg="gray.50" borderTopWidth={1} borderBottomWidth={1}>
                        {header.map((th) => (
                            <Th key={`th-${th.label}`}>
                                <Text as="span" verticalAlign="middle">
                                    {th.label}
                                </Text>
                                {th.sortable && (
                                    <IconButton
                                        display="inline-block"
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
                                )}
                            </Th>
                        ))}
                        <Th isNumeric></Th>
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
                                onClick={handleClickRow(row)}
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
                                        title="Editar"
                                        icon={<Icon as={PencilIcon} />}
                                        onClick={handleClickEdit(row)}
                                    />
                                    <IconButton
                                        variant="ghost"
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
                    <TableCaption>Tabela vazia.</TableCaption>
                )}
            </Table>
        </TableContainer>
    );
};

DataTable.propTypes = {
    header: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
            sortable: PropTypes.bool.isRequired,
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
