import {
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

const Login = () => {
    const { login, error } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: 'lucas@imoveislindoia.com.br',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Endereço de email inválido.')
                .required('Email é obrigatório.'),
            password: Yup.string()
                .min(8, 'Senha muito curta, mínimo 8 caracteres.')
                .required('Senha é obrigatória.'),
        }),
        onSubmit: login,
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
            <Stack spacing={4} minW="400px">
                <Stack align="center">
                    <Heading fontSize="4xl" textAlign="center">
                        Olá corretor,
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        seja bem vindo 😊
                    </Text>
                </Stack>
                <Stack
                    as="form"
                    p={8}
                    rounded="md"
                    spacing={4}
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl
                        isRequired
                        isInvalid={formik.errors.email && formik.touched.email}
                    >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            variant="filled"
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
                                variant="filled"
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
                        Entrar
                    </Button>
                    {error && <Text color="red.400">{error}</Text>}
                </Stack>
                <Text align="center">
                    Não possui uma conta?{' '}
                    <NextLink href="/register" passHref>
                        <Link color="teal.400">Cadastre-se</Link>
                    </NextLink>{' '}
                    na plataforma.
                </Text>
            </Stack>
        </Box>
    );
};

export { Login };
