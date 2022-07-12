import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { AuthContext } from '../../contexts/auth';

const Register = () => {
    const { register, error } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Nome é obrigatório.'),
            email: Yup.string()
                .email('Endereço de email inválido.')
                .required('Email é obrigatório.'),
            password: Yup.string()
                .min(8, 'Senha muito curta, mínimo 8 caracteres.')
                .required('Senha é obrigatória.'),
        }),
        onSubmit: register,
    });

    const toggleShow = () => setShow(!show);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="full"
        >
            <Stack spacing={6} minW="400px">
                <Stack align="center">
                    <Heading fontSize="4xl" textAlign="center">
                        Cadastre-se
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        para gerenciar a imobiliária ✌️
                    </Text>
                </Stack>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <Stack
                    as="form"
                    boxShadow="base"
                    borderWidth={1}
                    p={8}
                    rounded="md"
                    spacing={4}
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl
                        isRequired
                        isInvalid={
                            formik.errors.fullName && formik.touched.fullName
                        }
                    >
                        <FormLabel htmlFor="fullName">Nome</FormLabel>
                        <Input
                            name="fullName"
                            id="fullName"
                            type="text"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>
                            {formik.errors.fullName}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={formik.errors.email && formik.touched.email}
                    >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            name="email"
                            id="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>
                            {formik.errors.email}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={
                            formik.errors.password && formik.touched.password
                        }
                    >
                        <FormLabel htmlFor="password">Senha</FormLabel>
                        <InputGroup>
                            <Input
                                name="password"
                                id="password"
                                type={show ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputRightElement>
                                <Button variant="ghost" onClick={toggleShow}>
                                    {show ? (
                                        <Icon as={EyeIcon} />
                                    ) : (
                                        <Icon as={EyeOffIcon} />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {formik.errors.password}
                        </FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="teal" size="lg">
                        Cadastrar
                    </Button>
                </Stack>
                <Text align="center">
                    Ja possui uma conta?{' '}
                    <NextLink href="/login" passHref>
                        <Link color="teal.400">Entre</Link>
                    </NextLink>{' '}
                    na plataforma.
                </Text>
            </Stack>
        </Box>
    );
};

export { Register };
