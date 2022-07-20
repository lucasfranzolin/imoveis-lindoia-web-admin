import { Box, HStack, Icon, IconButton, Select, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const OPTIONS = [10, 25, 50, 100];

const Pagination = ({
    subject,
    page,
    totalItems,
    totalPages,
    onNavigate,
    onChange,
}) => {
    const handleNavigate = (navigateTo) => () => {
        onNavigate(navigateTo);
    };

    const handleChange = (e) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <HStack spacing={4} fontSize="sm">
            <Text fontWeight="bold">
                Total de {subject}: {totalItems}
            </Text>
            <HStack spacing={4} flex={1} justifyContent="flex-end">
                <Box>
                    <Select size="sm" onChange={handleChange} borderRadius="md">
                        {OPTIONS.map((opt) => (
                            <option key={`pagination-opt-${opt}`} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </Select>
                </Box>
                <IconButton
                    isRound
                    size="sm"
                    icon={<Icon as={ChevronLeftIcon} />}
                    onClick={handleNavigate(page - 1)}
                    title="Anterior"
                    isDisabled={page === 1}
                />
                <Text>
                    {page} de {totalPages}
                </Text>
                <IconButton
                    isRound
                    size="sm"
                    icon={<Icon as={ChevronRightIcon} />}
                    onClick={handleNavigate(page + 1)}
                    title="Próxima"
                    isDisabled={page === totalPages}
                />
            </HStack>
        </HStack>
    );
};

Pagination.propTypes = {
    subject: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onNavigate: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export { Pagination };
