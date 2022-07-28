import { getClientInstance } from './client';
import { getServerInstance } from './server';

export const STORAGE_ITEM_ACCESS_TOKEN = 'AccessToken';

export function configHttp(context = 'server') {
    return context === 'server' ? getServerInstance() : getClientInstance();
}
