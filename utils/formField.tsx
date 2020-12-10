import { useField } from 'formik';
import {} from '';

interface SellItemTextInputProps {
  label: string;
  props: {
    [x: string]: any;
  };
}

export const SellItemTextInput = ({
  label,
  ...props
}: SellItemTextInputProps) => {
  const [field, meta] = useField(props);
  return <></>;
};
