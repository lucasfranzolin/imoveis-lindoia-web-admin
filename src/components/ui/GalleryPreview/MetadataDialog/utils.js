import * as Yup from 'yup';

export const validationSchema = Yup.object({
    description: Yup.string().max(255, 'Máximo de caracteres permitido: 255.'),
});
