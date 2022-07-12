import httpStatus from 'http-status';

export function errorHandler(err, res) {
    if (err?.response) {
        return res.status(err.response.data.code).json(err.response.data);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
}
