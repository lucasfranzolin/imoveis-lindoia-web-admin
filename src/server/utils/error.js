import httpStatus from 'http-status';

export function errorHandler(err, context) {
    if (err.respone)
        return context.res
            .status(err.response.data.code)
            .json(err.response.data);
    return context.res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
}
