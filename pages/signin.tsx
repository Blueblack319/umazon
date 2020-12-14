import {
  Center,
  Text,
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
  IconButton,
  Button,
  Link,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CustomInputField } from '../components/CustomField';
import { useAuth } from '../lib/auth';
import { useState } from 'react';

interface signinProps {}

const signin: React.FC<signinProps> = ({}) => {
  const [result, setResult] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const auth = useAuth();

  const boxBg = useColorModeValue('white', 'gray.700');
  const bg = useColorModeValue('#EAEDED', '#1A202C');

  const handleGithubClicked = async () => {
    await auth.signinWithGithub();
    router.push('/');
  };

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
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address.')
                .required('E-mail is required.'),
              password: Yup.string()
                .max(15, 'Must 15 characters or less.')
                .min(4, 'Must 4 charters or more.')
                .required('Password is required.'),
            })}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              const result = await auth.signinWithEmail(
                values.email,
                values.password
              );
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
                        placeholder="Please input your e-mail"
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
                        placeholder="Please input your password"
                      />
                    );
                  }}
                </Field>
                <Text color="red.600">{result}</Text>
                <Flex m="10px 0 0" justify="flex-end">
                  <Link href="/signup">Go to Sign up</Link>
                </Flex>
                <Button
                  mt={6}
                  w="100%"
                  colorScheme="gray"
                  onClick={handleGithubClicked}
                >
                  Continue with Github
                </Button>
                <Button mt={4} w="100%" colorScheme="red">
                  Continue with Google
                </Button>

                <Button
                  mt={4}
                  w="100%"
                  colorScheme="teal"
                  isLoading={formik.isSubmitting}
                  type="submit"
                >
                  Sign In
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

export default signin;
