export const phone = (e) => {
    e.currentTarget.maxLength = 15;
    let value = e.currentTarget.value;
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.currentTarget.value = value;
    }
    return e;
};

export const cpf = (e) => {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{1,2}$/.test(value)) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1-$2');
        e.currentTarget.value = value;
    }
    return e;
};
