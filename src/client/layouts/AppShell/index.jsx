import PropTypes from 'prop-types';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';
import { useEffectOnce } from '../../hooks/useEffectOnce';

const AppShell = ({ curSession, children }) => {
    const { session, setSession } = useContext(AuthContext);

    useEffectOnce(() => {
        setSession(curSession);
    });

    if (!session) return <span>Carregando sessao...</span>;

    return (
        <div>
            <pre>{JSON.stringify(session, null, 4)}</pre>
            {children}
        </div>
    );
};

AppShell.propTypes = {
    curSession: PropTypes.shape({
        email: PropTypes.string,
        sessionId: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
};

export { AppShell };
