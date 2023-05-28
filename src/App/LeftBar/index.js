import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRecoilState } from "recoil";
import { styled, useTheme } from '@mui/material/styles';

import Configure from "./Configure";
import GoodsSelect from "./GoodsSelect";
import DrawerHeader from "components/DrawerHeader";
import { isDrawOpenState } from "state";
import { HEADER_DRAWER_WIDTH } from "utility";

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(
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

const LeftBar = () => {
  const theme = useTheme();
  const [ isDrawOpen, setIsDrawOpen] = useRecoilState(isDrawOpenState);

  return (
    <Drawer variant="permanent" open={isDrawOpen}>
      <DrawerHeader>
        <Typography variant="h2">&nbsp;</Typography>
        <IconButton onClick={() => setIsDrawOpen(false)}>
          {
            theme.direction === 'rtl'
              ? <ChevronRightIcon fontSize="large" />
              : <ChevronLeftIcon fontSize="large" />
          }
        </IconButton>
      </DrawerHeader>
      <Divider />
      <GoodsSelect isOpen={isDrawOpen} />
      <Divider />
      <Configure />
    </Drawer>
  );
}

export default LeftBar;
