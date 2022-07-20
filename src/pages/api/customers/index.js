import httpStatus from 'http-status';

import { customersService } from '../../../services/customers';
import { errorHandler } from '../../../utils/error';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const { status } = await customersService.save(req.body);
                return res.status(status).send();
            } catch (err) {
                return errorHandler(err, res);
            }
        case 'GET':
            try {
                const { page, pageSize, sortBy, order } = req.query;
                const { data, status } = await customersService.paginate({
                    page: parseInt(page) - 1,
                    limit: parseInt(pageSize),
                    sortBy,
                    order,
                });
                const { docs, pages, count } = data;
                return res.status(status).json({
                    rows: docs,
                    totalItems: count,
                    totalPages: pages,
                });
            } catch (err) {
                return errorHandler(err, res);
            }
        default:
            return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
}
