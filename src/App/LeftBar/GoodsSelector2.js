import { useState } from "react";
import TopBar from '../TopBar2';
import { useRecoilState, useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from '@mui/material/Badge';

import {
  goodTypesState,
  selectedGoodTypesState,
  showClustersState
} from "state";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
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
    width: drawerWidth,
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

const GoodItem = ({ good: { name, color, icon }, isOpen }) => {
  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Badge
            color="secondary"
            variant="dot"
            /* anchorOrigin={{ horizontal: "left", vertical: 'top' }} */
          >
            <FontAwesomeIcon
              icon={icon}
              size="2xl"
              color={color}
            />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={name}
          sx={{ opacity: isOpen ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
}

const LeftBar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const goods = useRecoilValue(goodTypesState);
  const [ showClusters, setShowClusters ] = useRecoilState(showClustersState);
  const [ selectedGoods, setSelectedGoods ] = useRecoilState(
    selectedGoodTypesState
  );

  const handleChange = (event, values) => {
    setSelectedGoods(values);
  }

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
      <List sx={{ mt: 1 }}>
        {goods.map(good => (
          <GoodItem key={good.id} good={good} isOpen={open }/>)
        )}
      </List>
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
