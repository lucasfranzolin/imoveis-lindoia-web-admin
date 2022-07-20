import httpStatus from 'http-status';

import { ibgeService } from '../../../../../services/ibge';
import { errorHandler } from '../../../../../utils/error';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    try {
        const { data, status } = await ibgeService.getCitiesByState(
            req.query.id
        );
        return res.status(status).json(
            data.map(({ id, nome }) => ({
                id,
                label: nome,
                value: nome,
            }))
        );
    } catch (err) {
        return errorHandler(err, res);
    }
}
