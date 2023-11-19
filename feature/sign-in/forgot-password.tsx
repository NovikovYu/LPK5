import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import {
  ForgotPasswordBoxRestyled,
  ForgotPasswordFormRestyled,
  ForgotPasswordHeadingFormRestyled,
  ForgotPasswordIconButtonRestyled,
  ForgotPasswordInputFieldRestyled,
} from './style-sign-in';
import { ButtonRestyled } from '../sign-up/style-sign-up-form';
import { schemaEmailValidation } from '../utils/validation/common-validation';

interface Props {
  handleCloseForgotPasswordModal: () => void;
  handleOpenForgotPasswordMessageModal: () => void;
  isMobile: boolean;
}

type ForgotPasswordFormTypes = {
  email: string;
};

const ForgotPasswordForm = ({
  handleCloseForgotPasswordModal,
  handleOpenForgotPasswordMessageModal,
  isMobile,
}: Props) => {
  const InputSize = isMobile ? 'small' : 'medium';
  const ButtonSize = isMobile ? 'small' : 'large';
  const { handleSubmit, control } = useForm<ForgotPasswordFormTypes>({
    mode: 'onChange',
    resolver: yupResolver(schemaEmailValidation),
  });

  const { errors, isValid } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormTypes> = (data) => {
    if (isValidForm(data)) {
      handleCloseForgotPasswordModal();
      handleOpenForgotPasswordMessageModal();
    } else errors;
  };

  const isValidForm = (data: ForgotPasswordFormTypes) =>
    schemaEmailValidation.isValidSync(data);

  return (
    <ForgotPasswordBoxRestyled>
      <ForgotPasswordFormRestyled>
        <ForgotPasswordHeadingFormRestyled>
          Forgot a password?
        </ForgotPasswordHeadingFormRestyled>
        <ForgotPasswordIconButtonRestyled
          aria-label="Close-form"
          onClick={handleCloseForgotPasswordModal}
        >
          <CloseIcon />
        </ForgotPasswordIconButtonRestyled>
      </ForgotPasswordFormRestyled>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <ForgotPasswordInputFieldRestyled
              id="forgot-password-form-email"
              fullWidth
              label="Email"
              size={InputSize}
              variant="outlined"
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <ButtonRestyled
          type="submit"
          id="forgot-password-form-button"
          variant="contained"
          fullWidth
          size={ButtonSize}
          color="primary"
        >
          Send email
        </ButtonRestyled>
      </Box>
    </ForgotPasswordBoxRestyled>
  );
};
export default ForgotPasswordForm;
