import PropTypes from 'prop-types';

import { useCustomerDetails } from '../../hooks/useCustomerDetails';
import { useEffectOnce } from '../../hooks/useEffectOnce';

const CustomerDetails = ({ id }) => {
    const [response, getDetails] = useCustomerDetails();

    useEffectOnce(() => {
        getDetails(id);
    });

    return (
        <div>
            <pre>{JSON.stringify(response, null, 4)}</pre>
        </div>
    );
};

CustomerDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export { CustomerDetails };
