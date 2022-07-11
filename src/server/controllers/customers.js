import { customersService } from '../services/customers';
import { errorHandler } from '../utils/error';

export async function paginate(context) {
    const { limit, order, page, sortBy } = context.req.query;
    try {
        const { data } = await customersService(context).paginate({
            limit,
            order,
            page,
            sortBy,
        });
        return context.res.json(data);
    } catch (err) {
        return errorHandler(err, context);
    }
}
