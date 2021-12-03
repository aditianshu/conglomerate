import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase";
// material
import { Stack, 
  TextField, 
  IconButton, 
  InputAdornment,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { values } from 'lodash';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role : 'teacher',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(values)
      registerWithEmailAndPassword(values.firstName + values.lastName, values.email, values.password, values.role);
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Select Role</FormLabel>
            <RadioGroup row aria-label="Select Role" name="row-radio-buttons-group" defaultValue="teacher">
              <FormControlLabel 
                value="teacher" 
                onClick = {() => {values.role = "teacher"}} 
                control={<Radio />} 
                label="Teacher" />
              <FormControlLabel 
                value="student" 
                onClick = {() => {values.role = "student"}} 
                control={<Radio />} 
                label="Student" />
            </RadioGroup>
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
