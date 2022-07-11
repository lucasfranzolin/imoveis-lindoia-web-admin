import { customersService } from '../services/customers';
import { errorHandler } from '../utils/error';

export async function paginate(req, res) {
    const { limit, order, page, sortBy } = req.query;
    try {
        const { data } = await customersService({ req, res }).paginate({
            limit,
            order,
            page,
            sortBy,
        });
        return res.json(data);
    } catch (err) {
        return errorHandler(err, req, res);
    }
}
