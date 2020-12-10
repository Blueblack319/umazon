import {
  Flex,
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  IconButton,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';
import { SearchIcon, StarIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import CustomBtn from './CustomBtn';
import { start } from 'repl';

interface HeaderProps {}

const searchOptions = (
  <Select
    placeholder="All"
    borderTopRightRadius="0"
    borderBottomRightRadius="0"
    w="80px"
    _focus={{ boxShadow: '0 0 0 3px orange' }}
    zIndex={100}
  >
    <option value="all">All</option>
    <option value="arts">Arts</option>
    <option value="books">Books</option>
    <option value="computers">Computers</option>
    <option value="electronics">Electronics</option>
  </Select>
);

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [rating, setRating] = useState<Array<React.ReactNode>>([
    <StarIcon color="gold" key={-1} />,
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputFocused = () => {
    setIsFocus(true);
  };
  const handleInputBlurred = () => {
    setIsFocus(false);
  };
  const handleLogoClicked = () => {
    router.push('/');
  };
  const handleRatingChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = parseInt(event.target.value);
    const stars = [];
    for (let i = 0; i < value; i++) {
      stars.push(<StarIcon color="gold" key={i} />);
    }
    setRating(stars);
  };

  return (
    <>
      <Flex
        align="center"
        h="60px"
        bgColor="black"
        justify="space-between"
        p="5px 10px"
      >
        <Box
          h="50px"
          w="200px"
          p="0 20px"
          m="0 10px"
          bgColor="black"
          color="white"
          border="1px solid black"
          cursor="pointer"
          _hover={{ border: '1px solid white', borderRadius: '3px' }}
          onClick={handleLogoClicked}
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2AwepbH0wji4lVTKbCDhoiSMXCLeNIgcog&usqp=CAU"
            alt="logo"
            h="48px"
            w="130px"
          />
        </Box>
        <InputGroup
          m="0 10px"
          borderRadius="6px"
          boxShadow={isFocus ? '0 0 0 3px orange' : 'none'}
        >
          <InputLeftAddon p="0" children={searchOptions} />
          <Input
            size="20px"
            outline="none"
            bgColor="white"
            _focus={{ outline: 'none' }}
            onFocus={handleInputFocused}
            onBlur={handleInputBlurred}
          />
          <InputRightAddon
            p="0"
            border="0"
            children={
              <IconButton
                backgroundColor="orange.200"
                aria-label="Search database"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                border="0"
                _hover={{
                  backgroundColor: 'orange.400',
                }}
                _focus={{
                  backgroundColor: 'orange.400',
                  boxShadow: '0 0 0 3px orange',
                }}
                _active={{
                  backgroundColor: 'orange.400',
                }}
                icon={<SearchIcon />}
              />
            }
          />
        </InputGroup>
        <Stack direction="row" spacing={1} align="center" h="100%">
          <CustomBtn>
            <Stack spacing={0} align="baseline">
              <Text fontWeight={400} fontSize={13}>
                Hello, Sign in
              </Text>
              <Text fontWeight={600}>Account & Lists</Text>
            </Stack>
          </CustomBtn>

          <CustomBtn>
            <Stack spacing={0} align="baseline">
              <Text fontWeight={400} fontSize={13}>
                returns
              </Text>
              <Text fontWeight={600}>& Orders</Text>
            </Stack>
          </CustomBtn>

          <CustomBtn>Cart: 0+</CustomBtn>
          <CustomBtn clicked={onOpen}>
            <Text fontWeight={600}>Sell Item</Text>
          </CustomBtn>
        </Stack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell Product</ModalHeader>
          <ModalCloseButton p="0 5px 5px" />
          <ModalBody>
            <Formik
              initialValues={{
                productName: '',
                cost: '',
                rating: '',
                description: '',
                img: '',
              }}
              validationSchema={Yup.object({
                productName: Yup.string()
                  .max(100, 'Must be 100 charaters or less')
                  .required('Product name is Required'),
                cost: Yup.string()
                  .max(100, 'Must be 100 charaters or less')
                  .required('Cost is Required'),
                rating: Yup.string()
                  .max(100, 'Must be 100 charaters or less')
                  .required('Rating is Required'),
                description: Yup.string()
                  .max(100, 'Must be 100 charaters or less')
                  .required('Description is Required'),
                img: Yup.string()
                  .max(100, 'Must be 100 charaters or less')
                  .required('Image is Required'),
              })}
              onSubmit={(values, actions) =>
                setTimeout(() => {
                  console.log(values);
                  actions.setSubmitting(false);
                }, 1000)
              }
            >
              {(props) => (
                <Form>
                  <Field name="productName">
                    {({ field, form }: any) => {
                      return (
                        <FormControl
                          isInvalid={
                            form.errors.productName && form.touched.productName
                          }
                        >
                          <FormLabel htmlFor="productName">
                            Product Name
                          </FormLabel>
                          <Input
                            {...field}
                            id="productName"
                            placeholder="productName"
                          />
                          <ErrorMessage name="productName" />
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="cost" type="text">
                    {({ field, form }: any) => {
                      // console.log(field);
                      return (
                        <FormControl
                          isInvalid={form.errors.cost && form.touched.cost}
                        >
                          <FormLabel htmlFor="cost">Cost</FormLabel>
                          <NumberInput
                            defaultValue={15}
                            precision={2}
                            step={0.2}
                            onChange={(value) =>
                              props.setFieldValue(field.name, value)
                            }
                            onBlur={props.handleBlur}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <ErrorMessage name="cost" />
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="rating">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.rating && form.touched.rating}
                      >
                        <FormLabel htmlFor="rating">Rating</FormLabel>
                        <Select
                          onChange={(e) => {
                            props.setFieldValue(field.name, e.target.value);
                            handleRatingChanged(e);
                          }}
                          defaultValue={1}
                        >
                          <option value={1}>Very Bad..</option>
                          <option value={2}>Bad..</option>
                          <option value={3}>Good</option>
                          <option value={4}>Very Good!</option>
                          <option value={5}>Excellent!</option>
                        </Select>
                        {rating}
                        <ErrorMessage name="rating" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Input
                          {...field}
                          id="description"
                          placeholder="Description"
                        />
                        <ErrorMessage name="description" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="img">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.img && form.touched.img}
                      >
                        <FormLabel htmlFor="img">Image</FormLabel>
                        <input type="file" {...field} accept="image/*" />
                        <br />
                        <ErrorMessage name="img" />
                      </FormControl>
                    )}
                  </Field>
                  <ModalFooter>
                    <Button
                      mr={4}
                      colorScheme="teal"
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Submit
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
