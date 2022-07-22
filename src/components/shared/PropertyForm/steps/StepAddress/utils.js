import * as Yup from 'yup';

export const validationSchema = Yup.object({
    city: Yup.string().required('Obrigatório.'),
    complement: Yup.string(),
    district: Yup.string().required('Obrigatório.'),
    number: Yup.string().required('Obrigatório.'),
    state: Yup.string().required('Obrigatório.'),
    street: Yup.string().required('Obrigatório.'),
    zip: Yup.string()
        .length(8, 'CEP deve possuir 8 dígitos.')
        .required('Obrigatório.'),
});
