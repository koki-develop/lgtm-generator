import { useSnackbar, SnackbarProvider, VariantType } from 'notistack';
import React, { createContext, useCallback, useContext } from 'react';

type Context = {
  enqueueSuccess?: (message: React.ReactNode) => void;
  enqueueWarn?: (message: React.ReactNode) => void;
  enqueueError?: (message: React.ReactNode) => void;
};

const ToastContext = createContext<Context>({});

type ToastProviderProps = {
  children: React.ReactNode;
};

const Root: React.FC<ToastProviderProps> = (props: ToastProviderProps) => {
  const snackbarRef = React.createRef<SnackbarProvider>();

  return (
    <SnackbarProvider
      ref={snackbarRef}
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      <ToastProvider>{props.children}</ToastProvider>
    </SnackbarProvider>
  );
};

const ToastProvider: React.FC<ToastProviderProps> = (
  props: ToastProviderProps,
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueDefault = useCallback(
    (message: React.ReactNode, variant: VariantType) => {
      const key = enqueueSnackbar(message, {
        variant,
        onClick: () => closeSnackbar(key),
      });
    },
    [closeSnackbar, enqueueSnackbar],
  );

  const enqueueSuccess = useCallback(
    (message: React.ReactNode) => enqueueDefault(message, 'success'),
    [enqueueDefault],
  );
  const enqueueWarn = useCallback(
    (message: React.ReactNode) => enqueueDefault(message, 'warning'),
    [enqueueDefault],
  );
  const enqueueError = useCallback(
    (message: React.ReactNode) => enqueueDefault(message, 'error'),
    [enqueueDefault],
  );

  return (
    <ToastContext.Provider
      value={{ enqueueSuccess, enqueueWarn, enqueueError }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default Root;

export const useToast = (): Context => useContext(ToastContext);
