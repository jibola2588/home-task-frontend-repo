import { ChangeEvent, FormEvent, useState } from 'react';

interface FormState {
  email: string;
  password: string;
  name:string;
  users:string;
  products:string
}

const useForm = (initState: FormState, callback: () => void) => {
  const [inputs, setInputs] = useState<FormState>(initState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    callback();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    e.persist();
    const { name, type, value } = e.target;

    if (type === 'number') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      setInputs((prevState) => ({ ...prevState, [name]: onlyNums }));
    } else {
      setInputs((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return { handleChange, handleSubmit, inputs };
};

export default useForm;
