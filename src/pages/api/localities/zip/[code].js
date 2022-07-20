import httpStatus from 'http-status';

import { zipCodeService } from '../../../../services/zip-code';
import { errorHandler } from '../../../../utils/error';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    try {
        const { data, status } = await zipCodeService.find(req.query.code);
        return res.status(status).json(data);
    } catch (err) {
        return errorHandler(err, res);
    }
}
