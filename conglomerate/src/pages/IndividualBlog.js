import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Stack, Typography, Box, TextField, Avatar } from '@mui/material';

// components
import Page from '../components/Page';
import { useState, useEffect } from 'react';
import account from '../_mocks_/account';
import posts from '../_mocks_/posts';
import Comment from '../components/_dashboard/posts/Comment';

//firebase
import { db, auth, addComment } from  '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

//utils
import stringAvatar from '../utils/stringAvatar'


const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 20
}));

// ----------------------------------------------------------------------

export default function IndividualBlog() {
  const [unit, updateUnit] = useState();
  const [userDetails, updateDetails] = useState();
  const [added, toggleAdd] = useState(false)
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const unitName = pathname.split('/')[3];
  const blogId = pathname.split('/')[4];
  const blog = {};
  var avatar = {};
  const [user, loading, error] = useAuthState(auth);
  const [success, isSuccess] = useState(false);
  const navigate = useNavigate();
  if(!user){
    navigate('/login');
  }
  
  const getUser = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const userData = await query.docs[0].data();
      updateDetails(userData);
      console.log(userData);
      values.authorName = userData.name;
    } catch(err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      authorName: '',
      commentText: '',
    },
    onSubmit: () => {
      console.log(values)
      toggleAdd(true);
      //registerWithEmailAndPassword(values.firstName + values.lastName, values.email, values.password, values.role);
      addComment(id,unitName,blogId,values.authorName, values.commentText)
      const updatedUnit = unit;
      updatedUnit.comments.push({authorName : values.authorName, commentText : values.commentText});
      updateUnit(updatedUnit);
      isSuccess(true);
      values.commentText = '';
    }
  });
  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
  useEffect(() => {
    if(!unit){
      const getBlog = async (id, unitName, blogId) => {
        const teamsRef = db.collection('teams').doc(id).collection('units').doc(unitName);
        try{
          const snapshot = await teamsRef.get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          const item = snapshot.data().forums[blogId];
          blog["title"] = item.question;
          blog["authorName"] = item.authorName;
          blog["questionDetails"] = item.description;
          blog["comments"] = item.comments;
          avatar = stringAvatar(unit.authorName);
        } catch(err){
          console.log(err);
        }
        updateUnit(blog)
        return;
      }
      getBlog(id, unitName, blogId);
      console.log(unit);
    }
     if(!userDetails){
      getUser();
       console.log(userDetails);
     }
  }, [unit, added, success])
  return (
     <Page title="Question | Conglomerate">
      {unit && <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
                {unit.title}
          </Typography>
        </Stack>

        <Box sx={{ mb: 5, mx: 2.5 }}>
          <AccountStyle>
            <Avatar alt="photoURL" children={avatar.children} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {unit.authorName}
              </Typography>
              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                
              </Typography> */}
            </Box>
          </AccountStyle>
          <Typography variant="body" gutterBottom>
                {unit.questionDetails}
          </Typography>
        </Box>
        
        <Typography variant="overline">
          Answers
        </Typography>
        <hr/>

        {unit.comments.length>0 && unit.comments.map((val, index) => (
          <Comment key={index} comment = {val} sx={{}} index = {index}/>
        ))}


      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Avatar alt="photoURL"  sx={{ ...avatar.sx, color: 'action.active', mr: 1, my: 0.5 }} children={avatar.children}/>
              <TextField 
                fullWidth 
                id="input-with-sx" 
                label="Add your comment here" 
                variant="standard"
                {...getFieldProps('commentText')}
                />
              <Button
              size="large"
              type="submit"
              >Add Comment</Button>
          </Box>
        </Form>
      </FormikProvider>
        
      </Container>}
    </Page>
  );
}
