import httpStatus from 'http-status';

import { authService } from '../services/auth';
import { errorHandler } from '../utils/error';

export async function login(context) {
    try {
        const {
            data: { token, session },
        } = await authService(context).login(context.req.body);

        return context.res.json({
            token,
            sessionId: session.uuid,
        });
    } catch (err) {
        return errorHandler(err, context);
    }
}

export async function refreshToken(context) {
    try {
        const {
            data: { token },
        } = await authService(context).refreshToken(context.req.body);

        return context.res.json({
            token,
            sessionId: context.req.body.sessionId,
        });
    } catch (err) {
        return errorHandler(err, context);
    }
}

export async function logout(context) {
    try {
        await authService(context).logout(context.req.body);

        return context.res.status(httpStatus.OK).send();
    } catch (err) {
        return errorHandler(err, context);
    }
}

export async function register(context) {
    try {
        const { status } = await authService(context).register(
            context.req.body
        );
        return context.res.status(status).send();
    } catch (err) {
        return errorHandler(err, context);
    }
}
