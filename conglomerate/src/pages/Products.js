import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductList,
} from '../components/_dashboard/products';
//
import {db, auth,
} from '../firebase'

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const tempteam = [];
  const [teams, updateTeams] = useState();
  useEffect(() => {
    const getTeamsFunction = async () => {
      const teamsRef = db.collection('teams');
      try{
        const snapshot = await teamsRef.get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        snapshot.forEach(doc => {
          const element = {
            code : doc.id,
            Professor : doc.data().Professor,
            TeamName : doc.data().TeamName,
          };
          tempteam.push(element);
        });
      } catch(err){
        console.log(err);
      }
      updateTeams(tempteam);
      return;
    }
    getTeamsFunction();
    console.log(tempteam)
  }, []);

  
  return (
    <Page title="Teams | Conglomerate">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Teams
        </Typography>
        {teams && 
          <ProductList teams={teams} />}
      </Container>
    </Page>
  );
}
