import httpStatus from 'http-status';

import { refreshToken } from '../../../server/controllers/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED);
    }
    return await refreshToken(req, res);
}
