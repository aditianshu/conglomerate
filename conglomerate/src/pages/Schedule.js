import * as Yup from 'yup';
import { useState, useEffect,  useRef  } from 'react';
import { Icon } from '@iconify/react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, Field } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase';
// material
import { Stack, 
  TextField, 
  IconButton, 
  InputAdornment,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup, Container, Typography } from '@mui/material';
  import Page from '../components/Page';
import { LoadingButton } from '@mui/lab';

//firebase
import { db } from '../firebase'
import { display } from '@mui/system';

// ----------------------------------------------------------------------

export default function Schedule() {
  const navigate = useNavigate();
  const [unit, updateUnit] = useState();
  const { pathname } = useLocation();
  const unitName = pathname.split('/')[3];
  init("user_K4KIUzm0QiSbDQJK9s92m");
  const formREF = useRef();
  const formik = useFormik({
    initialValues: {
      date : '',
      checked : [],
    },
    onSubmit: () => {
      console.log(values)
      const emails = values.checked
      emails.forEach(element => {
        var ref = document.createElement("form");
        var code = document.createElement("input");
        var email = document.createElement("input");
        var date = document.createElement("input");
        code.setAttribute("name", "code");
        email.setAttribute("name", "email");
        date.setAttribute("name", "date");
        code.setAttribute("value", unitName);
        email.setAttribute("value", element);
        date.setAttribute("value", values.date);
        ref.appendChild(code); 
        ref.appendChild(date);
        ref.appendChild(email);
       // ref.setAttribute("ref", formREF)
        console.log(ref);
        sendEmail(ref);
        
      });
    }
  });

  function sendEmail(ref) {
    console.log(ref);
    emailjs.sendForm('service_53vgw8m', 'template_a5u3z0f', ref, "user_K4KIUzm0QiSbDQJK9s92m")
      .then((result) => {
          window.alert("Sent successfully!")
      }, (error) => {
          console.log(error.text);
      });
  }

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  useEffect(() => {

    if(!unit){
      const getBlogs = async (unitName) => {
        const teamsRef = db.collection('teams').doc(unitName);
        try{
          const snapshot = await teamsRef.get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          console.log(snapshot.data());
          updateUnit(snapshot.data());
        } catch(err){
          console.log(err);
        }
        //updateBlogs(blogs)
        return;
    }
    getBlogs(unitName);
    }

  }, [unit])
  return (
    <Page title="Forum | Conglomerate">
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
            <Stack spacing={3}>
              <Typography variant="h5">
                Student List for {unitName}
              </Typography>
              {unit && 
              <div role="group" aria-labelledby="checkbox-group">
                {unit.Students.map((item) => (
                  <label style={{display : "block", margin : 10}}>
                    <Field type="checkbox" name="checked" value={item.email} />
                    {item.name}
                  </label>
                ))}
              </div>
              }
              <TextField
                  fullWidth
                  label="Date"
                  {...getFieldProps('date')}
              />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Send Schedule
                </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
    
  );
}
