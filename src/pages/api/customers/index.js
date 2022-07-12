import httpStatus from 'http-status';

import { customersService } from '../../../services/customers';
import { errorHandler } from '../../../utils/error';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }

    try {
        const { data } = await customersService.paginate(req.query);
        return res.json(data);
    } catch (err) {
        return errorHandler(err, res);
    }
}
