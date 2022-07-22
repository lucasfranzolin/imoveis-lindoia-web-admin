import * as Yup from 'yup';

export const validationSchema = Yup.object({
    rent: Yup.object({
        isAnnounced: Yup.boolean().required('Obrigatório.'),
        value: Yup.number().when('rent.isAnnounced', {
            is: true,
            then: Yup.number()
                .moreThan(0, 'Valor deve ser maior do que 0.')
                .required('Obrigatório.'),
        }),
    }),
    sale: Yup.object({
        isAnnounced: Yup.boolean().required('Obrigatório.'),
        value: Yup.number().when('rent.isAnnounced', {
            is: true,
            then: Yup.number()
                .moreThan(0, 'Valor deve ser maior do que 0.')
                .required('Obrigatório.'),
        }),
    }),
});
