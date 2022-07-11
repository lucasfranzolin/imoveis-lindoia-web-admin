import httpStatus from 'http-status';

import { paginate } from '../../../server/controllers/customers';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    return await paginate({ req, res });
}
