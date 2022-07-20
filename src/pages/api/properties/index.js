import httpStatus from 'http-status';

import { propertiesService } from '../../../services/properties';
import { errorHandler } from '../../../utils/error';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const { status } = await propertiesService.save(req.body);
                return res.status(status).send();
            } catch (err) {
                return errorHandler(err, res);
            }
        default:
            return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
}
