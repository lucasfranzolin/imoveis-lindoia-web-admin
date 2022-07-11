function getParams(query) {
    let params = {};
    for (const [key, value] of Object.entries(query)) {
        if (!!value) params[key] = value;
    }
    return params;
}

export function getSearchParams(query) {
    return new URLSearchParams(getParams(query));
}
