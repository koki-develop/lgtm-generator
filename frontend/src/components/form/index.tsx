import React from 'react';

type FormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
};

const Form: React.VFC<FormProps> = (props: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
