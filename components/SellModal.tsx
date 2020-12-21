import {
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  useToast,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { StarIcon } from '@chakra-ui/icons';

import { createProduct, editProduct } from '../lib/db';
import { useAuth } from '../lib/auth';

type productType = {
  id: string;
  productName: string;
  cost: number;
  createdAt: string;
  description: string;
  img: string;
  rating: number;
  quantity: number;
  ownerId: string;
};

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  values?: productType;
}

const SellModal: React.FC<SellModalProps> = ({ isOpen, onClose, values }) => {
  const auth = useAuth();
  const toast = useToast();
  const [rating, setRating] = useState<Array<React.ReactNode>>([
    <StarIcon color="gold" key={-1} />,
    <StarIcon color="gold" key={-1} />,
    <StarIcon color="gold" key={-1} />,
  ]);

  const handleSubmitted = async ({
    productName,
    cost,
    rating,
    description,
    img,
    quantity,
  }: any) => {
    const newProduct = {
      ownerId: auth.user.uid,
      createdAt: new Date().toISOString(),
      productName,
      cost,
      rating,
      quantity,
      description,
      img,
    };
    const successfulProduct = values
      ? await editProduct(newProduct, values.id)
      : await createProduct(newProduct);
    toast({
      title: 'Success!',
      description: `We've ${
        values ? 'edited' : 'added'
      } your product ${successfulProduct}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
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

  useEffect(() => {
    if (values?.rating) {
      const stars = [];
      for (let i = 0; i < values.rating; i++) {
        stars.push(<StarIcon color="gold" key={i} />);
      }
      setRating(stars);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {values ? (
          <ModalHeader>Edit Product</ModalHeader>
        ) : (
          <ModalHeader>Sell Product</ModalHeader>
        )}
        <ModalCloseButton p="0 5px 5px" />
        <ModalBody>
          <Formik
            initialValues={{
              productName: values ? values.productName : '',
              cost: values ? values.cost : '15.00',
              rating: values ? values.rating : 3,
              description: values ? values.description : '',
              img: values ? values.img : '',
              quantity: values ? values.quantity : 10,
            }}
            validationSchema={Yup.object({
              productName: Yup.string()
                .max(100, 'Must be 100 charaters or less')
                .required('Product name is Required'),
              cost: Yup.number()
                .max(100, 'Must be 100 or less')
                .required('Cost is Required'),
              rating: Yup.number()
                .max(5, 'Must be 5 or less')
                .required('Rating is Required'),
              description: Yup.string()
                .max(100, 'Must be 100 charaters or less')
                .required('Description is Required'),
              img: Yup.mixed().required('Image is Required'),
              quantity: Yup.number()
                .max(100, 'Must be 100 or less')
                .required('Quantity is Required'),
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                actions.setSubmitting(true);
                handleSubmitted(values);
                actions.setSubmitting(false);
              }, 3000);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form>
                <Field name="productName" type="text">
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
                          id={field.name}
                          placeholder={
                            values?.productName
                              ? values.productName
                              : 'Input this product name.'
                          }
                        />
                        <ErrorMessage name="productName" />
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="cost">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.cost && form.touched.cost}
                    >
                      <FormLabel htmlFor="cost">Cost</FormLabel>
                      <InputGroup>
                        <InputLeftAddon children="$" />
                        <NumberInput
                          id={field.name}
                          precision={2}
                          step={0.2}
                          onChange={(valueString) =>
                            props.setFieldValue(field.name, valueString)
                          }
                          onBlur={props.handleBlur}
                          value={field.value}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </InputGroup>

                      <ErrorMessage name="cost" />
                    </FormControl>
                  )}
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
                        value={field.value}
                        id={field.name}
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
                        id={field.name}
                        placeholder={
                          values?.description
                            ? values.description
                            : 'Input this item description.'
                        }
                        value={field.value}
                      />
                      <ErrorMessage name="description" />
                    </FormControl>
                  )}
                </Field>
                <Field name="quantity" type="number">
                  {({ field, form }: any) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.quantity && form.touched.quantity
                        }
                      >
                        <FormLabel htmlFor="quantity">Quantity</FormLabel>
                        <NumberInput
                          precision={2}
                          step={0.2}
                          onChange={(value) =>
                            props.setFieldValue(field.name, value)
                          }
                          onBlur={props.handleBlur}
                          id={field.name}
                          value={field.value}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <ErrorMessage name="quantity" />
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="img">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.img && form.touched.img}
                    >
                      <FormLabel htmlFor="img">Image</FormLabel>
                      <input
                        type="file"
                        onChange={(e) => {
                          form.setFieldValue('img', e.target.files![0]);
                        }}
                        accept="image/*"
                        id={field.name}
                      />
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
                    disabled={props.isSubmitting}
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
  );
};

export default SellModal;
