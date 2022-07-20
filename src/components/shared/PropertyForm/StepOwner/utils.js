import * as Yup from 'yup';

export const validationSchema = Yup.object({
    ownerId: Yup.string().required('Obrigatório.'),
});
