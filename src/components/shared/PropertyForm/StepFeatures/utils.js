import * as Yup from 'yup';

export const validationSchema = Yup.object({
    purpose: Yup.string().required('Obrigatório.'),
    type: Yup.string().required('Obrigatório.'),
});
