import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Button, Container, Stack, Typography, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
import { BlogPostCard } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

//firebase
import {db, auth, addBlog } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function Blog() {
  const { pathname } = useLocation();
  const unitName = pathname.split('/').pop();
  const teamCode = pathname.split('/')[2];
  const blogs = [];
  const [blogPosts, updateBlogs] = useState();
  const [open, setOpen] = useState(false);
  const [userDetails, updateDetails] = useState();
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
      values.authorName = userData.name;
      console.log(values.authorName)
    } catch(err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      authorName : '',
      question : '',
      description : '',
    },
    onSubmit: () => {
      handleClose();
      console.log(values)
      const element = {
        id : blogPosts.length,
        title : values.question,
        author : {
            name : values.authorName
        },
        comment : 0,
      }
      const blogPost = {
        question : values.question,
        authorName : values.authorName,
        description : values.description,
        comments : [],
      }
      const tempList = blogPosts;
      tempList.push(element);
      updateBlogs(tempList);
      addBlog(teamCode, unitName, blogPost);
      isSuccess(true)
    }
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
  useEffect(() => {
    if(!blogPosts){
      const getBlogs = async (id, unitName) => {
        const teamsRef = db.collection('teams').doc(id).collection('units').doc(unitName);
        try{
          const snapshot = await teamsRef.get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
           snapshot.data().forums.forEach((item, index) => {
              const element = {
                    id : index,
                    title : item.question,
                    author : {
                      name : item.authorName
                    },
                    comment : item.comments.length,
               }
               blogs.push(element);
           });
          
          console.log(snapshot.data());
        } catch(err){
          console.log(err);
        }
        updateBlogs(blogs)
        return;
    }
    getBlogs(teamCode, unitName);
    console.log(blogPosts);
    }
    if(!userDetails){
      getUser();
    }
    
  }, [blogPosts, open, success])


  return (
    <Page title="Forum | Conglomerate">
      {user && <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Questions/Topics
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleClickOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            New Question
          </Button>
        </Stack>

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
           <BlogPostsSort options={SORT_OPTIONS} /> 
        </Stack> */}

        <Grid container spacing={3} >
          {blogPosts && blogPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth="true">
          <DialogTitle>Add Question</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Follow rules mentioned at the start
            </DialogContentText>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Question"
                      variant="filled"
                      {...getFieldProps('question')}
                    />

                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={5}
                      variant="filled"
                      {...getFieldProps('description')}
                    />
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Add Question
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

      </Container>}
    </Page>
  );
}
