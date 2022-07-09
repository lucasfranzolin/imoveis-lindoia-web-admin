import { customersService } from '../services/customers';
import { errorHandler } from '../utils/error';

export async function paginate(req, res) {
    try {
        const { data } = await customersService({ req, res }).paginate(
            req.query
        );
        return res.json(data);
    } catch (err) {
        return errorHandler(err, req, res);
    }
}
