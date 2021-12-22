import React from 'react';

export type FormProps = React.HTMLProps<HTMLFormElement>;

const Form: React.VFC<FormProps> = React.memo(props => {
  const { onSubmit, ...formProps } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return <form onSubmit={handleSubmit} {...formProps} />;
});

Form.displayName = 'Form';

export default Form;
