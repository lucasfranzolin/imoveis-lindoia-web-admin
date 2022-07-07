const cookiePrefix = 'imoveis-lindoia-web-admin';
const tokenCookieMaxMinutes = 15;

export const tokenCookieId = `${cookiePrefix}.token`;
export const sessionCookieId = `${cookiePrefix}.sessionId`;
export const tokenCookieMaxAge = 60 * tokenCookieMaxMinutes;
