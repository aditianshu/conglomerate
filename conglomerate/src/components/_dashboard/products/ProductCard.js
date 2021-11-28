import PropTypes from 'prop-types';
import { Link as RouterLink, Router, Route} from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import stringAvatar from '../../../utils/stringAvatar'

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  team: PropTypes.object
};

export default function ShopProductCard( {team} ) {
  console.log(team);
  const { code, TeamName, Professor } = team;
  // console.log(code)
  const getAvatar = stringAvatar(code);
  console.log("here")
  return (
    <Card>
      <Box sx={{ pt: '20%', position: 'relative' }}>
        <Avatar sx = {{...getAvatar.sx, width: 56, height: 56, margin: 'auto' }} children = {getAvatar.children} />
        <Typography variant="h4" noWrap sx align="center">
            {code}
          </Typography>
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="h6" noWrap align="center">
          {TeamName}
        </Typography>
        <Typography variant="overline" align="center">
          {Professor}
        </Typography>
        <hr/>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Link to={`${code}/schedule`} color="inherit" underline="hover" component={RouterLink}>
              <Typography variant="subtitle2" noWrap>
                Check Schedule
              </Typography>
            </Link>
              {/* <Link
                to={{pathname:`forum/${code}/default`}}
                //to={`forum/${code}/default`} 
                color="inherit" 
                underline="hover" 
                component={RouterLink}
                > */}
                <Typography variant="subtitle2" noWrap>
                  <a href={`/forum/${code}/default`}>
                    Forum
                  </a>
                </Typography>
              {/* </Link> */}
        </Stack>
      </Stack>
    </Card>
  );
}
