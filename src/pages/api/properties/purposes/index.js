import httpStatus from 'http-status';

import { propertiesService } from '../../../../services/properties';
import { errorHandler } from '../../../../utils/error';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    try {
        const { data, status } = await propertiesService.getPurposes();
        return res.status(status).json(data);
    } catch (err) {
        return errorHandler(err, res);
    }
}
