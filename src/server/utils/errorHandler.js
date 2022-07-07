import httpStatus from 'http-status';

export function errorHandler(err, req, res) {
    const { code, message } = err;
    if (code && message) {
        return res.status(code).json(err);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
}
