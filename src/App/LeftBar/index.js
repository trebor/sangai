import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRecoilState } from "recoil";

import TopBar from '../TopBar2';
import { HEADER_DRAWER_WIDTH } from "utility";
import GoodsSelector from "./GoodsSelector";
import { showClustersState } from "state";

const openedMixin = (theme) => ({
  width: HEADER_DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: HEADER_DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const LeftBar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const [ showClusters, setShowClusters ] = useRecoilState(showClustersState);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography variant="h2">&nbsp;</Typography>
        <IconButton onClick={handleDrawerClose}>
          {
            theme.direction === 'rtl'
              ? <ChevronRightIcon fontSize="large" />
              : <ChevronLeftIcon fontSize="large" />
          }
        </IconButton>
      </DrawerHeader>
      <Divider />
      <GoodsSelector isOpen={open} />
      <Divider />
    </Drawer>
  );
}

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar  {...{open, handleDrawerOpen }} position="fixed" />
      <LeftBar  {...{open, handleDrawerClose }} position="fixed" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum
        </Typography>
        <Typography paragraph>
          Lorem ipsum
        </Typography>
      </Box>
    </Box>
  );
}
