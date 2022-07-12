import httpStatus from 'http-status';

import { authService } from '../../../services/auth';
import { errorHandler } from '../../../utils/error';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    try {
        const { status } = await authService.register(req.body);
        return res.status(status).send();
    } catch (err) {
        return errorHandler(err, res);
    }
}
