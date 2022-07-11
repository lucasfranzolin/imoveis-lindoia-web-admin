import httpStatus from 'http-status';

import { register } from '../../../server/controllers/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    return await register({ req, res });
}
