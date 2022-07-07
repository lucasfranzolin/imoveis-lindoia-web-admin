import httpStatus from 'http-status';

import { authService } from '../../server/services/auth';
import { errorHandler } from '../utils/errorHandler';

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const {
            data: { token, session },
        } = await authService({ req, res }).login({ email, password });

        return res.json({
            token,
            sessionId: session.uuid,
        });
    } catch (err) {
        return errorHandler(err, req, res);
    }
}

export async function refreshToken(req, res) {
    const { sessionId } = req.body;
    try {
        const {
            data: { token },
        } = await authService({ req, res }).refreshToken({ sessionId });

        return res.json({
            token,
            sessionId,
        });
    } catch (err) {
        return errorHandler(err, req, res);
    }
}

export async function logout(req, res) {
    const { sessionId } = req.body;
    try {
        await authService({ req, res }).logout({ sessionId });

        return res.status(httpStatus.OK).send();
    } catch (err) {
        return errorHandler(err, req, res);
    }
}
