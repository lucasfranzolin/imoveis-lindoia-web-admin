import { getHttp } from '../utils/http';

export const customersService = (context) => {
    const http = getHttp(context);
    return {
        paginate: ({ limit, order, page, sortBy }) => {
            return http.get('/customers', {
                params: {
                    limit,
                    order,
                    page,
                    sortBy,
                },
            });
        },
        save: ({ email, phone, fullName }) => {
            return http.post('/customers', {
                data: {
                    email,
                    phone,
                    fullName,
                },
            });
        },
    };
};
