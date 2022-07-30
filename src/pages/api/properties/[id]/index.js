import httpStatus from 'http-status';

import { propertiesService } from '../../../../services/properties';
import { errorHandler } from '../../../../utils/error';

export default async function handler(req, res) {
    const { id } = req.query;
    switch (req.method) {
        case 'GET':
            try {
                const [{ data }, { data: urls }] = await Promise.all([
                    propertiesService.get(id),
                    propertiesService.getMedia(id),
                ]);
                return res.json({
                    ...data,
                    urls,
                });
            } catch (err) {
                return errorHandler(err, res);
            }
        default:
            return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
}
