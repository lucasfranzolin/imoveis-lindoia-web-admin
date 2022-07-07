import httpStatus from 'http-status';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(httpStatus.METHOD_NOT_ALLOWED);
    }
    const { id } = req.query;
    res.json({ id, msg: 'hello from user' });
}
