import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signup,
  clearAuthError,
  setAuthError,
  selectAuthState,
} from '../../redux/slices/authSlice';
import ErrorBox from '../../components/ErrorBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BugIcon from '../../svg/bug-logo.svg';

import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Paper,
} from '@material-ui/core';
import { useAuthPageStyles } from '../../styles/muiStyles';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

interface InputValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanum, dash & underscore characters are allowed'
    ),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
});

const SignupPage = () => {
  const classes = useAuthPageStyles();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuthState);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfPass, setShowConfPass] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleSignup = ({
    username,
    password,
    confirmPassword,
  }: InputValues) => {
    if (password !== confirmPassword) {
      return dispatch(setAuthError('Both passwords need to match.'));
    }
    dispatch(signup({ username, password }));
  };

  return (
    <div>
      <Paper className={classes.root} elevation={2}>
        <img src={BugIcon} alt="bug-logo" className={classes.titleLogo} />
        <form onSubmit={handleSubmit(handleSignup)} className={classes.form}>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="username"
              type="text"
              label="Username"
              variant="outlined"
              error={'username' in errors}
              helperText={'username' in errors ? errors.username.message : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="password"
              type={showPass ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              error={'password' in errors}
              helperText={'password' in errors ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass((prevState) => !prevState)}
                      size="small"
                    >
                      {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.inputField}>
            <TextField
              required
              fullWidth
              inputRef={register}
              name="confirmPassword"
              type={showConfPass ? 'text' : 'password'}
              label="Confirm Password"
              variant="outlined"
              error={'confirmPassword' in errors}
              helperText={
                'confirmPassword' in errors
                  ? errors.confirmPassword.message
                  : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfPass((prevState) => !prevState)}
                      size="small"
                    >
                      {showConfPass ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <EnhancedEncryptionIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<PersonAddIcon />}
            type="submit"
            className={classes.submitButton}
            disabled={loading}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body1" className={classes.footerText}>
          Already have an account?{' '}
          <Link
            className={classes.link}
            component={RouterLink}
            to="/login"
            color="secondary"
          >
            Log In
          </Link>
        </Typography>
        {error && (
          <ErrorBox
            errorMsg={error}
            clearErrorMsg={() => dispatch(clearAuthError())}
          />
        )}
      </Paper>
    </div>
  );
};

export default SignupPage;
