import {
  Center,
  Box,
  Flex,
  Text,
  Link,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Form, Formik, Field } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useState } from 'react';

import { useAuth } from '../utils/auth';
import { CustomInputField } from '../components/CustomField';

interface signupProps {}

const signup: React.FC<signupProps> = ({}) => {
  const [result, setResult] = useState(null);
  const router = useRouter();
  const auth = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const boxBg = useColorModeValue('white', 'gray.700');
  const bg = useColorModeValue('#EAEDED', '#1A202C');

  return (
    <Center h="100vh" w="100vw" bg={bg}>
      <Box
        boxShadow="xl"
        w={400}
        minH={450}
        p="15px 0"
        borderRadius={20}
        pos="relative"
        bg={boxBg}
      >
        <Flex flexDir="column" align="center" h="100%">
          <Box m="20px 0">
            <Text
              fontSize="3xl"
              fontWeight="600"
              onClick={() => router.push('/')}
              cursor="pointer"
            >
              Umazon
            </Text>
          </Box>
          <Formik
            initialValues={{
              email: '',
              password: '',
              password1: '',
              firstName: '',
              lastName: '',
              displayName: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address.')
                .required('E-mail is required.'),
              password: Yup.string()
                .max(20, 'Must 20 characters or less.')
                .min(6, 'Must 6 charters or more.')
                .required('Password is required.'),
              password1: Yup.string()
                .max(20, 'Must 20 characters or less.')
                .min(6, 'Must 6 charters or more.')
                .required('Confirm Password is required.')
                .oneOf(
                  [Yup.ref('password'), null],
                  'Both password need to be same.'
                ),
              firstName: Yup.string()
                .max(20, 'Must 20 characters or less.')
                .required('First name is required.'),
              lastName: Yup.string()
                .max(20, 'Must 20 characters or less.')
                .required('Last name is required.'),
              displayName: Yup.string()
                .max(20, 'Must 20 characters or less.')
                .required('Nickname is required.'),
            })}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              const result = await auth.signupWithEmail(values);
              setResult(result);
              actions.setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form
                style={{ width: '100%', height: '100%', padding: '0 40px' }}
                onSubmit={formik.handleSubmit}
              >
                <Field name="email" type="email">
                  {({ field, form }: any) => {
                    const error = form.errors.email;
                    const touched = form.touched.email;
                    return (
                      <CustomInputField
                        field={field}
                        error={error}
                        touched={touched}
                        type="email"
                        label="E-mail"
                        placeholder="Please input your e-mail."
                      />
                    );
                  }}
                </Field>
                <Field name="password" type="password">
                  {({ field, form }: any) => {
                    const error = form.errors.password;
                    const touched = form.touched.password;
                    return (
                      <CustomInputField
                        field={field}
                        error={error}
                        touched={touched}
                        type="password"
                        label="Password"
                        placeholder="Please input your password."
                      />
                    );
                  }}
                </Field>
                <Field name="password1" type="password">
                  {({ field, form }: any) => {
                    const error = form.errors.password1;
                    const touched = form.touched.password1;
                    return (
                      <CustomInputField
                        field={field}
                        error={error}
                        touched={touched}
                        type="password"
                        label="Confirm Password"
                        placeholder="Please confirm your password."
                      />
                    );
                  }}
                </Field>
                <Field name="firstName" type="text">
                  {({ field, form }: any) => {
                    const error = form.errors.firstName;
                    const touched = form.touched.firstName;
                    return (
                      <CustomInputField
                        field={field}
                        error={error}
                        touched={touched}
                        type="text"
                        label="First Name"
                        placeholder="Please input your first-name."
                      />
                    );
                  }}
                </Field>
                <Field name="lastName" type="text">
                  {({ field, form }: any) => {
                    const error = form.errors.lastName;
                    const touched = form.touched.lastName;
                    return (
                      <CustomInputField
                        field={field}
                        error={error}
                        touched={touched}
                        type="text"
                        label="Last Name"
                        placeholder="Please input your last-name"
                      />
                    );
                  }}
                </Field>
                <Field name="displayName" type="text">
                  {({ field, form }: any) => {
                    const error = form.errors.displayName;
                    const touched = form.touched.displayName;
                    return (
                      <CustomInputField
                        field={field}
                        error={error}
                        touched={touched}
                        type="text"
                        label="Nickname"
                        placeholder="Please input your displayName"
                      />
                    );
                  }}
                </Field>
                <Flex m="10px 0 0" justify="flex-end">
                  <Link href="/signin">Go to Sign In</Link>
                </Flex>

                <Text color="red.500">{result}</Text>

                <Button
                  mt={4}
                  w="100%"
                  colorScheme="teal"
                  isLoading={formik.isSubmitting}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
        <IconButton
          aria-label="colorMode"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          pos="absolute"
          right="20px"
          top="20px"
        />
      </Box>
    </Center>
  );
};

export default signup;
