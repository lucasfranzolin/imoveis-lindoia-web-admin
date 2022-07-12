export function getParams(query) {
    let params = {};
    for (const [key, value] of Object.entries(query)) {
        if (!!value) params[key] = value;
    }
    return Object.keys(params).length > 0 ? params : null;
}
