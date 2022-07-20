import { Select, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SelectAsync = ({ children, isDisabled, isLoading, icon, ...rest }) => {
    return (
        <Select
            isDisabled={isLoading || isDisabled}
            icon={isLoading ? <Spinner /> : icon}
            {...rest}
        >
            {isLoading || children.length === 0 ? (
                <option disabled value="">
                    Carregando...
                </option>
            ) : (
                children
            )}
        </Select>
    );
};

SelectAsync.propTypes = {
    icon: PropTypes.node,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
};

SelectAsync.defaultProps = {
    icon: undefined,
    isDisabled: false,
    isLoading: false,
};

export { SelectAsync };
