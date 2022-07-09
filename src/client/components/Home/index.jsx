import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useFetch } from '../../hooks/useFetch';

const Home = () => {
    const [response, fetch] = useFetch('/api/customers');

    useEffectOnce(() => {
        fetch('get');
    });

    return (
        <div>
            <h1>Home</h1>
            <pre>{JSON.stringify(response, null, 4)}</pre>
        </div>
    );
};

export { Home };
