import * as Yup from 'yup';

export const defaultValues = {
    email: '',
    fullName: '',
    phone: '',
};

export const validationSchema = Yup.object({
    cpf: Yup.string(),
    fullName: Yup.string().required('Nome é obrigatório.'),
    email: Yup.string()
        .email('Endereço de email inválido.')
        .required('Email é obrigatório.'),
    phone: Yup.string().required('Telefone é obrigatório.'),
});
