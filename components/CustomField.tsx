import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

interface CustomFieldProps {
  field: any;
  error: any;
  touched: any;
  type: string;
  label: string;
  placeholder: string;
  defaultVal?: string;
}

export const CustomInputField: React.FC<CustomFieldProps> = ({
  field,
  error,
  touched,
  type,
  label,
  placeholder,
}) => {
  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} id={field.name} placeholder={placeholder} type={type} />
      <FormErrorMessage name={field.name}>{error}</FormErrorMessage>
    </FormControl>
  );
};
