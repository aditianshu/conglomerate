import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Typography, Stack, Avatar, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import stringAvatar from '../../../utils/stringAvatar'
// ----------------------------------------------------------------------

Comment.propTypes = {
  comment: PropTypes.object
};

export default function Comment({ comment }) {
  const { authorName, commentText } = comment;
  const getAvatar = stringAvatar(authorName);
  console.log(getAvatar)
  return (
    <Grid item xs={12} sm={12} md={12} margin="15px">
      <Card>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" 
          //justifyContent="space-between"
          >
              <Avatar sx={{ ...getAvatar.sx, color: 'action.active', mr: 1, my: 0.5 }} children = {getAvatar.children}/>
              <Typography variant="subtitle1" align="left">
                  {authorName}
              </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body" align="left">
              {commentText}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
    
  );
}
