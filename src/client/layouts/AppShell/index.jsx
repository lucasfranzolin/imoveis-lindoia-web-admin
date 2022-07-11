import PropTypes from 'prop-types';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';

const AppShell = ({ children }) => {
    const { logout } = useContext(AuthContext);

    return (
        <>
            <button onClick={logout}>logout</button>
            {children}
        </>
    );
};

AppShell.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppShell };
