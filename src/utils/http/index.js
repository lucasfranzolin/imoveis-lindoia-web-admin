import { getClientInstance } from './client';
import { getServerInstance } from './server';

export function configHttp(context = 'server') {
    return context === 'server' ? getServerInstance() : getClientInstance();
}
