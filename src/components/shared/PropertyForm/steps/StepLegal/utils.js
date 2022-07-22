import * as Yup from 'yup';

export const validationSchema = Yup.object({
    registry: Yup.string().required('Obrigatório.'),
});
