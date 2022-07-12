import PropTypes from 'prop-types';

const AppShell = ({ children }) => {
    return <>{children}</>;
};

AppShell.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppShell };
