'use client';
import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import {
  ButtonRestyled,
  InputPasswordRestyled,
  PasswordHelperTextRestyled,
} from '@/feature/sign-up/style-sign-up-form';
import { changePasswordSchema } from '@/feature/utils/validation/common-validation';

import {
  ChangePasswordBox,
  ChangePasswordFormBox,
  ChangePasswordHeading,
  InputChangePassword,
} from '../../feature/style-home';

type SignInFormTypes = {
  password: string;
  repeatPassword: string;
};

function ChangePasswordPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const ButtonSize = isMobile ? 'small' : 'large';
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleMouseDownRepeatPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const { handleSubmit, control } = useForm<SignInFormTypes>({
    mode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
  });

  const { errors, isValid } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<SignInFormTypes> = (data) => {
    if (isValidForm(data)) {
    } else errors;
  };

  const isValidForm = (data: SignInFormTypes) =>
    changePasswordSchema.isValidSync(data);

  return (
    <ChangePasswordBox>
      <ChangePasswordFormBox>
        <ChangePasswordHeading>Change password</ChangePasswordHeading>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => {
              const { value: fieldValue, onChange } = field;
              return (
                <InputChangePassword
                  id="change-form-password"
                  fullWidth
                  variant="outlined"
                  error={!!fieldState.error?.message}
                  size={isMobile ? 'small' : 'medium'}
                >
                  <InputLabel
                    htmlFor="auth-form-password"
                    id="auth-form-password"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="change-form-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={fieldValue || ''}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff
                              fontSize={isMobile ? 'small' : 'medium'}
                            />
                          ) : (
                            <Visibility
                              fontSize={isMobile ? 'small' : 'medium'}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <PasswordHelperTextRestyled error={false}>
                    The password must be more than 8 characters and contain at
                    least one capital letter, a special sign !@#$%^&* and a
                    number
                  </PasswordHelperTextRestyled>
                  <PasswordHelperTextRestyled>
                    {fieldState.error?.message}
                  </PasswordHelperTextRestyled>
                </InputChangePassword>
              );
            }}
          />
          <Controller
            control={control}
            name="repeatPassword"
            render={({ field, fieldState }) => {
              const { value: fieldValue, onChange } = field;
              return (
                <InputPasswordRestyled
                  fullWidth
                  variant="outlined"
                  error={!!fieldState.error?.message}
                  size={isMobile ? 'small' : 'medium'}
                >
                  <InputLabel htmlFor="reg-form-repeat-password">
                    Repeat Password
                  </InputLabel>
                  <OutlinedInput
                    id="change-form-repeat-password"
                    label="Repeat Password"
                    type={showRepeatPassword ? 'text' : 'password'}
                    autoComplete="current-repeat-password"
                    value={fieldValue || ''}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRepeatPassword}
                          onMouseDown={handleMouseDownRepeatPassword}
                          edge="end"
                        >
                          {showRepeatPassword ? (
                            <VisibilityOff
                              fontSize={isMobile ? 'small' : 'medium'}
                            />
                          ) : (
                            <Visibility
                              fontSize={isMobile ? 'small' : 'medium'}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <PasswordHelperTextRestyled>
                    {fieldState.error?.message}
                  </PasswordHelperTextRestyled>
                </InputPasswordRestyled>
              );
            }}
          />
          <ButtonRestyled
            type="submit"
            id="change-password-form-button"
            variant="contained"
            fullWidth
            size={ButtonSize}
            href="change-password-message"
          >
            change password
          </ButtonRestyled>
        </Box>
      </ChangePasswordFormBox>
    </ChangePasswordBox>
  );
}

export default ChangePasswordPage;
