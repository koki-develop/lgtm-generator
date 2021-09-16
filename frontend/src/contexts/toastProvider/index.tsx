import React, {
  createContext,
  useContext,
} from 'react';
import {
  useSnackbar,
  SnackbarProvider,
  VariantType,
} from 'notistack';

type Context = {
  enqueueSuccess?: (message: React.ReactNode) => void;
  enqueueWarn?: (message: React.ReactNode) => void;
  enqueueError?: (message: React.ReactNode) => void;
};

const ToastContext = createContext<Context>({});

type ToastProviderProps = {
  children: React.ReactNode;
};

const Root: React.VFC<ToastProviderProps> = (props: ToastProviderProps) => {
  const snackbarRef = React.createRef<SnackbarProvider>();

  return (
    <SnackbarProvider
      ref={snackbarRef}
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      <ToastProvider>
        {props.children}
      </ToastProvider>
    </SnackbarProvider>
  );
};

const ToastProvider: React.VFC<ToastProviderProps> = (props: ToastProviderProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueDefault = (message: React.ReactNode, variant: VariantType) => {
    const key = enqueueSnackbar(message, {
      variant,
      onClick: () => closeSnackbar(key),
    });
  };

  const enqueueSuccess = (message: React.ReactNode) => enqueueDefault(message, 'success');
  const enqueueWarn = (message: React.ReactNode) => enqueueDefault(message, 'warning');
  const enqueueError = (message: React.ReactNode) => enqueueDefault(message, 'error');

  return (
    <ToastContext.Provider value={{ enqueueSuccess, enqueueWarn, enqueueError }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default Root;

export const useToast = (): Context => useContext(ToastContext);
