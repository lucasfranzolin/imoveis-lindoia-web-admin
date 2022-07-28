import formidable from 'formidable';
import fs from 'fs';
import httpStatus from 'http-status';

import { propertiesService } from '../../../../services/properties';
import { errorHandler } from '../../../../utils/error';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED).send();
    }
    try {
        const { id } = req.query;
        const formData = await new Promise((resolve, reject) =>
            formidable().parse(req, (error, { metadata }, files) => {
                if (error) {
                    reject(error);
                }

                let _files;
                if (!Array.isArray(files.files)) _files = [files.files];
                else _files = files.files;

                const formData = new FormData();
                _files.forEach(
                    ({
                        filepath, //
                        mimetype,
                        originalFilename,
                        size,
                    }) =>
                        formData.append(
                            'files',
                            fs.createReadStream(filepath),
                            {
                                contentType: mimetype,
                                filename: originalFilename,
                                knownLength: size,
                            }
                        )
                );
                formData.append('metadata', metadata);
                resolve(formData);
            })
        );
        const { data } = await propertiesService.upload({ id, formData });
        res.json(data);
    } catch (err) {
        return errorHandler(err, res);
    }
}
