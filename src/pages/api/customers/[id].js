import httpStatus from 'http-status';

import { customersService } from '../../../services/customers';
import { errorHandler } from '../../../utils/error';

export default async function handler(req, res) {
    const { id } = req.query;
    switch (req.method) {
        case 'GET':
            try {
                const { data } = await customersService.get(id);
                return res.json(data);
            } catch (err) {
                return errorHandler(err, res);
            }
        case 'PUT':
            try {
                const { status } = await customersService.update(id, req.body);
                return res.status(status).send();
            } catch (err) {
                return errorHandler(err, res);
            }
        case 'DELETE':
            try {
                const { status } = await customersService._delete(id);
                return res.status(status).send();
            } catch (err) {
                return errorHandler(err, res);
            }
        default:
            return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
}
