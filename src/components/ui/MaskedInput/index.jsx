import { Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { cpf, phone } from './masks';

const MaskedInput = ({ mask, ...props }) => {
    const handleKeyUp = (_mask) => (e) => {
        const masksMap = {
            phone,
            cpf,
        };
        return masksMap[_mask](e);
    };

    return <Input onKeyUp={handleKeyUp(mask)} {...props} />;
};

MaskedInput.propTypes = {
    mask: PropTypes.oneOf('phone', 'cpf'),
};

export { MaskedInput };
