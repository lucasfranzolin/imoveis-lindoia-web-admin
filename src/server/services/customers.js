import { getHttp } from '../utils/http';
import { getSearchParams } from '../utils/pagination';

export const customersService = (context) => {
    const http = getHttp(context);
    return {
        paginate: (query) => {
            return http.get(`/customers?${getSearchParams(query)}`);
        },
        save: ({ email, phone, fullName }) => {
            return http.post('/customers', {
                email,
                phone,
                fullName,
            });
        },
    };
};
