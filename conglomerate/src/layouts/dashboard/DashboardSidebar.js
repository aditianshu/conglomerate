import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import hashOutline from '@iconify/icons-eva/hash-outline'
import { Icon } from '@iconify/react';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import stringAvatar from '../../utils/stringAvatar';
import {db, auth } from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;


const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isForum = pathname.split('/')[1] == 'forum'? true : false;
  const teamCode = pathname.split('/')[2];
  const units = [{
    title : "Rules",
    path : `/forum/${teamCode}/default`,
    icon : getIcon(hashOutline)
  }];
  const [forumUnits, updateForumUnits] = useState();
  const [mount, updateMount] = useState(false);
  const [userDetails, updateDetails] = useState();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const userData = await query.docs[0].data();
      updateDetails(userData);
      //localStorage.setItem('user', userData)
    } catch(err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    } 

    if(!mount && isForum){
          const getTeamsFunction = async (id) => {
            const teamsRef = db.collection('teams').doc(id).collection('units');
            try{
              const snapshot = await teamsRef.get();
              if (snapshot.empty) {
                console.log('No matching documents.');
                return;
              }  
              snapshot.forEach(doc => {
                const element = {
                  title : doc.id,
                  path : `${doc.id}`,
                  icon: getIcon(hashOutline)
                };
                units.push(element);
              });
            } catch(err){
              console.log(err);
            }
            updateForumUnits(units);
            return;
        }
        console.log(units);
        getTeamsFunction(teamCode);
        console.log(forumUnits);
        updateMount(true);
        }
    // if(!userDetails){
    //   getUser();
    // }
  }, [pathname, mount]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/dashboard/teams" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      {userDetails && <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userDetails.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>}


      {
        (isForum && forumUnits)? <NavSection navConfig={forumUnits} /> : null
      }
      { !isForum? 
        <NavSection navConfig={sidebarConfig} /> : 
        null
      }

      <Box sx={{ flexGrow: 1 }} />

      
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
