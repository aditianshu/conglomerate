import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  teams: PropTypes.array.isRequired
};

export default function ProductList({ teams, ...other }) {
  console.log(teams)
  // const t = teams[0];
  // console.log(t.code);
  return (
    <Grid container spacing={3} {...other}>
      {teams.length > 0 ? teams.map((team) => (
        <Grid key={team.code} item xs={12} sm={6} md={3}>
          <ShopProductCard team ={team} />
        </Grid>
      )) : (null)}
    </Grid>
  );
}
