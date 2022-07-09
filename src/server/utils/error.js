import httpStatus from 'http-status';

export function errorHandler(err, req, res) {
    if (err.respone)
        return res.status(err.response.data.code).json(err.response.data);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
}
